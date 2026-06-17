import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';
import { UI_TRANSLATIONS_BASE } from './src/constants/Translations.js';

const targetLangs = ['hi', 'gu', 'te', 'ta', 'mr', 'bn', 'kn', 'ml', 'pa', 'ur', 'ne', 'or', 'as', 'sa', 'sd'];
// 'ks' is kashmiri, 'sd' is sindhi. We might just pass whatever is existing in the keys.
const existingLangs = Object.keys(UI_TRANSLATIONS_BASE).filter(l => l !== 'en');
const enKeys = Object.keys(UI_TRANSLATIONS_BASE['en']);

async function run() {
    let resultDict = JSON.parse(JSON.stringify(UI_TRANSLATIONS_BASE));
    let translatedCount = 0;

    for (const lang of existingLangs) {
        let translateLang = lang;
        if (lang === 'or') translateLang = 'or'; // Odia
        if (lang === 'as') translateLang = 'as'; // Assamese
        if (lang === 'ks') continue; // google translate doesn't support Kashmiri directly? we can try though. Some codes might differ. Google Translate might throw an error. So we wrap in try-catch.

        for (const key of enKeys) {
            if (resultDict[lang][key] === undefined) {
                console.log(`Translating ${key} to ${lang}...`);
                try {
                    const res = await translate(resultDict['en'][key], { to: translateLang });
                    resultDict[lang][key] = res.text;
                    translatedCount++;
                } catch (e) {
                    console.error(`Failed to translate ${key} to ${lang}:`, e.message);
                }
            }
        }
    }

    if (translatedCount > 0) {
        console.log(`Translated ${translatedCount} items. Rewriting file...`);
        const newFileContent = `export const UI_TRANSLATIONS_BASE = ${JSON.stringify(resultDict, null, 4)};

export const UI_TRANSLATIONS = new Proxy(UI_TRANSLATIONS_BASE, {
    get: (target, lang) => {
        const langDict = target[lang] || target['en'];
        return new Proxy(langDict, {
            get: (langTarget, key) => langTarget[key] !== undefined ? langTarget[key] : target['en'][key]
        });
    }
});
`;
        fs.writeFileSync('./src/constants/Translations.js', newFileContent, 'utf-8');
        console.log('Done!');
    } else {
        console.log('No items needed translation.');
    }
}

run();
