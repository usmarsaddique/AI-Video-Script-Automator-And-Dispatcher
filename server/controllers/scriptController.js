import path from 'path';
import { verifyTransporter, sendEmailWithAudio } from '../services/emailService.js';
import { generateScriptFromGroq, extractCleanAudioText } from '../services/groqService.js';
import { generateAudio } from '../services/audioService.js';

export const processAutomation = async (req, res) => {
    const { topics, emails } = req.body;

    if (!topics || !topics.length || !emails || !emails.length) {
        return res.status(400).json({ error: 'Topics and emails are required.' });
    }

    // SSE (Server-Sent Events) Setup for Live Logs
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendLog = (message, status = 'info') => {
        res.write(`data: ${JSON.stringify({ message, status, timestamp: new Date().toISOString() })}\n\n`);
    };

    sendLog('🚀 Started automation process...', 'success');

    try {
        await verifyTransporter();
        sendLog('✅ SMTP connection verified. Starting AI generation...', 'success');

        for (const topic of topics) {
            sendLog(`⏳ Generating script for topic: "${topic}"...`, 'info');

            try {
                const scriptText = await generateScriptFromGroq(topic);
                sendLog(`✅ Script generated for: "${topic}".`, 'success');

                const textForAudio = extractCleanAudioText(scriptText);
                console.log(`\n🎙️ FINAL CLEAN TEXT FOR AUDIO:\n${textForAudio}\n`);

                const audioFilePath = path.resolve(`./voiceover_${Date.now()}.mp3`);
                sendLog(`🎙️ Generating AI Voiceover audio...`, 'info');

                await generateAudio(textForAudio, audioFilePath);
                sendLog(`✅ Voiceover MP3 generated successfully! Sending emails...`, 'success');

                for (const email of emails) {
                    sendLog(`⏳ Sending script and audio to ${email}...`, 'info');
                    await sendEmailWithAudio(email, topic, scriptText, audioFilePath);
                    sendLog(`✅ Email with MP3 sent to ${email}`, 'success');
                }

                // Cleanup code can go here if needed.

            } catch (err) {
                console.error(`Error processing topic ${topic}:`, err);
                sendLog(`❌ Failed processing topic "${topic}": ${err.message}`, 'error');
            }
        }

        sendLog('🎉 All tasks completed successfully!', 'success');
        res.end();

    } catch (error) {
        console.error('Automation Error:', error);
        sendLog(`❌ Fatal Error: ${error.message}`, 'error');
        res.end();
    }
};
