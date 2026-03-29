using System.IO.Compression;
using System.Text.Json;

namespace CardForgeApi.Services;

public class PackageService
{
    public byte[] CreatePackage(string modId, string modName, byte[] dll)
    {
        using var ms = new MemoryStream();
        using (var zip = new ZipArchive(ms, ZipArchiveMode.Create, true))
        {
            // DLL
            var dllEntry = zip.CreateEntry($"{modId}/{modId}.dll");
            using var dllStream = dllEntry.Open();
            dllStream.Write(dll);

            // Manifest
            var manifest = new
            {
                id = modId,
                name = modName,
                author = "CardForge",
                description = $"Custom card mod: {modName}",
                version = "1.0.0",
                has_dll = true,
                has_pck = false,
                affects_gameplay = true
            };
            var manifestEntry = zip.CreateEntry($"{modId}/mod_manifest.json");
            using var manifestStream = manifestEntry.Open();
            JsonSerializer.Serialize(manifestStream, manifest, new JsonSerializerOptions { WriteIndented = true });
        }
        return ms.ToArray();
    }
}
