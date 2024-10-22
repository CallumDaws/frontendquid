using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Quidvis_API.Models;

public interface IAuditsRepository
{
    Task<IEnumerable<Audit>> GetAllAudits();
    Task<IEnumerable<Audit>> GetAuditsByPropertyId(string propertyId);
}
public class AuditsRepository : IAuditsRepository
{
    private readonly IDbConnection _dbConnection;

    public AuditsRepository(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    // Get all audits by propertyId
    public async Task<IEnumerable<Audit>> GetAuditsByPropertyId(string propertyId)
    {
        var query = "SELECT * FROM Audits WHERE propertyId = @propertyId";
        return await _dbConnection.QueryAsync<Audit>(query, new { propertyId });
    }

    // Get all audits
    public async Task<IEnumerable<Audit>> GetAllAudits()
    {
        var query = "SELECT * FROM Audits";
        return await _dbConnection.QueryAsync<Audit>(query);
    }
}
