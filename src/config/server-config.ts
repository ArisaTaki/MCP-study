/**
 * MCP 服务器配置
 */
export const SERVER_CONFIG = {
  name: "comprehensive-mcp-server",
  version: "1.0.0",
  description: "全功能 MCP 服务器",
};

/**
 * 资源配置
 */
export const RESOURCE_CONFIG = {
  greeting: {
    template: "greeting://{name}",
    description: "生成个性化问候信息",
  },
  hello_world: {
    uri: "text://hello-world",
    description: "静态欢迎信息",
  },
  user_profile: {
    template: "user://{userId}/profile/{section}",
    description: "用户资料信息",
  },
  product_info: {
    template: "product://{productId}",
    description: "产品详细信息",
  },
  articles: {
    template: "articles://{category}",
    description: "按类别浏览文章",
  },
};

/**
 * 工具配置
 */
export const TOOL_CONFIG = {
  math: {
    add: {
      name: "add",
      description: "将两个数字相加",
    },
    subtract: {
      name: "subtract",
      description: "计算两个数字的差",
    },
    multiply: {
      name: "multiply",
      description: "计算两个数字的乘积",
    },
    divide: {
      name: "divide",
      description: "计算两个数字的商",
    },
  },
  string_operations: {
    length: {
      name: "string_length",
      description: "计算文本的字符长度",
    },
    reverse: {
      name: "string_reverse",
      description: "反转文本内容",
    },
  },
  datetime: {
    current: {
      name: "current_datetime",
      description: "获取当前日期和时间",
    },
  },
  weather: {
    get: {
      name: "get_weather",
      description: "查询城市天气",
    },
  },
};

/**
 * 提示模板配置
 */
export const PROMPT_CONFIG = {
  simple_question: {
    name: "simple-question",
    description: "简单问答提示",
  },
  code_review: {
    name: "code-review",
    description: "代码审查提示",
  },
  interview: {
    name: "interview-simulation",
    description: "面试模拟提示",
  },
};
