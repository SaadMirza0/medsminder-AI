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

    
    const genAI = new GoogleGenerativeAI("AQ.Ab8RN6LmYiKmr0sphqfM6wdhLq3e2PlNL1p92uoUm0TzaXnc4w");

 
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert medical assistant. Analyze this prescription image.
      You must respond with two clearly separated sections using a double split marker.
      
      Section 1 (Notification Summary): Write a very short, one-sentence summary listing the main medicine name and immediate timing instruction (e.g., "Panadol 500mg - Take 1 tablet after meals").
      
      [SPLIT_HERE]
      
      Section 2 (Detailed Schedule): Provide a beautifully structured markdown text breakdown of all medications found, their dosages, translated shorthand terms, and a clear timeline for the user's screen in short, clear words.
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
    
    // Split the text safely using our custom layout marker
    const parts = replyText.split("[SPLIT_HERE]");
    const notificationSummary = parts[0] ? parts[0].trim() : "Medication reminder updated.";
    const detailedSchedule = parts[1] ? parts[1].trim() : replyText;

    return new Response(JSON.stringify({ 
      notificationSummary: notificationSummary,
      detailedSchedule: detailedSchedule
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
