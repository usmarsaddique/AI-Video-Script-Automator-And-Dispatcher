import gTTS from 'gtts';

export const generateAudio = (text, filepath) => {
    return new Promise((resolve, reject) => {
        const gtts = new gTTS(text, 'en'); // 'en' for English
        gtts.save(filepath, (err) => {
            if (err) reject(err);
            else resolve(filepath);
        });
    });
};
