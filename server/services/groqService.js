import { groqConfig } from '../config/groqConfig.js';

export const generateScriptFromGroq = async (topic) => {
    // Updated Prompt with tags restriction and 16:9 condition
    const prompt = `Topic: ${topic}\n\nInstructions:\n1. Format: Provide Metadata, Visual Prompts, and the Voiceover Script.\n2. CRITICAL RULE: You must wrap the ACTUAL spoken voiceover script/story entirely inside [START_AUDIO] and [END_AUDIO] tags. Do not put visual instructions inside these tags.\n3. Style: Professional Documentary style.\n4. Visual Constraints: Every visual prompt must strictly be in 16:9 landscape aspect ratio. Do NOT include any empty space for text overlays. Ensure high-quality cinematic descriptions.`;

    const apiResponse = await fetch(groqConfig.baseUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${groqConfig.apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: groqConfig.model,
            messages: [{ "role": "user", "content": prompt }]
        })
    });

    if (!apiResponse.ok) {
        throw new Error(`API Error: ${apiResponse.statusText}`);
    }

    const data = await apiResponse.json();
    return data.choices[0].message.content;
};

export const extractCleanAudioText = (scriptText) => {
    let textForAudio = scriptText;
    const match = scriptText.match(/\[START_AUDIO\]([\s\S]*?)\[END_AUDIO\]/i);

    if (match) {
        textForAudio = match[1].trim();
    } else {
        console.log("⚠️ WARNING: Tags nahi mile, pura text use ho raha hai.");
    }

    // 1. Text ko saaf karein (Faltoo symbols aur 'Narrator' waghera nikal dein)
    textForAudio = textForAudio
        .replace(/\*/g, '') // Saare ** mita dega
        .replace(/#/g, '')  // Saare ## mita dega
        .replace(/Narrator.*?:/gi, '') // "Narrator (tone):" mita dega
        .replace(/Visual.*?:/gi, '') // Agar koi visual prompt bacha ho tou wo nikal dega
        .trim();

    // 2. Google block na kare isliye sirf pehle 1000 characters ki audio banayen
    if (textForAudio.length > 1000) {
        textForAudio = textForAudio.substring(0, 1000) + "...";
    }

    return textForAudio;
};
