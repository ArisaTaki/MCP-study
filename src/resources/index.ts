import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGreetingResources } from "./greeting";
import { registerStaticResources } from "./static";
import { registerUserResources } from "./user";
import { registerProductResources } from "./product";
import { registerArticleResources } from "./article";

/**
 * 注册所有资源模块
 * @param server MCP服务器实例
 */
export function registerAllResources(server: McpServer) {
  registerGreetingResources(server);
  registerStaticResources(server);
  registerUserResources(server);
  registerProductResources(server);
  registerArticleResources(server);
}

// 也导出各个单独的注册函数，以便需要时可以选择性使用
export { registerGreetingResources } from "./greeting";
export { registerStaticResources } from "./static";
export { registerUserResources } from "./user";
export { registerProductResources } from "./product";
export { registerArticleResources } from "./article";
