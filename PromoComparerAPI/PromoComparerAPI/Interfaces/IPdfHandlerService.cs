namespace PromoComparerAPI.Interfaces;

public interface IPdfHandlerService
{
    Task DownloadPdfsLeafletsAsync();
    void ConvertAllPdfsToImagesAndDelete();

}
