import { createTransporter } from '../config/smtpConfig.js';

export const sendEmailWithAudio = async (email, topic, scriptText, audioFilePath) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.GMAIL_EMAIL_ADDRESS,
        to: email,
        subject: `🎬 Automated Video Script & Audio: ${topic}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Generated Script: ${topic}</h1>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                    <h3 style="margin-top:0; color: #0d9488;">AI Prompt Details</h3>
                    <p style="margin: 5px 0;"><strong>Style:</strong> Professional Documentary</p>
                    <p style="margin: 5px 0;"><strong>Visuals:</strong> 16:9 Landscape Aspect Ratio</p>
                    <p style="margin: 5px 0; color: #e11d48;"><strong>🎧 Audio Included:</strong> MP3 Voiceover (script only) attached to this email.</p>
                </div>
                <div style="white-space: pre-wrap; line-height: 1.6; font-size: 15px;">
                    ${scriptText.replace(/\n/g, '<br>')}
                </div>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #64748b; text-align: center;">
                    <p>Automated via MERN AI Video Script Automator</p>
                </div>
            </div>
        `,
        attachments: [
            {
                filename: `Voiceover_${topic.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`,
                path: audioFilePath
            }
        ]
    };

    await transporter.sendMail(mailOptions);
};

export const verifyTransporter = async () => {
    const transporter = createTransporter();
    await transporter.verify();
};
