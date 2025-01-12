using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces;

namespace PromoComparerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SchedulerController : ControllerBase
{
    private readonly IScheduler _scheduler;

    public SchedulerController(IScheduler scheduler)
    {
        _scheduler = scheduler;
    }


    [HttpPost]
    public IActionResult Start()
    {
        _scheduler.Start();
        return Ok("Scheduler initiated.");
    }
}
