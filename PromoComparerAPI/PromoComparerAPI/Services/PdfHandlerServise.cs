using HtmlAgilityPack;
using ImageMagick;
using PromoComparerAPI.Data;
using PromoComparerAPI.Interfaces;
using PromoComparerAPI.Interfaces.Crud;

namespace PromoComparerAPI.Services;

public class PdfHandlerService : IPdfHandlerService
{
    private readonly HttpClient _httpClient;
    private readonly string _pdfDirectory = "Pdfs";
    private readonly string _imageDirectory = "Assets";
    private readonly ILeafletService _leafletService;
    private readonly IOpenAIService _openAIService;
    private readonly ApplicationDbContext _context;


    public PdfHandlerService(IConfiguration configuration, ILeafletService leafletService, IOpenAIService openAIService, ApplicationDbContext context)
    {
        _httpClient = new HttpClient();

        if (!Directory.Exists(_imageDirectory))
        {
            Directory.CreateDirectory(_imageDirectory);
        }
        if (!Directory.Exists(_pdfDirectory))
        {
            Directory.CreateDirectory(_pdfDirectory);
        }

        _leafletService = leafletService;
        _openAIService = openAIService;
        _context = context;
    }

    public async Task ScrappPromotionData(string shop)
    {
        try
        {
            var url = $"https://www.gazetkipromocyjne.net/{shop}/";
            var htmlDocument = await ExtractHtmlContent(url);

            var newspapperFooterNodes = htmlDocument.DocumentNode.SelectNodes("//div[contains(@class, 'newspapper-footer')]");
            if (newspapperFooterNodes != null)
            {
                await ProcessNewspaperNodes(newspapperFooterNodes, shop, htmlDocument);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing PDFs: {ex.Message}");
        }
    }

    private async Task<HtmlDocument> ExtractHtmlContent(string url)
    {
        var htmlContent = await _httpClient.GetStringAsync(url);
        var htmlDocument = new HtmlDocument();
        htmlDocument.LoadHtml(htmlContent);
        return htmlDocument;
    }

    private async Task ProcessNewspaperNodes(HtmlNodeCollection newspapperFooterNodes, string shop, HtmlDocument htmlDocument)
    {
        var shopDirectory = Path.Combine(_pdfDirectory, shop);
        if (!Directory.Exists(shopDirectory))
        {
            Directory.CreateDirectory(shopDirectory);
        }

        foreach (var newspapperFooterNode in newspapperFooterNodes)
        {
            var buttonNode = newspapperFooterNode.SelectSingleNode(".//button[contains(@class, 'newspapper-btn')]");
            var pNode = newspapperFooterNode.SelectSingleNode(".//p");

            if (buttonNode != null && pNode != null)
            {
                var relValue = buttonNode.GetAttributeValue("rel", string.Empty);
                var id = relValue.StartsWith("#") ? relValue.Substring(1) : relValue;
                var dates = pNode.InnerText.Trim();

                var divId = $"{id}";
                var divNode = htmlDocument.DocumentNode.SelectSingleNode($"//div[@id='{divId}' and contains(@class, 'newspapper-preview')]");

                if (divNode != null)
                {
                    var downloadLinkNode = divNode.SelectSingleNode(".//a[contains(@class, 'newspapper-nav-download')]");
                    if (downloadLinkNode != null)
                    {
                        var pdfLink = downloadLinkNode.GetAttributeValue("href", string.Empty);
                        if (!string.IsNullOrEmpty(pdfLink))
                        {
                            await DownloadAndSavePdf(pdfLink, dates, shopDirectory, shop);
                        }
                        else
                        {
                            Console.WriteLine($"Error processing PDF for {id}");
                        }
                    }
                }
            }
        }
    }

    private async Task DownloadAndSavePdf(string pdfLink, string dates, string shopDirectory, string shop)
    {
        var fileName = Path.GetFileName(new Uri(pdfLink).LocalPath);
        var fullPath = Path.Combine(shopDirectory, fileName);

        if (_context.Leaflets.Any(s => s.PdfLink.ToLower() == pdfLink.ToLower()))
        {
            Console.WriteLine($"File already exists for {fileName}. Skipping download.");
        }
        else
        {
            var leafletId = await _leafletService.CreateLeafletAsync(dates, shop, pdfLink);   // parsuje Leaflet do bazy
            fileName = $"{leafletId}.pdf";
            fullPath = Path.Combine(shopDirectory, fileName);

            await DownloadFileAsync(pdfLink, fullPath);
        }
    }

    private async Task DownloadFileAsync(string fileUrl, string fullPath)
    {
        try
        {
            var fileBytes = await _httpClient.GetByteArrayAsync(fileUrl);
            await File.WriteAllBytesAsync(fullPath, fileBytes);
            Console.WriteLine($"Downloaded {fullPath}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error writing file {fullPath}: {ex.Message}");
        }
    }

    public void ConvertAllPdfsToImagesAndDelete()
    {
        var pdfFiles = Directory.GetFiles(_pdfDirectory, "*.pdf", SearchOption.AllDirectories);

        foreach (var pdfFile in pdfFiles)
        {
            try
            {
                Console.WriteLine($"Converting {pdfFile}");
                ConvertPdfToImages(pdfFile);


                File.Delete(pdfFile);
                Console.WriteLine($"Deleted {pdfFile}");
            }
            
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing PDF: {ex.Message} with {pdfFile}");
            }
        }
    }

    private void ConvertPdfToImages(string pdfPath)
    {
        try
        {
            var imageDirectory = Path.Combine(_imageDirectory, Path.GetFileNameWithoutExtension(pdfPath));
            if (!Directory.Exists(imageDirectory))
            {
                Directory.CreateDirectory(imageDirectory);
            }

            MagickNET.SetGhostscriptDirectory(@"C:\Program Files\gs\gs10.04.0\bin");

            var settings = new MagickReadSettings
            {
                Density = new Density(300, 300)
            };

            using var images = new MagickImageCollection();

            Console.WriteLine($"Converting PDF {pdfPath} to images...");

            images.Read(pdfPath, settings);

            int pageIndex = 1;

            foreach (var image in images)
            {
                var imagePath = Path.Combine(imageDirectory, $"Page{pageIndex}.png");

                image.Write(imagePath, MagickFormat.Png);

                Console.WriteLine($"Saved {imagePath}");

                pageIndex++;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error converting PDF: {ex.Message}");
        }
    }
}