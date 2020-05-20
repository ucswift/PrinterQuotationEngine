using System;
using System.Collections.Generic;
using System.Text;

namespace MatterSliceLib
{
	public class PrintData
	{
		public double FilamentUsedExtruder1 { get; set; }
		public double FilamentUsedExtruder2 { get; set; }

		public double TotalFilamentUsed
		{
			get
			{
				return FilamentUsedExtruder1 + FilamentUsedExtruder2;
			}
		}

		public double TotalPrintTime { get; set; }
	}
}
