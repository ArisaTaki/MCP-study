import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TOOL_CONFIG } from "../../config/server-config";

/**
 * 注册天气查询工具
 * @param server MCP服务器实例
 */
export function registerWeatherTools(server: McpServer) {
  // 模拟天气查询工具
  server.tool(
    TOOL_CONFIG.weather.get.name,
    {
      city: z.string().describe("城市名称"),
    },
    async ({ city }) => {
      // 这里模拟天气数据，实际应用中可以调用真实的天气API
      const weatherData: Record<
        string,
        { temperature: number; condition: string }
      > = {
        北京: { temperature: 20, condition: "晴朗" },
        上海: { temperature: 25, condition: "多云" },
        广州: { temperature: 30, condition: "降雨" },
        深圳: { temperature: 28, condition: "阴天" },
      };

      const cityData = weatherData[city];
      if (cityData) {
        return {
          content: [
            {
              type: "text",
              text: `${city}当前天气：${cityData.temperature}°C，${cityData.condition}`,
            },
          ],
        };
      } else {
        return {
          isError: true,
          content: [{ type: "text", text: `未找到${city}的天气数据` }],
        };
      }
    }
  );
}
