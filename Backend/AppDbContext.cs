using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    
}
