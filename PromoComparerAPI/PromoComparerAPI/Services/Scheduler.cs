using Coravel.Invocable;
using PromoComparerAPI.Interfaces;
using PromoComparerAPI.Interfaces.Crud;

namespace PromoComparerAPI.Services;

public class Scheduler : IInvocable
{
    private readonly IPdfHandlerService _pdfHandlerService;
    private readonly IOpenAIService _openAIService;
    private readonly IStoreService _storeService;

    public Scheduler(IConfiguration configuration, IPdfHandlerService pdfHandlerService, IOpenAIService openAIService, IStoreService storeService)
    {
        _pdfHandlerService = pdfHandlerService ?? throw new ArgumentNullException(nameof(pdfHandlerService));
        _openAIService = openAIService ?? throw new ArgumentNullException(nameof(openAIService));
        _storeService = storeService ?? throw new ArgumentNullException(nameof(storeService));
    }

    public async Task Invoke()
    {
        await Start();
    }

    // stores i categories jednorazowo wprowadzić do bazy

    public async Task Start()
    {
        var shopsList = await _storeService.GetAllStemsAsync();

        if (shopsList == null || shopsList.Count == 0)
        {
            Console.WriteLine("No shops found. Aborting the task.");
            return;
        }
        foreach (var shop in shopsList)
        {
            await _pdfHandlerService.ScrappPromotionData(shop);  // ściąga pdfy gazetek i parsuje Leaflets do bazy 
        }
        _pdfHandlerService.ConvertAllPdfsToImagesAndDelete(); // konwertuje pdfy na zdjęcia i usuwa pdfy
        await _openAIService.ParseImagesToFunction(); //parsuje zdjęcia do promptów openai i wywołuje funkcje parsującą Promotions do bazy i usuwa przeanalizowane zdjęcia
    }
}