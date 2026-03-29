using CardForgeApi.Models;
using CardForgeApi.Services;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// CORS for frontend dev
app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

var codeGen = new CodeGenerator();
var compiler = new ModCompiler(builder.Configuration);
var packager = new PackageService();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok", time = DateTime.UtcNow }));

app.MapPost("/api/export", (CardDefinition card) =>
{
    try
    {
        var source = codeGen.Generate(card);
        var dll = compiler.Compile(source, card.Id);
        var zip = packager.CreatePackage(card.Id, card.Name, dll);
        return Results.File(zip, "application/zip", $"{card.Id}_mod.zip");
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { error = ex.Message });
    }
});

app.Run();
