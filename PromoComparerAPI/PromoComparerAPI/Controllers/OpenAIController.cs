using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces;

namespace PromoComparerAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class OpenAIController : ControllerBase
{
    private readonly IOpenAIService _openAIService;
    private readonly ILogger<OpenAIController> _logger;

    public OpenAIController(IOpenAIService openAIService, ILogger<OpenAIController> logger)
    {
        _openAIService = openAIService;
        _logger = logger;
    }

    [HttpPost("analize-images")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ParseImagesToFunction()
    {
        try
        {
            await _openAIService.ParseImagesToFunction();
            _logger.LogInformation("OpenAI successfully integrated.");
            return Ok("OpenAI successfully integrated.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while integrating OpenAI.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while integrating OpenAI.");
        }
    }
}