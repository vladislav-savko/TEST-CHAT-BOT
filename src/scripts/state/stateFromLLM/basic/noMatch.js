import local from "../../../local/local.js";
import response from "../../../response.js";
import { translate } from "../../../api.js";

export default async () => {
    const { lang } = $session;

    const answer = $session.lastData?.answer;

    if (answer) {
        const answer_translated = await translate(answer, 'en');
        let text = "";
        if (answer_translated.code === 200) {
            text = answer_translated.data[0].translations[0].text;
        } else {
            text = answer_translated.data.response.translated_text;
        }
        
        response.text(text);
    } else {
        response.randomText(local(lang).noMatch);
    }
};
