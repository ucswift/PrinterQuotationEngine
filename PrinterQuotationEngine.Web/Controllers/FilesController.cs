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
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	public class FilesController : Controller
	{
		private readonly ILogger<PrintCalculationController> _logger;
		private readonly IOptions<AppOptions> _appOptionsAccessor;

		public FilesController(ILogger<PrintCalculationController> logger, IOptions<AppOptions> appOptionsAccessor)
		{
			_logger = logger;
			_appOptionsAccessor = appOptionsAccessor;
		}


		[HttpPost]
		public async Task<IActionResult> UploadFiles()
		{
			var files = Request.Form.Files;
			long size = files.Sum(f => f.Length);
			var ids = new List<string>();

			foreach (var formFile in files)
			{
				if (formFile.Length > 0)
				{
					var id = Guid.NewGuid().ToString();
					var filePath = Path.Combine(_appOptionsAccessor.Value.GetUploadFolderLocation(), $"{id}.stl");

					using (var stream = System.IO.File.Create(filePath))
					{
						await formFile.CopyToAsync(stream);
					}

					ids.Add(id);
				}
			}

			return Ok(new { count = files.Count, ids, size });
		}

		[HttpGet]
		public async Task<IActionResult> GetFile(string fileId)
		{
			var filePath = Path.Combine(_appOptionsAccessor.Value.GetUploadFolderLocation(), $"{fileId}.stl");
			return new PhysicalFileResult(filePath, "application/sla");
		}
	}
}
