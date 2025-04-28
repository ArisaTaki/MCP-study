# MCP 计算器服务器

这是一个简单的 MCP (Model Context Protocol) 服务器示例，提供基本的数字加法功能。

## 功能

该服务器提供一个工具 `add_numbers`，可以将两个数字相加并返回结果。

## 安装

```bash
# 克隆仓库后，安装依赖
npm install

# 构建项目
npm run build
```

## 使用方法

### 本地直接运行

```bash
npm start
```

### MCP API 说明

本项目使用 MCP SDK 的高级 API 实现：

- 使用 `McpServer` 类创建 MCP 服务器
- 通过 `tool()` 方法注册工具
- 简洁易读的代码风格

### ResourceTemplate

`ResourceTemplate` 是 MCP SDK 提供的一个重要功能，用于定义动态资源。通过它，你可以：

1. **创建参数化资源**: 使用占位符定义资源 URI 模板
2. **处理动态路径**: 自动解析 URI 参数并传递给处理函数
3. **支持资源列表**: 可以配置资源是否支持列表操作

例如，你可以这样添加一个带有参数的资源：

```javascript
// 添加一个动态的问候资源
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        text: `你好，${name}！`,
      },
    ],
  })
);
```

使用这个资源时，客户端可以请求 `greeting://张三`，服务器会返回 "你好，张三！"。

### 在 Claude 桌面版中配置

1. 打开 Claude 桌面客户端
2. 进入"开发者 > 编辑配置"
3. 在 `claude_desktop_config.json` 文件中添加：

```json
{
  "mcpServers": {
    "calculator-mcp": {
      "command": "node",
      "args": ["/完整路径/mcp-demo/build/index.js"]
    }
  }
}
```

注意：请将 `/完整路径/mcp-demo/build/index.js` 替换为实际的文件路径。

### 与 Claude 交互

启用 MCP 服务器后，可以在 Claude 中使用加法功能，例如：

> 请帮我计算 42 + 17 等于多少？

Claude 将使用 MCP 服务器提供的工具进行计算并提供结果。

## 调试

可以使用 MCP inspector 工具进行调试：

```bash
npm run inspect
```
