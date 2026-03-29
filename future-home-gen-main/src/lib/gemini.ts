import { GoogleGenAI } from "@google/genai";

export const generateDesignLayout = async (prompt: string, apiKey: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = 
      "You are an expert AI architect and building designer for BuildGen AI. " +
      "Describe the building layout, structure, recommended materials, and a rough cost estimate " +
      "based off the user's requirements. Format your response cleanly using markdown headings (##), " +
      "bullet points, and short paragraphs. Make it professional, practical, and highly detailed.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${systemInstruction}\n\nUser Request: ${prompt}`,
    });
    return response.text;
  } catch (err: any) {
    console.error("Gemini API Error", err);
    throw new Error(err.message || "Failed to generate design.");
  }
}

