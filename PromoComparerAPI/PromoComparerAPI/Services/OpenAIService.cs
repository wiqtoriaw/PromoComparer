using OpenAI.Chat;
using OpenAI.Assistants;
using OpenAI.Files;
using PromoComparerAPI.Interfaces;
using OpenAI;


namespace PromoComparerAPI.Services;

public class OpenAIService : IOpenAIService
{
    private readonly ChatClient _client;

    public OpenAIService(string apiKey)
    {
        _client = new ChatClient(model: "gpt-4o", apiKey: apiKey);
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
}