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

    // return $http.query(
    //     "https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}",
    //     {
    //         method: "POST",
    //         query: { measurement_id: measurement_id, api_secret: api_secret },
    //         body: {
    //             client_id: $context.request.data.chatId,
    //             events: [
    //                 {
    //                     name: $context.request.event || "message",
    //                     params: {
    //                         channel_type: $context.request.channelType,
    //                         message: $context.request.query,
    //                         session_id: $context.request.channelBotId,
    //                         engagement_time_msec: "100",
    //                     },
    //                 },
    //             ],
    //         },
    //         timeout: 5000,
    //     }
    // );

    return $http.get(
        'https://suapi.net/api/text/translate?to=en&text[]="' + 'Привет' + '"',
        {
            timeout: 10000,
        }
    );
}

bind("preMatch", function ($context) {
    log({ bind: "preMatch", input: $context });

    if ($context.request.requestType === "timeout") {
        return true;
    }

    ga($context);

    var phrases = [
        "Продолжить поиск", // ru
        "Continue search", // en
        "Συνέχεια αναζήτησης", // el
        "Продовжити пошук", // uk
        "Kontynuuj wyszukiwanie", // pl
    ];

    $context.response.replies = $context.response.replies || [];
    $context.response.replies.push({
        type: "raw",
        method: "sendChatAction",
        body: { action: "typing" },
    });

    var text = $context.request.query;

    if (
        text.indexOf("Clear parament") === 0 ||
        text.indexOf("Show details for") === 0 ||
        text.indexOf("Seller Contacts") === 0 ||
        text.indexOf("/") === 0
    )
        return true;
    if (startsWithAny(text, phrases)) {
        $context.temp.targetState = "/InputData";
        return true;
    }

    $context.temp.targetState = "/Loader";
});
