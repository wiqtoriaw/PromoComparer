using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PromoComparerAPI.Interfaces;
using PromoComparerAPI.Models.DTOs;

namespace PromoComparerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserPanelController : ControllerBase
    {
        private readonly IUserPanelService _userPanelService;

        public UserPanelController(IUserPanelService userPanelService)
        {
            _userPanelService = userPanelService;
        }

        [HttpGet("favourite-promotions")]
        public async Task<IActionResult> GetFavouritePromotions()
        {
            // Pobranie identyfikatora użytkownika z tokena (ClaimTypes.NameIdentifier)
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var promotions = await _userPanelService.GetFavouritePromotionsAsync(userId);
            return Ok(promotions);
        }

        [HttpPost]
        public async Task<IActionResult> AddFavourite([FromBody] FavouriteRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            await _userPanelService.AddFavouriteAsync(userId, request.PromotionId);
            return Ok(new { Message = "Promocja została dodana do ulubionych." });
        }
    }
}