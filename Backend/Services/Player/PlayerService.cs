using System.Security.Claims;
using Backend.Repositories.Player;

namespace Backend.Services.Player;

public class PlayerService
{
    private PlayerRepository _playerRepository;
    
    public PlayerService(PlayerRepository playerRepository)
    {
        _playerRepository = playerRepository;
    }

    public async Task<string?> GetGameUrl(Guid gameId)
    {
        return await _playerRepository.GetUrlByGameId(gameId);
    }
}