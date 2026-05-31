import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: "No image file detected" }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const genAI = new GoogleGenerativeAI("AQ.Ab8RN6LKNY6zRCmwDETwC3TZh870_koojUyBUP52DRbFRLaOXw");
    

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      You are an expert medical assistant. Analyze this prescription image.
      You must respond with a JSON object containing exactly two keys: "notificationSummary" and "detailedSchedule".
      
      1. For "notificationSummary": Write a very short sentence listing the main medicine name and its immediate timing instruction (e.g., "Panadol 500mg - Take 1 tablet after meals").
      2. For "detailedSchedule": Provide a beautifully structured markdown text breakdown of all medications found, their dosages, translated shorthand terms, and a clear timeline for the user's screen and tell in clear wording so any one can understand easily short clear instructions .

      Example JSON output format:
      {
        "notificationSummary": "Amoxicillin 250mg - Take 3 times daily",
        "detailedSchedule": "### 📋 Prescription Details\\n- **Amoxicillin 250mg**: Three times a day after food."
      }
    `;

    const response = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: file.type || "image/jpeg",
        },
      },
    ]);

    const replyText = response.response.text();
    
    const parsedData = JSON.parse(replyText);

    return new Response(JSON.stringify({ 
      notificationSummary: parsedData.notificationSummary,
      detailedSchedule: parsedData.detailedSchedule
    }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
