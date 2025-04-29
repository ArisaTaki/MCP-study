import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * 注册文章相关资源
 * @param server MCP服务器实例
 */
export function registerArticleResources(server: McpServer) {
  // 文章资源（支持列表功能）
  server.resource(
    "articles",
    new ResourceTemplate("articles://{category}", {
      list: async () => {
        return {
          resources: [
            {
              uri: "articles://tech",
              name: "技术文章",
              mimeType: "text/plain",
            },
            {
              uri: "articles://business",
              name: "商业文章",
              mimeType: "text/plain",
            },
            {
              uri: "articles://health",
              name: "健康文章",
              mimeType: "text/plain",
            },
          ],
        };
      },
    }),
    async (uri, { category }) => {
      const articles: Record<string, string> = {
        tech: "技术文章：最新AI技术发展趋势与应用前景",
        business: "商业文章：数字化转型如何改变传统企业",
        health: "健康文章：科学饮食与运动的平衡之道",
      };

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: articles[category as string] || `未找到${category}类别的文章`,
          },
        ],
      };
    }
  );
}
