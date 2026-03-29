using System.Text.Json;
using System.Text.Json.Serialization;

namespace CardForgeApi.Models;

public class CardDefinition
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public int Cost { get; set; } = 1;
    public bool UseStarCost { get; set; }
    public string Rarity { get; set; } = "Common";
    public string Type { get; set; } = "Attack";
    public string Character { get; set; } = "Ironclad";
    public string Target { get; set; } = "Enemy";
    public List<string> Tags { get; set; } = [];
    public List<CardEffect> Effects { get; set; } = [];
    public string? ImagePath { get; set; }
    public UpgradeConfig Upgrade { get; set; } = new();
}

public class CardEffect
{
    public string Keyword { get; set; } = "";
    public Dictionary<string, JsonElement> Params { get; set; } = new();
    public string? Target { get; set; }
}

public class UpgradeConfig
{
    public int MaxLevel { get; set; } = 1;
    public bool Infinite { get; set; }
    public string Mode { get; set; } = "custom";
    public List<UpgradeLevel> Levels { get; set; } = [];
    public AutoRule? AutoRule { get; set; }
}

public class UpgradeLevel
{
    public string NameSuffix { get; set; } = "+";
    public List<UpgradeChange> Changes { get; set; } = [];
}

public class UpgradeChange
{
    public string Type { get; set; } = "numeric"; // "numeric" or "keyword"
    public string? Field { get; set; }
    public string? Operation { get; set; }
    public int Value { get; set; }
    public string? Action { get; set; } // "add" or "remove" (for keyword type)
    public string? Keyword { get; set; } // keyword name (for keyword type)
}

public class AutoRule
{
    public string Field { get; set; } = "damage";
    public string Operation { get; set; } = "add";
    public int Value { get; set; } = 3;
}
