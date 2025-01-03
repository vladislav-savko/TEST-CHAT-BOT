function startsWithAny(text, phrases) {
    for (var i = 0; i < phrases.length; i++) {
        if (text.indexOf(phrases[i]) === 0) {
            return true;
        }
    }
    return false;
}

function ga($context) {
    var measurement_id = $env.get("GA_MEASUREMENT_ID", "ERROR");
    var api_secret = $env.get("GA_API_SECRET", "ERROR");

    return $http.query(
        "https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}",
        {
            method: "POST",
            query: { measurement_id: measurement_id, api_secret: api_secret },
            body: JSON.stringify({
                client_id: $context.request.data.chatId,
                events: [
                    {
                        name: $context.request.event || "message",
                        params: {
                            channel_type: $context.request.channelType,
                            message: $context.request.query,
                            session_id: $context.request.channelBotId,
                            engagement_time_msec: "100",
                        },
                    },
                ],
            }),
            timeout: 5000,
        }
    );
}

function signinUser($context) {
    var pushback = $pushgate.createPushback(
        $context.request.channelType,
        $context.request.botId,
        $context.request.channelUserId,
        "newNotification",
        {}
    );

    return $http.query("https://api-stage.anisad.com/api/v1/bot/register", {
        method: "POST",
        body: {
            chanelType: $context.request.channelType,
            purchaseLink: pushback.link,
            userId: $context.request.channelUserId,
        },
        timeout: 2000,
    });
}

function pushHistory($context) {
    return $http.query(
        "https://api-stage.anisad.com/api/v1/bot/users/" +
            $context.request.channelUserId +
            "/history",
        {
            method: "POST",
            body: {
                type: "MESSAGE",
                value: $context.request.query + "",
            },
            timeout: 2000,
        }
    );
}

function createHistory($context) {
    try {
        if (
            $context.session.isNewUser === undefined ||
            $context.session.isNewUser === true
        ) {
            signinUser($context).then(function (response) {
                if (!response) {
                    return false;
                } else {
                    $context.session.isNewUser = false;
                    log({ function: "newUser", output: response });
                    pushHistory($context);
                }
            });
        } else {
            pushHistory($context);
        }
    } catch (error) {
        log({ function: "createHistory", output: error });
    }
}

bind("preMatch", function ($context) {
    log({ bind: "preMatch", input: $context });

    if ($context.request.requestType === "timeout") {
        return true;
    }

    if ($context.request.event === "newNotification") {
        return true;
    }

    if ($context.request.event === "telegramCallbackQuery") {
        return true;
    }

    ga($context);
    createHistory($context);

    if ($context.request.channelType === "telegram") {
        $context.response.replies = $context.response.replies || [];
        $context.response.replies.push({
            type: "raw",
            method: "sendChatAction",
            body: { action: "typing" },
        });
    }

    var text = $context.request.query;

    var phrases = [
        "Продолжить поиск", // ru
        "Continue search", // en
        "Συνέχεια αναζήτησης", // el
        "Продовжити пошук", // uk
        "Kontynuuj wyszukiwanie", // pl
    ];

    if (
        text.indexOf("Clear parament") === 0 ||
        text.indexOf("Show details for") === 0 ||
        text.indexOf("Seller Contacts") === 0 ||
        text.indexOf("/") === 0
    ) {
        return true;
    }

    if (startsWithAny(text, phrases)) {
        $context.temp.targetState = "/InputData";
        return true;
    }

    $context.temp.targetState = "/Loader";
});
