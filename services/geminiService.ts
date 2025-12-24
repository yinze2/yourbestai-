
import { GoogleGenAI, Type } from "@google/genai";

const getAIInstance = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
};

export const getSmartRecommendations = async (userPrompt: string) => {
  try {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is looking for an AI tool with this requirement: "${userPrompt}". 
      Explain what kind of tools would be best and suggest keywords they should search for. 
      Format the response naturally and use the user's language if possible.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI Assistant is currently unavailable.";
  }
};

export const fetchLatestAINews = async (lang: 'en' | 'zh') => {
  try {
    const ai = getAIInstance();
    // 针对 Vercel 等环境，优化 Prompt，强制模型利用搜索工具并返回标准 JSON
    const query = lang === 'zh' 
      ? "搜索并总结过去24小时内关于 OpenAI (Sora, GPT), Google Gemini, Claude 3.5, DeepSeek 以及国产大模型（如智谱、Kimi）的最新的、真实的重大新闻。请确保新闻是真实发生的，不要生成虚假内容。以 JSON 数组格式返回，包含 id, title, summary, source, url, publishedAt, sentiment。"
      : "Search for and summarize the most important and real-time news from the last 24 hours regarding OpenAI (Sora, GPT), Google Gemini, Anthropic Claude, Meta Llama, and leading AI research. Ensure the news is factually correct. Return a JSON array with: id, title, summary, source, url, publishedAt, sentiment (POSITIVE/NEGATIVE/NEUTRAL).";

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              source: { type: Type.STRING },
              url: { type: Type.STRING },
              publishedAt: { type: Type.STRING },
              sentiment: { type: Type.STRING, description: "POSITIVE, NEGATIVE, or NEUTRAL" }
            },
            required: ["id", "title", "summary", "source", "url", "publishedAt", "sentiment"]
          }
        }
      },
    });

    const result = JSON.parse(response.text || "[]");
    // 如果返回结果为空，则可能是模型未正常调用搜索工具，此处增加备选逻辑（实际部署中建议配合本地缓存）
    return result.length > 0 ? result : [];
  } catch (error) {
    console.error("Fetch News Error in Vercel/Production:", error);
    // 增加一个基本的空数组返回，防止前端 UI 崩溃
    return [];
  }
};

export const analyzeReviewSentiment = async (comment: string) => {
  try {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze if this user review is positive or negative: "${comment}". Answer with just one word: POSITIVE, NEGATIVE, or NEUTRAL.`,
      config: {
        temperature: 0.1,
      },
    });
    return (response.text || "NEUTRAL").trim().toUpperCase();
  } catch (error) {
    console.error("Sentiment Analysis Error:", error);
    return "NEUTRAL";
  }
};
