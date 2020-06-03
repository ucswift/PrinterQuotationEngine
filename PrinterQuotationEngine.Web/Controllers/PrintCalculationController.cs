using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PrinterQuotationEngine.Web.Options;

namespace PrinterQuotationEngine.Web.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class PrintCalculationController : ControllerBase
	{
		private readonly ILogger<PrintCalculationController> _logger;
		private readonly IOptions<AppOptions> _appOptionsAccessor;

		public PrintCalculationController(ILogger<PrintCalculationController> logger, IOptions<AppOptions> appOptionsAccessor)
		{
			_logger = logger;
			_appOptionsAccessor = appOptionsAccessor;
		}

	}
}
