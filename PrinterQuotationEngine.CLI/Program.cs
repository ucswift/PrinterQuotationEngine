using gs;
using MatterHackers.Agg;
using MatterHackers.MatterSlice;
using System;
using System.IO;
using System.Reflection;

namespace PrinterQuotationEngine.CLI
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Hello World!");


			ConfigSettings config = new ConfigSettings();
			FffProcessor processor = new FffProcessor(config);

			MemoryStream result = new MemoryStream();
			processor.SetTargetStream(result);

			var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().CodeBase).Replace("file:\\", "");
			path = $"{path}\\SampleSTLs\\AvoidCrossing9Holes.stl";
			var stream = new FileStream(path, FileMode.Open);

			using (new QuickTimer2("LoadStlFile"))
			{
				processor.LoadStlStream(stream);
			}

			using (new QuickTimer2("DoProcessing"))
			{
				processor.DoProcessing();
			}
			var data = processor.Finalize();


			//GenericGCodeParser parser = new GenericGCodeParser();


			//result.Position = 0;
			//TextReader tr = new StreamReader(result);
			//var gcode = parser.Parse(tr);
		}
	}
}
