using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MatterHackers.Agg;
using MatterHackers.MatterSlice;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PrinterQuotationEngine.Web.Models;
using PrinterQuotationEngine.Web.Options;
using PrinterQuotationEngine.Web.Services;

namespace PrinterQuotationEngine.Web.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class QuoteController : ControllerBase
	{
		private readonly ILogger<QuoteController> _logger;
		private readonly IOptions<AppOptions> _appOptionsAccessor;
		private readonly IQuoteService _quoteService;

		public QuoteController(ILogger<QuoteController> logger, IOptions<AppOptions> appOptionsAccessor, IQuoteService quoteService)
		{
			_logger = logger;
			_appOptionsAccessor = appOptionsAccessor;
			_quoteService = quoteService;
		}

		[HttpPost]
		public IActionResult Process(QuoteRequest quote)
		{
			ConfigSettings config = new ConfigSettings();
			FffProcessor processor = new FffProcessor(config);

			MemoryStream result = new MemoryStream();
			processor.SetTargetStream(result);

			var filePath = Path.Combine(_appOptionsAccessor.Value.GetUploadFolderLocation(), $"{quote.FileId}.stl");
			var stream = new FileStream(filePath, FileMode.Open);

			using (new QuickTimer2("LoadStlFile"))
			{
				processor.LoadStlStream(stream);
			}

			using (new QuickTimer2("DoProcessing"))
			{
				processor.DoProcessing();
			}
			var data = processor.Finalize();
			var quoteResult = _quoteService.ProcessQuote(data.TotalFilamentUsed, data.TotalPrintTime, quote);

			return Ok(quoteResult);
		}
	}
}
