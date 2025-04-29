import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBasicPrompts } from "./basic";
import { registerInterviewPrompts } from "./interview";

/**
 * 注册所有提示模板
 * @param server MCP服务器实例
 */
export function registerAllPrompts(server: McpServer) {
  registerBasicPrompts(server);
  registerInterviewPrompts(server);
}

// 也导出各个单独的注册函数，以便需要时可以选择性使用
export { registerBasicPrompts } from "./basic";
export { registerInterviewPrompts } from "./interview";
