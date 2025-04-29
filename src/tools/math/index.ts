import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TOOL_CONFIG } from "../../config/server-config";

/**
 * 注册数学运算工具
 * @param server MCP服务器实例
 */
export function registerMathTools(server: McpServer) {
  // 加法工具
  server.tool(
    TOOL_CONFIG.math.add.name,
    {
      a: z.number().describe("第一个数字"),
      b: z.number().describe("第二个数字"),
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: `${a} + ${b} = ${a + b}` }],
    })
  );

  // 减法工具
  server.tool(
    TOOL_CONFIG.math.subtract.name,
    {
      a: z.number().describe("被减数"),
      b: z.number().describe("减数"),
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: `${a} - ${b} = ${a - b}` }],
    })
  );

  // 乘法工具
  server.tool(
    TOOL_CONFIG.math.multiply.name,
    {
      a: z.number().describe("第一个因数"),
      b: z.number().describe("第二个因数"),
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: `${a} × ${b} = ${a * b}` }],
    })
  );

  // 除法工具
  server.tool(
    TOOL_CONFIG.math.divide.name,
    {
      a: z.number().describe("被除数"),
      b: z.number().describe("除数"),
    },
    async ({ a, b }) => {
      if (b === 0) {
        return {
          isError: true,
          content: [{ type: "text", text: "错误：除数不能为零" }],
        };
      }
      return {
        content: [{ type: "text", text: `${a} ÷ ${b} = ${a / b}` }],
      };
    }
  );
}
