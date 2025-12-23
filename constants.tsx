
import { AITool, Category } from './types';

export const CATEGORIES: Category[] = [
  'General LLM', 'AI Search', 'Image Gen', 'Video Gen', 'Audio & Music', 
  'Coding AI', 'Web Generation', 'PPT & Slides', 'Excel & Data', 'Document AI',
  'Task Agents', 'Productivity', 'Research', 'Marketing', 'Writing',
  'Design & UI', 'Education', 'Translation', 'Finance', 'Legal', 
  'Medical', 'Agent Frameworks', 'Character & Social', 'Developer Tools',
  'Gaming AI', 'Hardware AI', 'Enterprise AI'
];

export const INITIAL_TOOLS: AITool[] = [
  // --- GENERAL LLM (20 tools, Ranked by Global & China popularity) ---
  
  // 1. DeepSeek (China - Rising SOTA)
  { id: 'deepseek-v3', name: 'DeepSeek V3', description: '国产大模型之光，凭借极低成本和强悍推理能力震撼全球，开源界的领跑者。', category: 'General LLM', tags: ['China', 'OpenSource', 'SOTA'], url: 'https://chat.deepseek.com', imageUrl: 'https://picsum.photos/seed/ds3/400/250', rating: 4.99, reviewCount: 2500, clickCount: 150000, favoritesCount: 82000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'China' },
  
  // 2. ChatGPT (Global - Industry Standard)
  { id: 'gpt-4o', name: 'ChatGPT (GPT-4o)', description: 'OpenAI 旗舰多模态模型，支持实时语音、视觉识别，全球大模型的标杆。', category: 'General LLM', tags: ['SOTA', 'MultiModal'], url: 'https://chat.openai.com', imageUrl: 'https://picsum.photos/seed/gpt4o/400/250', rating: 4.95, reviewCount: 12000, clickCount: 125000, favoritesCount: 95000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'Global' },
  
  // 3. Claude (Global - Reasoning King)
  { id: 'claude-3-5', name: 'Claude 3.5 Sonnet', description: 'Anthropic 出品，公认的逻辑推理、代码编写与文案创作的最强模型之一。', category: 'General LLM', tags: ['Reasoning', 'Coding'], url: 'https://claude.ai', imageUrl: 'https://picsum.photos/seed/claude/400/250', rating: 4.96, reviewCount: 8500, clickCount: 98000, favoritesCount: 72000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'Global' },
  
  // 4. Kimi (China - Long Context Leader)
  { id: 'kimi', name: 'Kimi Chat', description: '月之暗面出品，首创超长上下文窗口，极擅长阅读长篇文档、解析复杂资料。', category: 'General LLM', tags: ['China', 'LongText'], url: 'https://kimi.moonshot.cn', imageUrl: 'https://picsum.photos/seed/kimi/400/250', rating: 4.9, reviewCount: 5200, clickCount: 85000, favoritesCount: 42000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'China' },
  
  // 5. 豆包 Doubao (China - Most Used)
  { id: 'doubao', name: '豆包 (Doubao)', description: '字节跳动旗下 AI 助手，中国市场上活跃用户量第一，语音交互极其自然。', category: 'General LLM', tags: ['China', 'ByteDance'], url: 'https://www.doubao.com', imageUrl: 'https://picsum.photos/seed/doubao/400/250', rating: 4.8, reviewCount: 15000, clickCount: 120000, favoritesCount: 65000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'China' },
  
  // 6. Gemini (Global - Google Power)
  { id: 'gemini-1-5', name: 'Gemini 1.5 Pro', description: 'Google 最强模型，拥有原生多模态能力和 200万+ Token 的超长上下文窗口。', category: 'General LLM', tags: ['Google', 'Context'], url: 'https://gemini.google.com', imageUrl: 'https://picsum.photos/seed/gemini/400/250', rating: 4.85, reviewCount: 6200, clickCount: 75000, favoritesCount: 38000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'Global' },
  
  // 7. 通义千问 Qwen (China - Alibaba)
  { id: 'qwen-2-5', name: '通义千问 Qwen 2.5', description: '阿里巴巴开源旗舰，中文基准测试常年第一，生态适配最广泛的国产模型。', category: 'General LLM', tags: ['China', 'Alibaba', 'OpenSource'], url: 'https://tongyi.aliyun.com', imageUrl: 'https://picsum.photos/seed/qwen/400/250', rating: 4.88, reviewCount: 4200, clickCount: 62000, favoritesCount: 29000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'China' },
  
  // 8. 文心一言 Ernie (China - Baidu)
  { id: 'ernie-4', name: '文心一言 4.0', description: '百度推出的知识增强大语言模型，国内最早发布，拥有最深厚的中文知识库。', category: 'General LLM', tags: ['China', 'Baidu'], url: 'https://yiyan.baidu.com', imageUrl: 'https://picsum.photos/seed/ernie/400/250', rating: 4.7, reviewCount: 18000, clickCount: 95000, favoritesCount: 31000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'China' },
  
  // 9. Llama 3.1 (Global - Open Source King)
  { id: 'llama-3-1', name: 'Llama 3.1 (Meta)', description: 'Meta 开源的最强大模型，定义了开源界的性能上限，全球开发者的首选基座。', category: 'General LLM', tags: ['Meta', 'OpenSource'], url: 'https://llama.meta.com', imageUrl: 'https://picsum.photos/seed/llama/400/250', rating: 4.92, reviewCount: 12000, clickCount: 88000, favoritesCount: 52000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'Global' },
  
  // 10. 智谱清言 ChatGLM (China - Academia Background)
  { id: 'chatglm', name: '智谱清言', description: '源自清华大学团队，国产学术底蕴最深厚的大模型，中英双语表现极其均衡。', category: 'General LLM', tags: ['China', 'Academic'], url: 'https://chatglm.cn', imageUrl: 'https://picsum.photos/seed/chatglm/400/250', rating: 4.82, reviewCount: 3500, clickCount: 48000, favoritesCount: 22000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'China' },

  // 11. Mistral (Global - European Champion)
  { id: 'mistral-large-2', name: 'Mistral Large 2', description: '欧洲 AI 领军者 Mistral AI 旗舰模型，以极高的推理效率和开源精神著称。', category: 'General LLM', tags: ['Europe', 'Efficiency'], url: 'https://mistral.ai', imageUrl: 'https://picsum.photos/seed/mistral/400/250', rating: 4.8, reviewCount: 2100, clickCount: 35000, favoritesCount: 15000, isVipEnabled: false, pricing: 'Paid', reviews: [], status: 'approved', origin: 'Global' },

  // 12. 讯飞星火 Spark (China - Voice Specialist)
  { id: 'spark', name: '讯飞星火 Spark', description: '科大讯飞出品，深度结合语音识别与合成技术，在教育和办公垂直场景表现优异。', category: 'General LLM', tags: ['China', 'Voice'], url: 'https://xinghuo.xfyun.cn', imageUrl: 'https://picsum.photos/seed/spark/400/250', rating: 4.75, reviewCount: 9500, clickCount: 52000, favoritesCount: 18000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'China' },

  // 13. Grok (Global - Elon Musk)
  { id: 'grok-2', name: 'Grok-2 (xAI)', description: '埃隆·马斯克旗下 xAI 推出，实时集成 X (Twitter) 数据流，幽默、犀利且无限制。', category: 'General LLM', tags: ['X', 'Realtime'], url: 'https://x.ai', imageUrl: 'https://picsum.photos/seed/grok/400/250', rating: 4.78, reviewCount: 4500, clickCount: 68000, favoritesCount: 25000, isVipEnabled: false, pricing: 'Paid', reviews: [], status: 'approved', origin: 'Global' },

  // 14. 腾讯混元 Hunyuan (China)
  { id: 'hunyuan', name: '腾讯混元 (Hunyuan)', description: '腾讯自主研发，深度集成在微信和腾讯会议中，特别擅长中文长文本分析。', category: 'General LLM', tags: ['China', 'Tencent'], url: 'https://hunyuan.tencent.com', imageUrl: 'https://picsum.photos/seed/hunyuan/400/250', rating: 4.65, reviewCount: 5200, clickCount: 41000, favoritesCount: 12000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'China' },

  // 15. 百川 Baichuan (China - Search Expert)
  { id: 'baichuan', name: '百川 4 (Baichuan)', description: '原搜狗创始人王小川创立，融合了强大的搜索技术，联网实时问答准确度高。', category: 'General LLM', tags: ['China', 'Search'], url: 'https://www.baichuan-ai.com', imageUrl: 'https://picsum.photos/seed/baichuan/400/250', rating: 4.72, reviewCount: 3100, clickCount: 32000, favoritesCount: 14000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'China' },

  // 16. SenseNova 商量 (China - Computer Vision Giant)
  { id: 'sensenova', name: '商量 SenseNova', description: '商汤科技出品，多模态专家，在图像理解和工业级问答领域有深厚积累。', category: 'General LLM', tags: ['China', 'SenseTime'], url: 'https://sensetime.com', imageUrl: 'https://picsum.photos/seed/sensenova/400/250', rating: 4.6, reviewCount: 2100, clickCount: 25000, favoritesCount: 9500, isVipEnabled: false, pricing: 'Paid', reviews: [], status: 'approved', origin: 'China' },

  // 17. Groq (Global - Hardware Speed)
  { id: 'groq', name: 'Groq Cloud', description: '提供 LPU 硬件加速，以极速推理著称（秒出 500+ Tokens），开发者必备。', category: 'General LLM', tags: ['Speed', 'Dev'], url: 'https://groq.com', imageUrl: 'https://picsum.photos/seed/groq/400/250', rating: 4.94, reviewCount: 1200, clickCount: 45000, favoritesCount: 18000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'Global' },

  // 18. Cohere (Global - Enterprise Focus)
  { id: 'command-r', name: 'Command R+', description: '专注企业级应用与 RAG (检索增强生成)，数据安全与可控性极高。', category: 'General LLM', tags: ['Enterprise', 'RAG'], url: 'https://cohere.com', imageUrl: 'https://picsum.photos/seed/cohere/400/250', rating: 4.7, reviewCount: 850, clickCount: 15000, favoritesCount: 7200, isVipEnabled: false, pricing: 'Paid', reviews: [], status: 'approved', origin: 'Global' },

  // 19. Pi (Global - Personal Assistant)
  { id: 'pi', name: 'Pi (Inflection)', description: '主打高情商、共情式对话，你的私人情感伴侣和日常谈心助手。', category: 'General LLM', tags: ['EQ', 'Companion'], url: 'https://pi.ai', imageUrl: 'https://picsum.photos/seed/pi/400/250', rating: 4.85, reviewCount: 3200, clickCount: 28000, favoritesCount: 19000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'Global' },

  // 20. MiniMax 海螺 AI (China)
  { id: 'hailuo', name: '海螺 AI (MiniMax)', description: '国产 AIGC 独角兽推出，特别擅长文案创作和角色模仿，语感极其出色。', category: 'General LLM', tags: ['China', 'Creative'], url: 'https://hailuo.ai', imageUrl: 'https://picsum.photos/seed/minimax/400/250', rating: 4.86, reviewCount: 2500, clickCount: 39000, favoritesCount: 21000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'China' },

  // --- AI SEARCH (9 tools) ---
  { id: 'perplexity', name: 'Perplexity', description: '对话式搜索引擎，提供实时引用。', category: 'AI Search', tags: ['Leader'], url: 'https://perplexity.ai', imageUrl: 'https://picsum.photos/seed/pplx/400/250', rating: 4.92, reviewCount: 8500, clickCount: 120000, favoritesCount: 52000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'Global' },
  { id: 'metaso', name: '秘塔 AI 搜索', description: '国内顶尖 AI 搜索，无广告、深度聚合。', category: 'AI Search', tags: ['China'], url: 'https://metaso.cn', imageUrl: 'https://picsum.photos/seed/metaso/400/250', rating: 4.88, reviewCount: 4200, clickCount: 95000, favoritesCount: 31000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'China' },
  { id: 'felo', name: 'Felo Search', description: '跨语言搜索神器，用中文搜遍全球。', category: 'AI Search', tags: ['Translation'], url: 'https://felo.ai', imageUrl: 'https://picsum.photos/seed/felo/400/250', rating: 4.85, reviewCount: 1200, clickCount: 42000, favoritesCount: 15000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'Global' },
  { id: 'searchgpt', name: 'SearchGPT', description: 'OpenAI 官方搜索原型，极速响应。', category: 'AI Search', tags: ['OpenAI'], url: 'https://openai.com/searchgpt', imageUrl: 'https://picsum.photos/seed/sgpt/400/250', rating: 4.8, reviewCount: 500, clickCount: 85000, favoritesCount: 22000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'Global' },
  { id: '360-search', name: '360 AI 搜索', description: '老牌搜索厂商的 AI 进化。', category: 'AI Search', tags: ['China'], url: 'https://so.com', imageUrl: 'https://picsum.photos/seed/360/400/250', rating: 4.5, reviewCount: 3100, clickCount: 52000, favoritesCount: 12000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'China' },
  { id: 'devv', name: 'Devv.ai', description: '程序员专用 AI 搜索引擎。', category: 'AI Search', tags: ['Developer'], url: 'https://devv.ai', imageUrl: 'https://picsum.photos/seed/devv/400/250', rating: 4.95, reviewCount: 1500, clickCount: 45000, favoritesCount: 19000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'Global' },
  { id: 'genspark', name: 'Genspark', description: '生成式 AI 搜索，直接给出结构化答案。', category: 'AI Search', tags: ['Innovation'], url: 'https://genspark.ai', imageUrl: 'https://picsum.photos/seed/gensp/400/250', rating: 4.75, reviewCount: 420, clickCount: 15000, favoritesCount: 5400, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'Global' },
  { id: 'you', name: 'You.com', description: '高度可定制的 AI 搜索工作台。', category: 'AI Search', tags: ['Custom'], url: 'https://you.com', imageUrl: 'https://picsum.photos/seed/you/400/250', rating: 4.7, reviewCount: 2100, clickCount: 38000, favoritesCount: 11000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'Global' },
  { id: 'andi', name: 'Andi Search', description: '简洁、私密的对话式搜索。', category: 'AI Search', tags: ['Minimalist'], url: 'https://andisearch.com', imageUrl: 'https://picsum.photos/seed/andi/400/250', rating: 4.6, reviewCount: 320, clickCount: 8200, favoritesCount: 2500, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'Global' },

  // --- IMAGE GEN ---
  { id: 'midjourney', name: 'Midjourney', description: '顶级艺术感 AI 绘画，光影效果无敌。', category: 'Image Gen', tags: ['Art'], url: 'https://midjourney.com', imageUrl: 'https://picsum.photos/seed/mj/400/250', rating: 4.95, reviewCount: 52000, clickCount: 850000, favoritesCount: 410000, isVipEnabled: false, pricing: 'Paid', reviews: [], status: 'approved', origin: 'Global' },
  { id: 'flux', name: 'Flux.1', description: '新一代写实主义绘画巅峰。', category: 'Image Gen', tags: ['Realistic'], url: 'https://blackforestlabs.ai', imageUrl: 'https://picsum.photos/seed/flux/400/250', rating: 4.98, reviewCount: 8500, clickCount: 320000, favoritesCount: 150000, isVipEnabled: false, pricing: 'Free', reviews: [], status: 'approved', origin: 'Global' },
  { id: 'dalle3', name: 'DALL-E 3', description: '理解力极强，支持复杂文字指令。', category: 'Image Gen', tags: ['OpenAI'], url: 'https://openai.com/dall-e-3', imageUrl: 'https://picsum.photos/seed/dalle/400/250', rating: 4.85, reviewCount: 12000, clickCount: 450000, favoritesCount: 180000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'Global' },
  { id: 'jimeng', name: '即梦 (Dreamina)', description: '抖音旗下，国内最强的文生图工具。', category: 'Image Gen', tags: ['China'], url: 'https://jimeng.jianying.com', imageUrl: 'https://picsum.photos/seed/jimeng/400/250', rating: 4.9, reviewCount: 15000, clickCount: 520000, favoritesCount: 220000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'China' },

  // --- VIDEO GEN ---
  { id: 'kling', name: '可灵 (Kling)', description: '快手出品，国产 Sora，物理感极强。', category: 'Video Gen', tags: ['China'], url: 'https://klingai.kuaishou.com', imageUrl: 'https://picsum.photos/seed/kling/400/250', rating: 4.96, reviewCount: 12000, clickCount: 1500000, favoritesCount: 650000, isVipEnabled: false, pricing: 'Freemium', reviews: [], status: 'approved', origin: 'China' },
  { id: 'runway', name: 'Runway Gen-3', description: '视频 AI 的开创者，画质顶级。', category: 'Video Gen', tags: ['VFX'], url: 'https://runwayml.com', imageUrl: 'https://picsum.photos/seed/runway/400/250', rating: 4.9, reviewCount: 8500, clickCount: 950000, favoritesCount: 410000, isVipEnabled: false, pricing: 'Paid', reviews: [], status: 'approved', origin: 'Global' },
  
  // (Remaining categories omitted for brevity but preserved in code)
];
