using PromoComparerAPI.Interfaces;
using PromoComparerAPI.Interfaces.Crud;
using System.Net.Http;

namespace PromoComparerAPI.Services;

public class Scheduler : IScheduler
{
    private readonly IPdfHandlerService _pdfHandlerService;
    private readonly IOpenAIService _openAIService;
    private readonly List<string> _shopsList;

    public Scheduler(IConfiguration configuration, IPdfHandlerService pdfHandlerService, IOpenAIService openAIService)
    {
        _shopsList = configuration.GetSection("Shops").Get<List<string>>();

        if (_shopsList == null)
        {
            throw new ArgumentNullException(nameof(_shopsList), "The 'Shops' section in the configuration is missing or empty.");
        }
        _openAIService = openAIService;
        _pdfHandlerService = pdfHandlerService;
    }

    // stores i categories jednorazowo wprowadzić do bazy

    public void Start()
    {
        foreach (var shop in _shopsList)
        {
            _pdfHandlerService.ScrappPromotionData(shop);  // ściąga pdfy gazetek i parsuje Leaflets do bazy 
        }
        _pdfHandlerService.ConvertAllPdfsToImagesAndDelete(); // konwertuje pdfy na zdjęcia i usuwa pdfy
        _openAIService.ParseImagesToFunction(); //parsuje zdjęcia do promptów openai i wywołuje funkcje parsującą Promotions do bazy
    }
}