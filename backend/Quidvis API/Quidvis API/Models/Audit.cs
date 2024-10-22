namespace Quidvis_API.Models
{
    public class Audit
    {
        public string AuditId { get; set; }
        public DateTime? AuditDate { get; set; }
        public string AuditCompanyId { get; set; }
        public string PropertyId { get; set; }
        public string Status { get; set; }
        public string AssessmentTypeId { get; set; }
        public DateTime? CompletedDate { get; set; }
    }
}
