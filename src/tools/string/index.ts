import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TOOL_CONFIG } from "../../config/server-config";

/**
 * 注册字符串处理工具
 * @param server MCP服务器实例
 */
export function registerStringTools(server: McpServer) {
  // 字符串长度计算工具
  server.tool(
    TOOL_CONFIG.string_operations.length.name,
    {
      text: z.string().describe("要计算长度的文本"),
    },
    async ({ text }) => ({
      content: [{ type: "text", text: `文本长度: ${text.length} 个字符` }],
    })
  );

  // 字符串反转工具
  server.tool(
    TOOL_CONFIG.string_operations.reverse.name,
    {
      text: z.string().describe("要反转的文本"),
    },
    async ({ text }) => ({
      content: [
        {
          type: "text",
          text: `反转结果: ${text.split("").reverse().join("")}`,
        },
      ],
    })
  );
}
