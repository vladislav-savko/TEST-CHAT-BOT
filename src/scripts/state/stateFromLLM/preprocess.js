import axios from "axios";

export default async () => {
    const language = async (text) => {
        const response = await axios.post(
            "https://caila.io/api/mlpgate/account/1000062767/model/51023/predict",
            {
                texts: [text],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "MLP-API-KEY":
                        "1000160400.95801.PGCrF5ntqFXT6Nolbhg6Qfcbq5xeEJTjL1MMUEQi",
                },
            }
        );
        return response.data;
    };

    const translate = async (text, sourceLang) => {
        try {
            const response = await axios.get(
                `https://suapi.net/api/text/translate?to=en&text[]="${text}"`,
                { timeout: 10000 }
            );

            if (response.status === 200) {
                return response.data;
            } else {
                const fallbackResponse = await axios.get(
                    `https://translate.cloudflare.jaxing.cc/?text=${text}&source_lang=${sourceLang}&target_lang=en`,
                    { timeout: 10000 }
                );
                return fallbackResponse.data;
            }
        } catch (error) {
            const fallbackResponse = await axios.get(
                `https://translate.cloudflare.jaxing.cc/?text=${text}&source_lang=${sourceLang}&target_lang=en`,
                { timeout: 10000 }
            );
            return fallbackResponse.data;
        }
    };

    const llm = async (input) => {
        const response = await axios.post(
            "http://213.149.180.145:58080/chat",
            {
                message: input,
                code_prompt: "state-entity",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 25000,
            }
        );
        return response.data;
    };

    const getState = (state, input_text) => {
        let nextState = state;

        switch (state) {
            case "Seller":
                nextState = "/ShowByIndex/Seller";
                break;
            case "FiltersInfo":
                nextState = "/DisplayResult/FiltersInfo";
                break;
            case "Hello":
                nextState = "/Start";
                break;
            case "ShowMore":
                nextState = "/DisplayResult/ShowMore";
                break;
            default:
                nextState = `/${state}`;
                break;
        }

        const phrases = [
            {
                regex: /^(hi( to)?|hello|greeting(s)?|hey|good (morning|afternoon|evening))$/i,
                state: "/Start",
            },
            { regex: /^(info|information)$/i, state: "/InfoAbout" },
            {
                regex: /^(seller contacts|seller)$/i,
                state: "/ShowByIndex/Seller",
            },
        ];

        for (const phrase of phrases) {
            if (phrase.regex.test(input_text.toLowerCase())) {
                nextState = phrase.state;
                break;
            }
        }

        return nextState;
    };

    const text = $context.request.query;

    const language_ = await language(text);
    const lng = language_.scored_languages_list[0].languages[0];

    const translate_ = await translate(text, lng);

    let t_text = "";

    const isNumberOnly =
        /^(up|down)?\s*(to)?\s*\d+(k|к)?(-\d+(k)?)?\s*(thousand[s]?|million[s]?)?$/i.test(
            text
        );
    const hasKeywords = /(up|down|from|to)/i.test(text);

    if (isNumberOnly && !hasKeywords) {
        t_text = `budget to ${text}`;
    } else if (isNumberOnly) {
        t_text = `budget ${text}`;
    } else {
        if (translate_.code === 200) {
            t_text = translate_.data[0].translations[0].text;
        } else {
            t_text = translate_.response.translated_text;
        }
    }

    $context.request.query = t_text;
    log(t_text);

    const llm_ = await llm(`${t_text}`.toLowerCase());
    const answerState = llm_.state;
    const answerData = llm_.data;

    log(llm_);

    $session.lastData = JSON.parse(answerData || "{}");
    $reactions.transition(getState(answerState, t_text));
};
