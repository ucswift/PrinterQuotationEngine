using System.IO;
using System.Reflection;

namespace PrinterQuotationEngine.Web.Options
{
	public class AppOptions
	{
		public string UploadFolderName { get; set; }

		public string GetUploadFolderLocation()
		{
			var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().CodeBase).Replace("file:\\", "");
			path = $"{path}\\{UploadFolderName}";

			return path;
		}
	}
}