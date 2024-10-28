import local from "../../../local/local.js";
import response from "../../../response.js";
import { translate } from "../../../api.js";

export default async () => {
    const { lang } = $session;

    const answer = $session.lastData?.answer;

    if (answer) {
        const answer_translated = await translate(answer, 'en');

        if (answer_translated.code === 200) {
            description = answer_translated.data[0].translations[0].text;
        } else {
            description = answer_translated.data.response.translated_text;
        }
    } else {
        response.randomText(local(lang).noMatch);
    }
};
