import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ GEMINI_API_KEY не знайдено у файлі .env!");
    process.exit(1);
}

// Initializing Gemini SDK

const ai = new GoogleGenAI({ apiKey });

const MESSAGE_DIR = path.join(process.cwd(), "message");

const SOURCE_FILE = path.join(MESSAGE_DIR, "en.json");

const TARGET_LOCALES = ["uk","pl"];

function getMissingKey(source: any, target: any): any {
    const missing: any = {};
    for(const key of Object.keys(source)) {
        if (target === undefined || target[key] === undefined) {
            missing[key] = source[key];
        } else if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key]))
        {const nestedMissing = getMissingKey(source[key], target[key]);
            if (Object.keys(nestedMissing).length > 0) {
                missing[key] = nestedMissing;
            }
        }
    }
    return missing;
}

function deepMerge(target: any, source: any): any {
    const output = { ...target };
    for(const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
            output[key] = source[key];
        }
    }
    return output;
}


async function generateWithRetry(prompt: string, maxRetries = 3, initialDelay = 2000) {
    let delay = initialDelay;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-3.8-flash", // Updated to a stable model version
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                },
            });
            return response.text;
        } catch (error: any) {
            if (error?.status === 503 && attempt < maxRetries) {
                console.warn(`⚠️ Model busy (503). Retrying attempt ${attempt}/${maxRetries} in ${delay / 1000}s...`);
                await new Promise((res) => setTimeout(res, delay));
                delay *= 2;
            } else {
                throw error;
            }
        }
    }
    throw new Error("Max retries exceeded due to model unavailability.");
}

async function translateMessage(){
    if (!fs.existsSync(SOURCE_FILE)) {
        console.error("Source file message/en.json not found!");
        process.exit(1);
    }

    // Updated: Parse source content as JSON instead of raw string
    const sourceContent = JSON.parse(fs.readFileSync(SOURCE_FILE, "utf-8"));

    for (const locale of TARGET_LOCALES) {
        const targetPath = path.join(MESSAGE_DIR, `${locale}.json`);

        let targetContent = {};
        if (fs.existsSync(targetPath)) {
            try {
                targetContent = JSON.parse(fs.readFileSync(targetPath, "utf-8"));
            } catch (e) {
                console.warn(`⚠️ Could not parse ${locale}.json, recreating it.`);
            }
        }

        const missingKeys = getMissingKey(sourceContent, targetContent);

        if (Object.keys(missingKeys).length === 0) {
            console.log(`✨ ${locale}.json is already up to date. Skipping translation.`);
            continue;
        }

        console.log(`🔄 Translating missing keys for ${locale}...`);
        const prompt = `You are a professional translator for a high-end photography platform.
Translate the following JSON object subset from English to target language code: "${locale}".
STRICT RULES:
1. Do NOT modify, translate, or remove any JSON keys.
2. Translate ONLY the string values.
3. Keep the translation concise, formal, and accurate for a professional photography website context.
JSON Content to Translate:
${JSON.stringify(missingKeys, null, 2)}`;

        try {
            const responseText = await generateWithRetry(prompt);
            const cleanJson = responseText ? responseText.trim() : "";

            // Checking validation
            JSON.parse(cleanJson);
            const translatedMissing = JSON.parse(cleanJson);

            //Merge new translations
            const updatedContent = deepMerge(targetContent, translatedMissing);

            fs.writeFileSync(targetPath, JSON.stringify(updatedContent, null, 2), "utf-8");
            console.log(`Successfully updated message/${locale}.json`);

            // delay between locales for stability
            await new Promise((res) => setTimeout(res, 1500));
        } catch (error) {
            console.error(`Error translating to ${locale}:`, error);
        }
    }
}

translateMessage();