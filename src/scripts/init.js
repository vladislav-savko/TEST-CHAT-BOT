function language(text) {
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
}

function translate(text, sourceLang) {
    // return $http
    //     .get("https://suapi.net/api/text/translate?to=en&text[]=" + text, {
    //         timeout: 5000,
    //     })
    //     .then(function (response) {
    //         if (response.code === 200) {
    //             return response;
    //         } else {
    //             return $http
    //                 .get(
    //                     "https://translate.cloudflare.jaxing.cc/?text=" +
    //                         encodeURIComponent(text) +
    //                         "&source_lang=" +
    //                         sourceLang +
    //                         "&target_lang=en",
    //                     {
    //                         timeout: 5000,
    //                     }
    //                 )
    //                 .then(function (response_) {
    //                     return response_;
    //                 });
    //         }
    //     })
    //     .catch(function () {
    return $http
        .get(
            "https://translate.cloudflare.jaxing.cc/?text=" +
                encodeURIComponent(text) +
                "&source_lang=" +
                sourceLang +
                "&target_lang=en",
            {
                timeout: 10000,
            }
        )
        .then(function (response_) {
            return response_;
        });
    // });
}

function getPrompt(input, dataExtracted, currentState) {
    return "Input: " + input + "; " + "CurrentState: " + currentState;
}

function llm(input, dataExtracted, currentState) {
    return $http.post("213.149.180.145:58080/chat", {
        timeout: 25000,
        body: {
            message: getPrompt(input, dataExtracted, currentState),
            code_prompt: "state-entity",
        },
        headers: {
            "Content-Type": "application/json",
        },
    });
}

function isStringInArray(str, array) {
    return array.indexOf(str) !== -1;
}

var langs = ["ru", "en", "el", "pl", "uk"];

function formatData(obj) {
    var formattedObject = {};
    var skipProperties = [
        "skip",
        "take",
        "sort",
        "isIncludeCollapsing",
        "withoutSold",
    ];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (skipProperties.indexOf(key) === -1) {
                if (Array.isArray(obj[key]) && obj[key].length > 0) {
                    formattedObject[key] = obj[key];
                } else if (
                    typeof obj[key] === "boolean" ||
                    typeof obj[key] === "number"
                ) {
                    formattedObject[key] = obj[key];
                } else if (
                    typeof obj[key] === "string" &&
                    obj[key].trim() !== ""
                ) {
                    formattedObject[key] = obj[key];
                }
            }
        }
    }

    return formattedObject;
}

function getState(state, data, input_text) {
    var nextState = state;

    switch (state) {
        case "Seller":
            nextState = "/DisplayResult/ShowByPosition/Seller";
            break;
        case "Hello":
            nextState = "/Start";
            break;
        default:
            nextState = "/" + state;
            break;
    }

    if (data.language) {
        nextState = "/SwitchInterfaceLanguage";
    }

    const phrases = [
        { regex: /^(hi( to)?|hello|greeting(s)?|hey|good (morning|afternoon|evening))$/i, state: "/Start" },
        { regex: /^(info|information)$/i, state: "/InfoAbout" },
    ];

    for (const phrase of phrases) {
        if (phrase.regex.test(input_text)) {
            nextState = phrase.state;
            break;
        }
    }

    return nextState;
}

bind("preMatch", function ($context) {
    var text = $context.request.query;
    if (text[0] === "/") return true;

    language(text).then(function (lng_res) {
        var lng = lng_res.scored_languages_list[0].languages[0];
        var currentState = $context.currentState.split("/").slice(1).join("/");
        currentState =
            currentState === "DisplayResult"
                ? "InputData"
                : currentState === "Start"
                ? "Hello"
                : currentState
                ? currentState
                : "Hello";
        var dataExtracted = formatData($context.session.data) || {};

        translate(text, lng).then(function (trn_res) {
            var t_text = "";

            var isNumberOnly = /^(up|down)?\s*(to)?\s*\d+(k)?(-\d+(k)?)*$/.test(text);

            if (isNumberOnly) {
                t_text = 'budget ' + text;
            } else {
                log(trn_res);
                if (trn_res.code === 200) {
                    t_text = trn_res.data[0].translations[0].text;
                } else {
                    t_text = trn_res.response.translated_text;
                }
            }

            $context.request.query = t_text;
            log(toPrettyString($context));

            llm(t_text, dataExtracted, currentState).then(function (llm_res) {
                log(toPrettyString(llm_res));
                var content = llm_res.formatted_response[0];

                var answerState = content.answer_state;
                var answerData = content.answer_data;

                $context.session.lastData = answerData;

                log(answerState);
                log(answerData);

                log(content);
                $context.temp.targetState = getState(
                    answerState,
                    answerData,
                    t_text
                );
            });
        });
    });
});
