import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * 注册产品相关资源
 * @param server MCP服务器实例
 */
export function registerProductResources(server: McpServer) {
  // 产品信息资源
  server.resource(
    "product-info",
    new ResourceTemplate("product://{productId}", { list: undefined }),
    async (uri, { productId }) => {
      // 模拟产品数据
      interface ProductData {
        id: string;
        name: string;
        price: number;
        description: string;
        specs: {
          screen: string;
          processor: string;
          memory: string;
          storage: string;
        };
      }

      const products: Record<string, ProductData> = {
        "101": {
          id: "101",
          name: "智能手机",
          price: 3999,
          description: "最新款高性能智能手机",
          specs: {
            screen: "6.7英寸",
            processor: "8核处理器",
            memory: "8GB RAM",
            storage: "256GB",
          },
        },
        "102": {
          id: "102",
          name: "笔记本电脑",
          price: 7999,
          description: "轻薄高性能笔记本",
          specs: {
            screen: "14英寸",
            processor: "12核处理器",
            memory: "16GB RAM",
            storage: "512GB SSD",
          },
        },
      };

      if (!products[productId as string]) {
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "application/json",
              text: JSON.stringify({ error: "产品不存在" }),
            },
          ],
        };
      }

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(products[productId as string], null, 2),
          },
        ],
      };
    }
  );
}
