import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * 注册基本提示模板
 * @param server MCP服务器实例
 */
export function registerBasicPrompts(server: McpServer) {
  // 简单问答提示
  server.prompt(
    "simple-question",
    {
      question: z.string().describe("要提问的问题"),
    },
    ({ question }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `${question}`,
          },
        },
      ],
    })
  );

  // 代码审查提示
  server.prompt(
    "code-review",
    {
      language: z.string().describe("编程语言"),
      code: z.string().describe("要审查的代码"),
    },
    ({ language, code }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `你是一位专业的${language}代码审查员。请审查以下代码，提供改进建议：\n\n\`\`\`${language}\n${code}\n\`\`\``,
          },
        },
      ],
    })
  );
}
