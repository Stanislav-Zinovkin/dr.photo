import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";

//initalization Gemini SDK

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 

const MESSAGE_DIR = path.join(process.cwd(), "message");
const SOURCE_FILE = path.join(MESSAGE_DIR, "en.json");
const TARGET_LOCALES = ["uk","pl"];

async function translateMessage(){
    if (!fs.existsSync(SOURCE_FILE)) {
        console.error("Source file message/en.json not found!");
        process.exit(1);
    }

    const sourceContent = fs.readFileSync(SOURCE_FILE, "utf-8");

    for ( const locale of TARGET_LOCALES) {
        console.log(`Translating en.json to ${locale}...`);

        const prompt = `You are a professional translator for a high-end photography platform.
Translate the following JSON object from English to target language code: "${locale}".

STRICT RULES:
1. Do NOT modify, translate, or remove any JSON keys.
2. Translate ONLY the string values.
3. Keep the translation concise, formal, and accurate for a professional photography website context.

JSON Content:
${sourceContent}`;
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json", // Warranty of strict JSON without markaown tags
                },
            });
            const cleanJson = response.text ? response.text.trim() : "";

            //Cheking validation JSON before saving
            JSON.parse(cleanJson);

            const targetPath = path.join(MESSAGE_DIR, `${locale}.json`);
            fs.writeFileSync(targetPath, cleanJson, "utf-8");
            console.log(`Successfully generated message/${locale}.json`);
        } catch (error) {
            console.error(`Error translating to ${locale}:`, error);
        }
    }
}

translateMessage();