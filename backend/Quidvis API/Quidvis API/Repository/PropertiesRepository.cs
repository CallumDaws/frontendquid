using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Quidvis_API.Models;

public interface IPropertiesRepository
{
    Task<IEnumerable<Property>> GetAllProperties();
    Task<IEnumerable<Property>> GetPropertiesByClientId(string clientId);
}
public class PropertiesRepository : IPropertiesRepository
{
    private readonly IDbConnection _dbConnection;

    public PropertiesRepository(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    // Get all properties
    public async Task<IEnumerable<Property>> GetAllProperties()
    {
        var query = "SELECT * FROM Properties";
        return await _dbConnection.QueryAsync<Property>(query);
    }

    // Get properties by clientId
    public async Task<IEnumerable<Property>> GetPropertiesByClientId(string clientId)
    {
        var query = "SELECT * FROM Properties WHERE clientId = @clientId";
        return await _dbConnection.QueryAsync<Property>(query, new { clientId });
    }
}
