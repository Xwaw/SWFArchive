using Backend;
using Backend.Authorization;
using Backend.Controllers;
using Backend.Models;
using Backend.Models.User;
using Backend.Repositories.Archive;
using Backend.Repositories.Comments;
using Backend.Repositories.Library;
using Backend.Repositories.User;
using Backend.Services;
using Backend.Services.Archive;
using Backend.Services.Comment;
using Backend.Services.Email;
using Backend.Services.Library;
using Backend.Services.Role;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Gmail.v1;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();
builder.Services.AddControllers();

builder.Services.AddDbContext<AppIdentityDbContext>(options =>
        options.UseSqlite("Data Source=identityUsers.db"));

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 1;
    options.Password.RequiredUniqueChars = 0;
    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;
    options.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppIdentityDbContext>()
.AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = CookieSecurePolicy.None;

    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };

    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://83.168.89.172", "http://83.168.89.172/")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanManageRoles", policy => policy.RequireRole(Roles.HeadAdmin));
    options.AddPolicy("CanGetMailApi", policy => policy.RequireRole(Roles.HeadAdmin));
});

builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
{
    options.TokenLifespan = TimeSpan.FromMinutes(15);
});

builder.Services.AddSingleton<GmailService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();

    var flow = new GoogleAuthorizationCodeFlow(
        new GoogleAuthorizationCodeFlow.Initializer
        {
            ClientSecrets = new ClientSecrets
            {
                ClientId = config["Gmail:ClientId"],
                ClientSecret = config["Gmail:ClientSecret"]
            },
            Scopes = new[] { GmailService.Scope.GmailSend }
        });

    var token = new TokenResponse
    {
        RefreshToken = config["Gmail:RefreshToken"]
    };

    var credential = new UserCredential(flow, "me", token);

    return new GmailService(new BaseClientService.Initializer
    {
        HttpClientInitializer = credential,
        ApplicationName = "Backend"
    });
});

builder.Services.AddScoped<ProfileService>();
builder.Services.AddScoped<LibraryService>();

builder.Services.AddScoped<CommentRepository>();
builder.Services.AddScoped<CommentService>();

builder.Services.AddScoped<RoleService>();
builder.Services.AddScoped<RoleRepository>();

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<AccountService>();
builder.Services.AddScoped<EmailTemplateService>();
builder.Services.AddScoped<EmailConverter>();
builder.Services.AddScoped<GmailSender>();

builder.Services.AddScoped<FileStorageService>();
builder.Services.AddScoped<FileRepository>();
builder.Services.AddScoped<ProfileRepository>();

builder.Services.AddScoped<ArchiveService>();
builder.Services.AddScoped<ViewGameService>();
builder.Services.AddScoped<ArchiveRepository>();

builder.Services.AddScoped<TagRepository>();
builder.Services.AddScoped<TagService>();
builder.Services.AddScoped<TagController>();

builder.Services.AddScoped<LibraryRepository>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppIdentityDbContext>();
    db.Database.Migrate();
}

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider
        .GetRequiredService<RoleManager<IdentityRole>>();

    string[] roles = { Roles.User, Roles.Moderator, Roles.Admin, Roles.HeadAdmin };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

using (var scope = app.Services.CreateScope())
{
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    const string rootEmail = "root@system.local";

    var user = await userManager.FindByEmailAsync(rootEmail);
    if (user != null)
    {
        if (!await userManager.IsInRoleAsync(user, Roles.HeadAdmin)
            && await userManager.IsInRoleAsync(user, Roles.User))
        {
            await userManager.AddToRoleAsync(user, Roles.HeadAdmin);
            await userManager.RemoveFromRoleAsync(user, Roles.User);
        }
    }
    
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowReact"); 
app.UseStaticFiles();

app.UseRouting();        

app.UseAuthentication();   
app.UseAuthorization();    

app.MapControllers();
app.MapRazorPages();
app.MapDefaultControllerRoute();

app.Run();
