using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PromoComparerAPI.Interfaces;

namespace PromoComparerAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ScrapingController : ControllerBase
{
    private readonly IPdfHandlerService _pdfHandlerService;
    private readonly List<string> _shopsList;


    public ScrapingController(IPdfHandlerService htmlParserService, IConfiguration configuration)
    {
        _pdfHandlerService = htmlParserService;
        _shopsList = configuration.GetSection("Shops").Get<List<string>>();

        if (_shopsList == null)
        {
            throw new ArgumentNullException(nameof(_shopsList), "The 'Shops' section in the configuration is missing or empty.");
        }
    }

    [HttpGet("download-pdfs")]
    public async Task<IActionResult> DownloadPdfs()
    {
        foreach (var shop in _shopsList)
        {
            await _pdfHandlerService.ScrappPromotionData(shop);
        }

        return Ok("PDF download process initiated.");
    }

    [HttpGet("download-images")]
    public IActionResult DownloadImages()
    {
        _pdfHandlerService.ConvertAllPdfsToImagesAndDelete();
        return Ok("Images download process completed.");
    }
}
