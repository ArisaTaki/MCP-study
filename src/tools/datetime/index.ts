import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TOOL_CONFIG } from "../../config/server-config";

/**
 * 注册日期时间相关工具
 * @param server MCP服务器实例
 */
export function registerDateTimeTools(server: McpServer) {
  // 当前日期时间工具
  server.tool(TOOL_CONFIG.datetime.current.name, {}, async () => {
    const now = new Date();
    return {
      content: [
        {
          type: "text",
          text: `当前日期和时间: ${now.toLocaleString("zh-CN")}`,
        },
      ],
    };
  });
}
