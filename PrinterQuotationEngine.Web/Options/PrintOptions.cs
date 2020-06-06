using Newtonsoft.Json;

namespace PrinterQuotationEngine.Web.Options
{
  public partial class PrintOptions
  {
    public double PrinterTimeCost { get; set; }

    [JsonProperty("Materials")]
    public Material[] Materials { get; set; }

    [JsonProperty("Timing")]
    public Timing Timing { get; set; }

    [JsonProperty("FixedCosts")]
    public FixedCosts FixedCosts { get; set; }

    [JsonProperty("CostAdjustments")]
    public CostAdjustments CostAdjustments { get; set; }
  }

  public partial class CostAdjustments
  {
    [JsonProperty("FailureRate")]
    public double FailureRate { get; set; }

    [JsonProperty("Markup")]
    public double Markup { get; set; }
  }

  public partial class FixedCosts
  {
    [JsonProperty("Consumables")]
    public long Consumables { get; set; }

    [JsonProperty("Electricity")]
    public long Electricity { get; set; }

    [JsonProperty("PrinterDepreciation")]
    public long PrinterDepreciation { get; set; }
  }

  public partial class Material
  {
    [JsonProperty("Name")]
    public string Name { get; set; }

    [JsonProperty("CostPerGram")]
    public double CostPerGram { get; set; }

    [JsonProperty("TimeAdjustment")]
    public long TimeAdjustment { get; set; }

    [JsonProperty("Colors")]
    public string[] Colors { get; set; }
  }

  public partial class Timing
  {
    [JsonProperty("CostPerMin")]
    public double CostPerMin { get; set; }

    [JsonProperty("ModelPrep")]
    public long ModelPrep { get; set; }

    [JsonProperty("Slicing")]
    public long Slicing { get; set; }

    [JsonProperty("PrinterPrep")]
    public long PrinterPrep { get; set; }

    [JsonProperty("JobStart")]
    public long JobStart { get; set; }

    [JsonProperty("JobEnd")]
    public long JobEnd { get; set; }

    [JsonProperty("SupportRemoval")]
    public long SupportRemoval { get; set; }

    [JsonProperty("PostProcessing")]
    public long PostProcessing { get; set; }
  }
}
