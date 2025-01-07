using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces;

namespace PromoComparerAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ScrapingController : ControllerBase
{
    private readonly IPdfHandlerService _pdfHandlerService;

    public ScrapingController(IPdfHandlerService htmlParserService)
    {
        _pdfHandlerService = htmlParserService;
    }

    [HttpGet("download-pdfs")]
     public async Task<IActionResult> DownloadPdfs()
    {
        await _pdfHandlerService.DownloadPdfsLeafletsAsync();

        return Ok("PDF download process initiated.");
    }

    [HttpGet("download-images")]
    public IActionResult DownloadImages()
    {
        _pdfHandlerService.ConvertAllPdfsToImagesAndDelete();
        return Ok("Images download process completed.");
    }
}
