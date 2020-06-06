namespace PrinterQuotationEngine.Web.Models
{
	public class ProcessedQuote
	{
		public double TotalFilimentUsed { get; set; }
		public double TotalPrintTime { get; set; }



		public double MaterialCost { get; set; }
		public double PrinterTimeCost { get; set; }
		public double FixedCost { get; set; }
		public double TimeCost { get; set; }

		public double BaseTotal { get; set; }
		public double QuoteTotal { get; set; }
	}
}
