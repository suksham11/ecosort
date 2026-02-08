import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { image, mimeType } = await req.json();

    if (!image || !mimeType) {
      return NextResponse.json(
        { message: "Image and mimeType are required" },
        { status: 400 }
      );
    }

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a waste classification expert. Analyze this image and classify it.

IMPORTANT: First determine if this image contains WASTE/TRASH/RECYCLABLE items.

If the image shows:
- People, faces, selfies → Respond with {"isWaste": false, "message": "This looks like a person, not waste."}
- Animals, pets → Respond with {"isWaste": false, "message": "This is an animal, not waste."}
- Landscapes, buildings, rooms (clean) → Respond with {"isWaste": false, "message": "This doesn't look like waste."}
- Non-waste objects (e.g., a phone in use, clean furniture) → Respond with {"isWaste": false, "message": "This item doesn't appear to be waste."}

If it IS waste, classify it into ONE of these categories:
1. Recyclable (Paper, cardboard, plastic bottles, glass, metal cans)
2. Organic (Food scraps, vegetable peels, garden waste)
3. Hazardous (Batteries, e-waste/electronics, chemicals, paint, medical waste)
4. General (Non-recyclable plastics, wrappers, mixed waste)

Return a JSON string ONLY, no markdown formatting:
{
  "category": "Recyclable" | "Organic" | "Hazardous" | "General",
  "confidence": number (0-100),
  "isWaste": true,
  "detectedObject": "short description of item",
  "message": "explanation of why it belongs to this category"
}`;

    // Convert base64 to GenerativePart
    const imagePart = {
      inlineData: {
        data: image,
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Clean up the response (remove markdown if present)
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(jsonStr);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Error classifying image:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
