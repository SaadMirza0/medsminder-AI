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

  
    const apiKey = process.env.GEMINI_API_KEY;
   const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ 
      model:  "gemini-3.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      You are an expert medical assistant. Analyze this prescription image.
      You must respond with a JSON object containing exactly these keys: "notificationSummary", "detailedSchedule", "medicationName", "dosage", "frequency", "duration", "confidence".
      
      1. "notificationSummary": Write a very short sentence listing the main medicine name and its immediate timing instruction (e.g., "Panadol 500mg - Take 1 tablet after meals").
      2. "detailedSchedule": Provide a beautifully structured markdown text breakdown of all medications found, their dosages, translated shorthand terms, and a clear timeline for the user's screen.
      3. "medicationName": The primary name of the medication found (e.g. "Amoxicillin").
      4. "dosage": The dosage (e.g. "500mg").
      5. "frequency": The frequency (e.g. "3 times daily").
      6. "duration": The duration (e.g. "7 days").
      7. "confidence": A percentage confidence string (e.g. "98.5%") based on readability of the handwriting.

      Example JSON output format:
      {
        "notificationSummary": "Amoxicillin 250mg - Take 3 times daily",
        "detailedSchedule": "### 📋 Prescription Details\\n- **Amoxicillin 250mg**: Three times a day after food.",
        "medicationName": "Amoxicillin",
        "dosage": "250mg",
        "frequency": "3 times daily",
        "duration": "7 days",
        "confidence": "99.8%"
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
      detailedSchedule: parsedData.detailedSchedule,
      medicationName: parsedData.medicationName || "Unknown",
      dosage: parsedData.dosage || "N/A",
      frequency: parsedData.frequency || "N/A",
      duration: parsedData.duration || "N/A",
      confidence: parsedData.confidence || "95.0%"
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





