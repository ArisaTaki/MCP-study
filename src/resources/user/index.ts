import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * 注册用户相关资源
 * @param server MCP服务器实例
 */
export function registerUserResources(server: McpServer) {
  // 用户资料资源
  server.resource(
    "user-profile",
    new ResourceTemplate("user://{userId}/profile/{section}", {
      list: undefined,
    }),
    async (uri, { userId, section }) => {
      // 模拟用户数据
      interface UserData {
        basic: string;
        contact: string;
        preferences: string;
      }

      const users: Record<string, UserData> = {
        "1001": {
          basic: "用户ID: 1001, 姓名: 张三, 年龄: 28",
          contact: "电子邮件: zhang@example.com, 电话: 123-456-7890",
          preferences: "喜好: 编程, 阅读, 旅行",
        },
        "1002": {
          basic: "用户ID: 1002, 姓名: 李四, 年龄: 32",
          contact: "电子邮件: li@example.com, 电话: 987-654-3210",
          preferences: "喜好: 音乐, 电影, 烹饪",
        },
      };

      if (!users[userId as string]) {
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "text/plain",
              text: `错误: 未找到ID为${userId}的用户`,
            },
          ],
        };
      }

      const sectionKey = section as keyof UserData;
      if (!users[userId as string][sectionKey]) {
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "text/plain",
              text: `错误: 用户${userId}没有${section}部分`,
            },
          ],
        };
      }

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: users[userId as string][sectionKey],
          },
        ],
      };
    }
  );
}
