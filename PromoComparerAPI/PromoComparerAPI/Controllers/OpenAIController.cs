using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces;

namespace PromoComparerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OpenAIController : ControllerBase
{
    private readonly IOpenAIService _openAIService;

    public OpenAIController(IOpenAIService openAIService)
    {
        _openAIService = openAIService;
    }

    [HttpPost]
    public async Task<IActionResult> ParseImagesToFunction()
    {
        await _openAIService.ParseImagesToFunction();
        return Ok("OpenAI succesfully integrated.");
    }
}