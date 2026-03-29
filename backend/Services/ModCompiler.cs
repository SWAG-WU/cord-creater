using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace CardForgeApi.Services;

public class ModCompiler
{
    private readonly string _gameDir;

    public ModCompiler(IConfiguration config)
    {
        _gameDir = config["GamePath"]
            ?? throw new InvalidOperationException("GamePath not configured in appsettings.json");
    }

    public byte[] Compile(string sourceCode, string modId)
    {
        var syntaxTree = CSharpSyntaxTree.ParseText(sourceCode);

        var gameDir = Path.Combine(_gameDir, "data_sts2_windows_x86_64");

        var references = new List<MetadataReference>
        {
            MetadataReference.CreateFromFile(Path.Combine(gameDir, "sts2.dll")),
            MetadataReference.CreateFromFile(Path.Combine(gameDir, "0Harmony.dll")),
            MetadataReference.CreateFromFile(typeof(object).Assembly.Location),
            MetadataReference.CreateFromFile(typeof(System.Runtime.InteropServices.GCHandle).Assembly.Location),
            MetadataReference.CreateFromFile(typeof(System.Linq.Enumerable).Assembly.Location),
            MetadataReference.CreateFromFile(typeof(System.Collections.Generic.List<>).Assembly.Location),
            MetadataReference.CreateFromFile(typeof(System.Threading.Tasks.Task).Assembly.Location),
        };

        // Try to find GodotSharp.dll
        var godotPath = Path.Combine(gameDir, "GodotSharp.dll");
        if (File.Exists(godotPath))
        {
            references.Add(MetadataReference.CreateFromFile(godotPath));
        }

        // Add .NET runtime references
        var runtimeDir = Path.GetDirectoryName(typeof(object).Assembly.Location)!;
        foreach (var asm in new[] { "System.Runtime.dll", "System.Collections.dll", "System.Linq.dll", "netstandard.dll" })
        {
            var path = Path.Combine(runtimeDir, asm);
            if (File.Exists(path))
                references.Add(MetadataReference.CreateFromFile(path));
        }

        var compilation = CSharpCompilation.Create(
            $"{modId}",
            [syntaxTree],
            references,
            new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));

        using var ms = new MemoryStream();
        var result = compilation.Emit(ms);
        if (!result.Success)
        {
            var errors = result.Diagnostics
                .Where(d => d.Severity == DiagnosticSeverity.Error)
                .Select(d => d.ToString());
            throw new InvalidOperationException($"Compilation failed:\n{string.Join("\n", errors)}");
        }

        return ms.ToArray();
    }
}
