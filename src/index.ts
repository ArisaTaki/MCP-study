#!/usr/bin/env node

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 创建MCP服务器实例
const server = new McpServer({
  name: "calculator-mcp-server",
  version: "1.0.0",
});

// 注册加法工具
server.tool(
  "add_numbers",
  {
    a: z.number().describe("第一个数字"),
    b: z.number().describe("第二个数字"),
  },
  async ({ a, b }) => {
    // 执行加法运算
    const result = a + b;

    // 返回结果
    return {
      content: [
        {
          type: "text",
          text: `计算结果: ${a} + ${b} = ${result}`,
        },
      ],
    };
  }
);

// 添加一个动态的问候资源
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "text/plain",
        text: `你好，${name}！`,
      },
    ],
  })
);

// 启动服务器
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("计算器 MCP 服务器已启动");
  } catch (error) {
    console.error("服务器启动失败:", error);
    process.exit(1);
  }
}

main();
