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


    [HttpGet]
    public async Task<IActionResult> GetComplition()
    {
        await _openAIService.Example05_VisionAsync();
        return Ok("OpenAI succesfully integrated.");
    }

    [HttpPost]
    public IActionResult ParseImagesToFunction()
    {
        _openAIService.ParseImagesToFunction();
        return Ok("OpenAI succesfully integrated.");
    }
}