function startsWithAny(text, phrases) {
    for (var i = 0; i < phrases.length; i++) {
        if (text.indexOf(phrases[i]) === 0) {
            return true;
        }
    }
    return false;
}

bind("preMatch", function ($context) {
    log('preMatch');
    log({ bind: "preMatch", input: $context });
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
    if (text[0] === "/") return true;
    if (
        text.indexOf("Clear parament") === 0 ||
        text.indexOf("Show details for") === 0 ||
        text.indexOf("Seller Contacts") === 0
    )
        return true;
    if (startsWithAny(text, phrases)) {
        $context.temp.targetState = "/InputData";
        return true;
    }

    $context.temp.targetState = "/Loader";
});

bind("preProcess", function($context) {
    log('preprocess');
});

bind("postProcess", function($context) {
    log('postProcess');
});