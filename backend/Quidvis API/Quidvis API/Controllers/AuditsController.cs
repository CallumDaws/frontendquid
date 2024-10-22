using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/audits")]
[ApiController]
public class AuditsController : ControllerBase
{
    private readonly IAuditsRepository _auditsRepository;

    public AuditsController(IAuditsRepository auditsRepository)
    {
        _auditsRepository = auditsRepository;
    }

    // Return all audits or filter by propertyId if provided
    [HttpGet]
    public async Task<IActionResult> GetAudits([FromQuery] string? propertyId)
    {
        if (!string.IsNullOrEmpty(propertyId))
        {
            var audits = await _auditsRepository.GetAuditsByPropertyId(propertyId);
            return Ok(audits);
        }
        else
        {
            var audits = await _auditsRepository.GetAllAudits();
            return Ok(audits);
        }
    }
}
