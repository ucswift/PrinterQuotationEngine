namespace PrinterQuotationEngine.Web.Models
{
	public class QuoteRequest
	{
		public string FileId { get; set; }
		public string Material { get; set; }
		public string Color { get; set; }
		public int Infill { get; set; }
		public int Quantity { get; set; }

		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string EmailAddress { get; set; }
		public string PhoneNumber { get; set; }
		public string CompanyName { get; set; }
		public string JobName { get; set; }
		public string JobDescription { get; set; }
	}
}
