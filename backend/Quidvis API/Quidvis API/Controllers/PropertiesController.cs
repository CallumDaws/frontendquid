using Microsoft.AspNetCore.Mvc;
using Quidvis_API.Repository;

[Route("api/properties")]
[ApiController]
public class PropertiesController : ControllerBase
{
    private readonly IPropertiesRepository _propertyRepository;

    public PropertiesController(IPropertiesRepository propertyRepository)
    {
        _propertyRepository = propertyRepository;
    }

    // Fetch all properties or filter by clientId if provided
    [HttpGet]
    public async Task<IActionResult> GetProperties([FromQuery] string? clientId)
    {
        if (!string.IsNullOrEmpty(clientId))
        {
            // If clientId is provided, filter by clientId
            var properties = await _propertyRepository.GetPropertiesByClientId(clientId);
            return Ok(properties);
        }
        else
        {
            // If no clientId is provided, return all properties
            var properties = await _propertyRepository.GetAllProperties();
            return Ok(properties);
        }
    }
}
