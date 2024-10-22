using Microsoft.AspNetCore.Mvc;
using Quidvis_API.Repository;

namespace Quidvis_API.Controllers
{

    [ApiController]
    [Route("api/clients")]
    public class ClientController(IClientRepository clientRepository) : ControllerBase
    {
        private readonly IClientRepository _clientRepository = clientRepository;

        [HttpGet]
        public async Task<IActionResult> GetAllClients()
        {
            var clients = await _clientRepository.GetAllClients();
            return Ok(clients);
        }
    }

}
