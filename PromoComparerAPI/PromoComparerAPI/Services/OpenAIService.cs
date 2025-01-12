using OpenAI.Chat;
using PromoComparerAPI.Interfaces;
using PromoComparerAPI.Interfaces.Crud;

namespace PromoComparerAPI.Services;

public class OpenAIService : IOpenAIService
{
    private readonly ChatClient _client;
    private readonly string _imageDirectory = "Assets";
    private readonly IPromotionService _promotionService;


    public OpenAIService(string apiKey, IPromotionService promotionService)
    {
        _client = new ChatClient(model: "gpt-4o", apiKey: apiKey);
        _promotionService = promotionService;

        if (!Directory.Exists(_imageDirectory))
        {
            throw new Exception("Image directory does not exist!");
        }
    }

    public async Task Example05_VisionAsync()
    {

        string imageFilePath = Path.Combine("Assets", "image.jpg");
        using Stream imageStream = File.OpenRead(imageFilePath);
        BinaryData imageBytes = BinaryData.FromStream(imageStream);

        List<ChatMessage> messages =
        [
            new UserChatMessage(
                ChatMessageContentPart.CreateTextPart("Please describe the following image."),
                ChatMessageContentPart.CreateImagePart(imageBytes, "image/jpg")),
        ];

        ChatCompletion completion = await _client.CompleteChatAsync(messages);

        Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");
    }

    public void ParseImagesToFunction()  // parsuje zdjecia do funkcji 
    {
        try
        {
            var directories = Directory.GetDirectories(_imageDirectory);
            foreach (var directory in directories) //dla każdej gazetki
            {
                var leafletId = Path.GetFileName(directory);

                Console.WriteLine($"Processing folder: {leafletId}");

                if (Guid.TryParse(leafletId, out Guid guidLeaflet))
                {
                    Console.WriteLine($"Converted leaflet ID to GUID: {guidLeaflet}");

                    var imageFiles = Directory.GetFiles(directory, "*.*")
                        .Where(file => file.EndsWith(".png", StringComparison.OrdinalIgnoreCase));

                    foreach (var file in imageFiles)
                    {
                        var fileName = Path.GetFileName(file);
                        Console.WriteLine($"Processing image: {fileName}");

                        var completion = GetJsonPromotions(file);

                        try
                        {
                            _promotionService.CreatePromotions(completion, guidLeaflet);  // parsowanie danych Promotions do bazy
                        }
                        catch (InvalidOperationException ex)
                        {
                            Console.WriteLine($"Error processing completion: {ex.Message}");
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Unexpected error: {ex.Message}");
                        }
                    }


                }
                else
                {
                    Console.WriteLine($"Invalid GUID format for leaflet ID: {leafletId}");
                    continue;
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error parsing images: {ex.Message}");
        }
    }
    private ChatCompletion GetJsonPromotions(string imageFilePath) //przetwarza zdjęcie na jsona
    {

        var categoryName = new List<string>
        {
            "Artykuły spożywcze",
            "Chemia gospodarcza i artykuły higieniczne",
            "Produkty dla dzieci",
            "Artykuły domowe i dekoracje",
            "Elektronika",
            "Odzież i obuwie",
            "Produkty związane z sezonowymi potrzebami",
            "Artykuły ogrodowe i DIY",
            "Zwierzęta domowe"
        };

        using Stream imageStream = File.OpenRead(imageFilePath);
        BinaryData imageBytes = BinaryData.FromStream(imageStream);

        string prompt = $@"
        Hello! I need your help to extract promotional information from an image containing promotion details. Please analyze the attached image and provide the information in JSON format based on the following structure. Note that some fields might not be present in the image, so please leave them empty if you cannot retrieve the information.

        The JSON structure should conform to our `Promotion` model format as follows:

        {{
          ""promotions"": [
            {{
                ""ProductName"": ""string"",
                ""UnitType"": ""string"",
                ""OriginalPrice"": ""number"",
                ""PriceAfterPromotion"": ""number"",
                ""PromotionType"": ""string"",
                ""StartDate"": ""string (ISO 8601 format)"",
                ""EndDate"": ""string (ISO 8601 format)"",
                ""UntilOutOfStock"": ""boolean"",
                ""RequiredApp"": ""string"",
                ""Category"": ""one of {string.Join(", ", categoryName)}""
            }}]
        }}

        - If only one price is provided, assign it to PriceAfterPromotion.
        - Provide only the JSON without any additional comments.
        - If there are no products visible in the image, skip processing the image and return just empty list.
        - If a size is provided and is an important element of the promotion, include it in the product name.
        - If a brand name is provided, include it in ProductName in the format ""brand_name product_name"" or ""brand_name product_name product_size"".
        - If ""buy now online"" or ""online only"" or similar is mentioned, include this in RequiredApp.
        - Do not include LeafletId.
        - Replace CategoryId with Category, which should be one of: {string.Join(", ", categoryName)}.

        Please process the image and return the promotions found in the specified JSON format.
        ";

        List<ChatMessage> messages =
        [
            new UserChatMessage(
                ChatMessageContentPart.CreateTextPart(prompt),
                ChatMessageContentPart.CreateImagePart(imageBytes, "image/jpg")),
        ];

        ChatCompletionOptions options = new()
        {
            ResponseFormat = ChatResponseFormat.CreateJsonObjectFormat()
        };

        ChatCompletion completion = _client.CompleteChat(messages, options);

        return completion;

    }
}