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
    private readonly ILogger<ScrapingController> _logger;

    public ScrapingController(IPdfHandlerService pdfHandlerService, IStoreService storeService, ILogger<ScrapingController> logger)
    {
        _pdfHandlerService = pdfHandlerService;
        _storeService = storeService;
        _logger = logger;
    }

    [HttpGet("download-pdfs")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DownloadPdfs()
    {
        try
        {
            var shopsList = await _storeService.GetAllStemsAsync();

            if (shopsList == null || shopsList.Count == 0)
            {
                _logger.LogWarning("No shops available to download PDFs.");
                return NotFound("No shops available to download PDFs.");
            }

            foreach (var shop in shopsList)
            {
                await _pdfHandlerService.ScrappPromotionData(shop);
            }

            _logger.LogInformation("PDF download process initiated.");
            return Ok("PDF download process initiated.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while downloading PDFs.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while downloading PDFs.");
        }
    }

    [HttpGet("convert-to-images")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult DownloadImages()
    {
        try
        {
            _pdfHandlerService.ConvertAllPdfsToImagesAndDelete();
            _logger.LogInformation("Images download process completed.");
            return Ok("Images download process completed.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while converting PDFs to images.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while converting PDFs to images.");
        }
    }
}
