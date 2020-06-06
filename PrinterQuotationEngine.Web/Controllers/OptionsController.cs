using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PrinterQuotationEngine.Web.Options;

namespace PrinterQuotationEngine.Web.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class OptionsController : ControllerBase
	{
		private readonly ILogger<OptionsController> _logger;
		private readonly IOptions<PrintOptions> _printOptionsAccessor;

		public OptionsController(ILogger<OptionsController> logger, IOptions<PrintOptions> printOptionsAccessor)
		{
			_logger = logger;
			_printOptionsAccessor = printOptionsAccessor;
		}

		[HttpGet]
		public JsonResult Get()
		{
			return new JsonResult(_printOptionsAccessor.Value);
		}
	}
}
