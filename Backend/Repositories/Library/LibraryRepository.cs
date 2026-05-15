namespace Backend.Repositories.Library;

public class LibraryRepository
{
    private AppIdentityDbContext _context;
    
    public LibraryRepository(AppIdentityDbContext context)
    {
        _context = context;
    }
}