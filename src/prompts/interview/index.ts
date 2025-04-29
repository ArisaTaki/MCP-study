import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * 注册面试相关提示模板
 * @param server MCP服务器实例
 */
export function registerInterviewPrompts(server: McpServer) {
  // 面试模拟提示
  server.prompt(
    "interview-simulation",
    {
      position: z.string().describe("面试职位"),
      candidateName: z.string().describe("候选人姓名"),
    },
    ({ position, candidateName }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `这是一个${position}职位的面试模拟。你将扮演面试官的角色。我是${candidateName}，我来应聘${position}职位。请开始面试。`,
          },
        },
      ],
    })
  );
}
