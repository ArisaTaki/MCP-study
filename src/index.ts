#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import * as http from "node:http";
import { randomUUID } from "node:crypto";
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
    // 创建HTTP服务器
    const httpServer = http.createServer();
    const PORT = 6274;
    const HOST = "127.0.0.1";

    // 创建MCP HTTP传输
    const httpTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      enableJsonResponse: false,
    });

    // 配置HTTP服务器处理请求
    httpServer.on("request", (req, res) => {
      httpTransport.handleRequest(req, res);
    });

    // 启动HTTP服务器
    httpServer.listen(PORT, HOST, () => {
      console.error(
        `${SERVER_CONFIG.name} HTTP服务器已启动，版本 ${SERVER_CONFIG.version}，监听 ${HOST}:${PORT}`
      );
    });

    // 连接HTTP传输到MCP服务器
    await server.connect(httpTransport);

    // 同时也支持stdio连接，方便命令行调试
    const stdioTransport = new StdioServerTransport();
    await server.connect(stdioTransport);
    console.error(
      `${SERVER_CONFIG.name} 命令行服务器已启动，版本 ${SERVER_CONFIG.version}`
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
