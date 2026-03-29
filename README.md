# Card Forge — 杀戮尖塔2 卡牌制作工具

一个本地 Web 应用，帮助用户为《杀戮尖塔2》制作自定义卡牌 mod。

## 前置依赖

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js 18+](https://nodejs.org/)
- 《杀戮尖塔2》已安装（需要引用游戏的 sts2.dll）

## 快速开始

### 1. 配置游戏路径

编辑 `backend/appsettings.json`，确认 `GamePath` 指向你的游戏安装目录：

```json
{
  "GamePath": "F:\\SteamLibrary\\steamapps\\common\\Slay the Spire 2"
}
```

### 2. 启动后端

```bash
cd backend
dotnet run
```

服务将在 http://localhost:5000 启动。

### 3. 启动前端

```bash
cd frontend
npm install
npm run dev
```

浏览器打开 http://localhost:5173 即可使用。

## 使用方法

1. 在左侧面板编辑卡牌属性（名称、费用、稀有度、类型、角色、目标）
2. 点击标签切换消耗/虚无/固有/保留/永恒
3. 从下拉列表添加效果词条（伤害、格挡、易伤、中毒等）
4. 在右侧面板设计升级路线（数值自动 或 完全自定义）
5. 中栏实时预览卡牌外观
6. 点击"导出 Mod"下载 ZIP
7. 解压到游戏的 `mods` 目录即可使用

## 技术架构

| 层 | 技术 |
|---|---|
| 前端 | React 18 + TypeScript + Vite |
| 后端 | .NET 9 Minimal API + Roslyn |
| 编译 | Roslyn 动态编译 C# → DLL |
| 输出 | ZIP (DLL + mod_manifest.json) |

## 支持的角色

| 角色 | 颜色 |
|------|------|
| Ironclad 铁甲战士 | 红色 |
| Silent 静默猎人 | 绿色 |
| Defect 机器人 | 蓝色 |
| Regent 摄政王 | 橙色 |
| Necrobinder 死灵师 | 粉紫 |
