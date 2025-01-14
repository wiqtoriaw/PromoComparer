using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces;
using PromoComparerAPI.Interfaces.Crud;

namespace PromoComparerAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ScrapingController : ControllerBase
{
    private readonly IPdfHandlerService _pdfHandlerService;
    private readonly IStoreService _storeService;


    public ScrapingController(IPdfHandlerService htmlParserService, IConfiguration configuration, IStoreService storeService)
    {
        _pdfHandlerService = htmlParserService;
        _storeService = storeService;
    }

    [HttpGet("download-pdfs")]
    public async Task<IActionResult> DownloadPdfs()
    {
        var shopsList = await _storeService.GetAllStemsAsync();

        if (shopsList == null || shopsList.Count == 0)
        {
            NotFound("No shops available to download PDFs.");
        }

        foreach (var shop in shopsList)
        {
            await _pdfHandlerService.ScrappPromotionData(shop);
        }

        return Ok("PDF download process initiated.");
    }

    [HttpGet("convert-images")]
    public IActionResult DownloadImages()
    {
        _pdfHandlerService.ConvertAllPdfsToImagesAndDelete();
        return Ok("Images download process completed.");
    }
}
