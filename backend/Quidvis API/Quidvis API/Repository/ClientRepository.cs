using Dapper;
using Quidvis_API.Models;
using System.Data;

namespace Quidvis_API.Repository
{
    public interface IClientRepository
    {
        Task<IEnumerable<Client>> GetAllClients();
    }

    public class ClientRepository : IClientRepository
    {
        private readonly IDbConnection _dbConnection;

        public ClientRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<IEnumerable<Client>> GetAllClients()
        {
            string sql = "SELECT * FROM Clients";
            return await _dbConnection.QueryAsync<Client>(sql);
        }
    }

}
