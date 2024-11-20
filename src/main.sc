require: slotfilling/slotFilling.sc
    module = sys.zb-common

require: scripts/state/stateFromLLM/index.js
    type = scriptEs6
    name = stateJs
    
require: scripts/init.js
    
theme: /
    
    state: Start
        q!: $regex</start> 
        scriptEs6:
            await stateJs.start();

    state: Preprocess
        script:
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
                return $http
                    .get(
                        'https://suapi.net/api/text/translate?to=en&text[]="' + text + '"',
                        {
                            timeout: 10000,
                        }
                    )
                    .then(function (response) {
                        if (response.code === 200) {
                            return response;
                        } else {
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
                        }
                    })
                    .catch(function () {
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
                    });
            }

            function llm(input) {
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
                    case "ShowMore":
                        nextState = "/DisplayResult/ShowMore";
                        break;
                    default:
                        nextState = "/" + state;
                        break;
                }

                var phrases = [
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

                for (var i = 0; i < phrases.length; i++) {
                    var phrase = phrases[i];
                    if (phrase.regex.test(input_text.toLowerCase())) {
                        nextState = phrase.state;
                        break;
                    }
                }

                return nextState;
            }
            var text = $context.request.query;
            if (text[0] === "/") return true;

            language(text).then(function (lng_res) {
                var lng = lng_res.scored_languages_list[0].languages[0];
                var currentState = $context.currentState
                    .split("/")
                    .slice(1)
                    .join("/");
                currentState =
                    currentState === "DisplayResult"
                        ? "InputData"
                        : currentState === "Start"
                        ? "Hello"
                        : currentState
                        ? currentState
                        : "Hello";

                translate(text, lng).then(function (trn_res) {
                    var t_text = "";

                    var isNumberOnly =
                        /^(up|down)?\s*(to)?\s*\d+(k|к)?(-\d+(k)?)?\s*(thousand[s]?|million[s]?)?$/i.test(
                            text
                        );
                    var hasKeywords = /(up|down|from|to)/i.test(text);

                    if (isNumberOnly && !hasKeywords) {
                        t_text = "budget to " + text;
                    } else if (isNumberOnly) {
                        t_text = "budget " + text;
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

                    llm(t_text).then(function (llm_res) {
                        log(toPrettyString(llm_res));
                        var content = llm_res;

                        var answerState = content.state;
                        var answerData = content.data;

                        $context.session.lastData = JSON.parse(answerData || "{}");

                        log(content);
                        $context.temp.targetState = getState(
                            answerState,
                            answerData,
                            t_text
                        );
                    });
                });
            });

    state: SwitchInterfaceLanguage
        q!: $regex</switchLanguage>
        scriptEs6:
            await stateJs.switchLanguage();

        state: Get
            q!: $regex</ru|/en|/el|/pl|/uk>
            scriptEs6:
                await stateJs.getLanguage();

    state: InputData
        scriptEs6:
            await stateJs.inputData();
                
        state: InputLocation
            scriptEs6:
                await stateJs.inputLocation();
                    
        state: InputBedrooms
            scriptEs6:
                await stateJs.inputBedrooms();
                    
        state: InputListingTypes
            scriptEs6:
                await stateJs.inputListingTypes();
        
        state: InputPropertyTypes
            scriptEs6:
                await stateJs.inputPropertyTypes();
                    
        state: InputPrice
            scriptEs6:
                await stateJs.inputPrice();              

    state: DisplayResult
        scriptEs6:
            await stateJs.displayResults();

        state: ShowMore
            scriptEs6:
                await stateJs.showMore();
                
        state: ShowByPosition
            scriptEs6:
                await stateJs.showByPosition();
                
            state: Seller
                q: $regex</seller>
                scriptEs6:
                    await stateJs.seller();
                    
        state: FiltersInfo
            q: $regex</filters>
            scriptEs6:
                await stateJs.filtersInfo();
                    
    state: TelegramCallback
        event!: telegramCallbackQuery
        scriptEs6:
            await stateJs.telegramCallback();
            
        state: Seller
            q: $regex</seller>
            scriptEs6:
                await stateJs.seller();
                
    state: ShowByIndex
        scriptEs6:
            await stateJs.showByIndex();
            
        state: Seller
            q: $regex</seller>
            scriptEs6:
                await stateJs.seller();
                
    state: Restart
        q: $regex</restart>
        scriptEs6:
            await stateJs.restart();

    state: InfoAbout
        q!: $regex</info>
        scriptEs6:
            await stateJs.help();
    
    state: Undo
        q!: $regex</undo>
        scriptEs6:
            await stateJs.undo();
            
    state: Bye
        q!: $regex</bye>
        scriptEs6:
            await stateJs.bye();

    state: NoMatch
        event!: noMatch
        scriptEs6:
            await stateJs.noMatch();