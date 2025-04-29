import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerMathTools } from "./math";
import { registerStringTools } from "./string";
import { registerDateTimeTools } from "./datetime";
import { registerWeatherTools } from "./weather";

/**
 * 注册所有工具模块
 * @param server MCP服务器实例
 */
export function registerAllTools(server: McpServer) {
  registerMathTools(server);
  registerStringTools(server);
  registerDateTimeTools(server);
  registerWeatherTools(server);
}

// 也导出各个单独的注册函数，以便需要时可以选择性使用
export { registerMathTools } from "./math";
export { registerStringTools } from "./string";
export { registerDateTimeTools } from "./datetime";
export { registerWeatherTools } from "./weather";
