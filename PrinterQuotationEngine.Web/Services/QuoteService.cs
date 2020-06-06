using Microsoft.Extensions.Options;
using PrinterQuotationEngine.Web.Models;
using PrinterQuotationEngine.Web.Options;

namespace PrinterQuotationEngine.Web.Services
{
	public interface IQuoteService
	{
		ProcessedQuote ProcessQuote(double totalFilimentUsed, double totalPrintTime, QuoteRequest quote);
	}

	public class QuoteService: IQuoteService
	{
		private readonly IOptions<PrintOptions> _printOptionsAccessor;

		public QuoteService(IOptions<PrintOptions> printOptionsAccessor)
		{
			_printOptionsAccessor = printOptionsAccessor;
		}

		public ProcessedQuote ProcessQuote(double totalFilimentUsed, double totalPrintTime, QuoteRequest quote)
		{
			ProcessedQuote processedQuote = new ProcessedQuote();
			processedQuote.TotalFilimentUsed = totalFilimentUsed;
			processedQuote.TotalPrintTime = totalPrintTime;

			processedQuote.PrinterTimeCost = (totalPrintTime / 60) * _printOptionsAccessor.Value.PrinterTimeCost;

			var costperkilo = _printOptionsAccessor.Value.Materials[0].CostPerGram * 1000;
			var costpermm = costperkilo / (330 * 1000);

			processedQuote.MaterialCost = totalFilimentUsed * costpermm;

			processedQuote.FixedCost = _printOptionsAccessor.Value.FixedCosts.Consumables + _printOptionsAccessor.Value.FixedCosts.Electricity + _printOptionsAccessor.Value.FixedCosts.PrinterDepreciation;
			processedQuote.TimeCost = ((_printOptionsAccessor.Value.Timing.JobEnd + _printOptionsAccessor.Value.Timing.JobStart + _printOptionsAccessor.Value.Timing.ModelPrep + _printOptionsAccessor.Value.Timing.PostProcessing + _printOptionsAccessor.Value.Timing.PrinterPrep + _printOptionsAccessor.Value.Timing.Slicing + _printOptionsAccessor.Value.Timing.SupportRemoval) * _printOptionsAccessor.Value.Timing.CostPerMin);

			processedQuote.BaseTotal = processedQuote.PrinterTimeCost + processedQuote.MaterialCost + processedQuote.FixedCost + processedQuote.TimeCost;
			var failureCost = processedQuote.BaseTotal * _printOptionsAccessor.Value.CostAdjustments.FailureRate;
			var markup = processedQuote.BaseTotal * _printOptionsAccessor.Value.CostAdjustments.Markup;

			processedQuote.QuoteTotal = processedQuote.BaseTotal + failureCost + markup;

			return processedQuote;
		}
	}
}
