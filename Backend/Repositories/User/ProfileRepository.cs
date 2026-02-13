namespace Backend.Repositories.User;

public class ProfileRepository
{
    private AppIdentityDbContext _context;

    public ProfileRepository(AppIdentityDbContext context)
    {
        _context = context;
    }
}