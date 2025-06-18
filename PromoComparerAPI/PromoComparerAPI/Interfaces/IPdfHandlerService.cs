namespace PromoComparerAPI.Interfaces;

public interface IPdfHandlerService
{
    Task ScrappPromotionData(string shop);
    void ConvertAllPdfsToImagesAndDelete();

}
