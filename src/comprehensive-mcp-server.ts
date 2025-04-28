#!/usr/bin/env node

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// 创建一个完整功能的MCP服务器
const server = new McpServer({
  name: "comprehensive-mcp-server",
  version: "1.0.0",
  description: "一个全面演示MCP功能的服务器",
});

// ===== 1. 工具（Tools）部分 =====

// 1.1 基本数学计算工具
server.tool(
  "add",
  {
    a: z.number().describe("第一个数字"),
    b: z.number().describe("第二个数字"),
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: `${a} + ${b} = ${a + b}` }],
  })
);

server.tool(
  "subtract",
  {
    a: z.number().describe("被减数"),
    b: z.number().describe("减数"),
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: `${a} - ${b} = ${a - b}` }],
  })
);

server.tool(
  "multiply",
  {
    a: z.number().describe("第一个因数"),
    b: z.number().describe("第二个因数"),
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: `${a} × ${b} = ${a * b}` }],
  })
);

server.tool(
  "divide",
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

// 1.2 字符串处理工具
server.tool(
  "string_length",
  {
    text: z.string().describe("要计算长度的文本"),
  },
  async ({ text }) => ({
    content: [{ type: "text", text: `文本长度: ${text.length} 个字符` }],
  })
);

server.tool(
  "string_reverse",
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

// 1.3 日期时间工具
server.tool("current_datetime", {}, async () => {
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

// 1.4 简单的天气查询工具（模拟）
server.tool(
  "get_weather",
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

// ===== 2. 资源（Resources）部分 =====

// 2.1 静态文本资源
server.resource("hello-world", "text://hello-world", async (uri) => ({
  contents: [
    {
      uri: uri.href,
      mimeType: "text/plain",
      text: "Hello, World! 这是一个静态文本资源。",
    },
  ],
}));

// 2.2 动态参数化资源
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "text/plain",
        text: `你好，${name}！很高兴见到你。`,
      },
    ],
  })
);

// 2.3 多参数动态资源
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

// 2.4 JSON数据资源
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

// 2.5 支持列表的资源
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

// ===== 3. 提示（Prompts）部分 =====

// 3.1 简单问答提示
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

// 由于目前版本的MCP SDK中对prompt的role支持限制，我们暂时注释掉这些高级提示功能
/*
// 3.2 代码审查提示
server.prompt(
  "code-review",
  {
    language: z.string().describe("编程语言"),
    code: z.string().describe("要审查的代码"),
  },
  ({ language, code }) => ({
    messages: [
      {
        role: "system",
        content: {
          type: "text",
          text: `你是一位专业的${language}代码审查员。请审查以下代码，提供改进建议。`,
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: `请审查这段${language}代码：\n\n\`\`\`${language}\n${code}\n\`\`\``,
        },
      },
    ],
  })
);

// 3.3 多角色对话提示
server.prompt(
  "interview-simulation",
  {
    position: z.string().describe("面试职位"),
    candidateName: z.string().describe("候选人姓名"),
  },
  ({ position, candidateName }) => ({
    messages: [
      {
        role: "system",
        content: {
          type: "text",
          text: `这是一个${position}职位的面试模拟。你将扮演面试官的角色。`,
        },
      },
      {
        role: "user",
        content: {
          type: "text",
          text: `我是${candidateName}，我来应聘${position}职位。请开始面试。`,
        },
      },
      {
        role: "assistant",
        content: {
          type: "text",
          text: `你好，${candidateName}！我是今天的面试官。很高兴认识你。我们来聊聊你的经历和对${position}这个职位的理解吧。首先，能否简单介绍一下你自己？`,
        },
      },
    ],
  })
);
*/

// 3.2 简化版代码审查提示（仅用户消息）
server.prompt(
  "code-review-simple",
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
          text: `我是一名代码审查员。请审查这段${language}代码：\n\n\`\`\`${language}\n${code}\n\`\`\``,
        },
      },
    ],
  })
);

// 3.3 简化版面试模拟提示（仅用户消息）
server.prompt(
  "interview-simple",
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
          text: `我是${candidateName}，正在参加${position}职位的面试。请你模拟面试官开始面试我。`,
        },
      },
    ],
  })
);

// 启动服务器
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("全面功能 MCP 服务器已启动");
  } catch (error) {
    console.error("服务器启动失败:", error);
    process.exit(1);
  }
}

main();
