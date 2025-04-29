#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SERVER_CONFIG } from "./config/server-config";
import { registerAllTools } from "./tools";
import { registerAllResources } from "./resources";
import { registerAllPrompts } from "./prompts";

/**
 * MCP 服务器
 * 提供各种工具、资源和提示模板的综合服务
 */

// 创建 MCP 服务器实例
const server = new McpServer({
  name: SERVER_CONFIG.name,
  version: SERVER_CONFIG.version,
  description: SERVER_CONFIG.description,
});

// 注册所有模块
registerAllTools(server);
registerAllResources(server);
registerAllPrompts(server);

// 启动服务器
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(
      `${SERVER_CONFIG.name} 已启动，版本 ${SERVER_CONFIG.version}`
    );
    console.error("正在监听请求...");
  } catch (error) {
    console.error(
      "服务器启动失败:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

main();
