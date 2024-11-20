import response from "../../response.js";

export default async () => {
    const language = (text) => {
        return $http.post(
            "https://caila.io/api/mlpgate/account/1000062767/model/51023/predict",
            {
                body: {
                    texts: [text],
                },
                headers: {
                    "Content-Type": "application/json",
                    "MLP-API-KEY":
                        "1000160400.95801.PGCrF5ntqFXT6Nolbhg6Qfcbq5xeEJTjL1MMUEQi",
                },
            }
        );
    };

    const translate = async (text, sourceLang) => {
        try {
            const response = await $http.get(
                `https://suapi.net/api/text/translate?to=en&text[]="${text}"`,
                { timeout: 10000 }
            );
            if (response.code === 200) {
                return response;
            } else {
                const fallbackResponse = await $http.get(
                    `https://translate.cloudflare.jaxing.cc/?text=${encodeURIComponent(
                        text
                    )}&source_lang=${sourceLang}&target_lang=en`,
                    { timeout: 10000 }
                );
                return fallbackResponse;
            }
        } catch (error) {
            const fallbackResponse = await $http.get(
                `https://translate.cloudflare.jaxing.cc/?text=${encodeURIComponent(
                    text
                )}&source_lang=${sourceLang}&target_lang=en`,
                { timeout: 10000 }
            );
            return fallbackResponse;
        }
    };

    const llm = (input) => {
        return $http.post("213.149.180.145:58080/chat", {
            timeout: 25000,
            body: {
                message: input,
                code_prompt: "state-entity",
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const getState = (state, data, input_text) => {
        let nextState = state;

        switch (state) {
            case "Seller":
                nextState = "/DisplayResult/ShowByPosition/Seller";
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
                state: "/DisplayResult/ShowByPosition/Seller",
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
    if (text[0] === "/") return true;

    language(text).then((lng_res) => {
        const lng = lng_res.scored_languages_list[0].languages[0];
        let currentState = $context.currentState.split("/").slice(1).join("/");

        currentState =
            currentState === "DisplayResult"
                ? "InputData"
                : currentState === "Start"
                ? "Hello"
                : currentState || "Hello";

        translate(text, lng).then((trn_res) => {
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
                if (trn_res.code === 200) {
                    t_text = trn_res.data[0].translations[0].text;
                } else {
                    t_text = trn_res.response.translated_text;
                }
            }

            $context.request.query = t_text;

            llm(t_text).then((llm_res) => {
                const content = llm_res;
                const answerState = content.state;
                const answerData = content.data;

                $session.lastData = JSON.parse(answerData || "{}");
                $reactions.transition(
                    getState(answerState, answerData, t_text)
                );
            });
        });
    });
};
