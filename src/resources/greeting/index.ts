import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { RESOURCE_CONFIG } from "../../config/server-config";

/**
 * 注册问候资源
 * @param server MCP服务器实例
 */
export function registerGreetingResources(server: McpServer) {
  // 动态问候资源
  server.resource(
    "greeting",
    new ResourceTemplate(RESOURCE_CONFIG.greeting.template, {
      list: undefined,
    }),
    async (uri, { name }) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/plain",
          text: `你好，${name}！很高兴见到你。`,
        },
      ],
    })
  );
}
