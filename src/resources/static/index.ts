import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * 注册静态资源
 * @param server MCP服务器实例
 */
export function registerStaticResources(server: McpServer) {
  // Hello World 静态资源
  server.resource("hello-world", "text://hello-world", async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "text/plain",
        text: "Hello, World! 这是一个静态文本资源。",
      },
    ],
  }));
}
