using HtmlAgilityPack;
using ImageMagick;
using PromoComparerAPI.Interfaces;

namespace PromoComparerAPI.Services;

public class PdfHandlerService : IPdfHandlerService
{
    private readonly HttpClient _httpClient;
    private readonly List<string> _shopsList;
    private readonly string _pdfDirectory = "Pdfs";
    private readonly string _imageDirectory = "Assets";

    public PdfHandlerService(IConfiguration configuration)
    {
        _httpClient = new HttpClient();
        _shopsList = configuration.GetSection("Shops").Get<List<string>>();

        if (!Directory.Exists(_imageDirectory))
        {
            Directory.CreateDirectory(_imageDirectory);
        }
        if (!Directory.Exists(_pdfDirectory))
        {
            Directory.CreateDirectory(_pdfDirectory);
        }
        if (_shopsList == null)
        {
            throw new ArgumentNullException(nameof(_shopsList), "The 'Shops' section in the configuration is missing or empty.");
        }
    }

    public async Task DownloadPdfsLeafletsAsync()
    {
        try
        {
            foreach (var shop in _shopsList)
            {
                var urlPart = "https://www.gazetkipromocyjne.net/";
                var url = $"{urlPart}{shop}/";

                var htmlContent = await _httpClient.GetStringAsync(url);
                var htmlDocument = new HtmlDocument();
                htmlDocument.LoadHtml(htmlContent);

                var nodes = htmlDocument.DocumentNode.SelectNodes("//a[contains(@class, 'newspapper-nav-download')]");


                if (nodes != null)
                {
                    var shopDirectory = Path.Combine(_pdfDirectory, shop);
                    if (!Directory.Exists(shopDirectory))
                    {
                        Directory.CreateDirectory(shopDirectory);
                    }

                    foreach (var node in nodes)
                    {
                        var href = node.GetAttributeValue("href", "");
                        if (!string.IsNullOrEmpty(href))
                        {
                            var fileName = Path.GetFileName(new Uri(href).LocalPath);
                            var fullPath = Path.Combine(shopDirectory, fileName);
                            await DownloadFileAsync(href, fullPath);
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing PDFs: {ex.Message}");
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
                ConvertPdfToImages(pdfFile);
                Console.WriteLine($"Converting {pdfFile}");


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
                Density = new Density(500, 500)
            };

            using var images = new MagickImageCollection();

            Console.WriteLine($"Converting PDF {pdfPath} to images...");

            images.Read(pdfPath, settings);

            int pageIndex = 1;

            foreach (var image in images)
            {
                var imagePath = Path.Combine(imageDirectory, $"Page{pageIndex}.jpg");

                image.Write(imagePath, MagickFormat.Jpeg);

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