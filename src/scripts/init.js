bind("preMatch", function($context) {
    if ($context.request.query[0] !== '/') {
        $http.get("https://655.mtis.workers.dev/translate?text=${text}&source_lang=en&target_lang=en", {
            timeout: 10000,
            query: {
                text: $context.request.query
            }
        }).then(function (res) {
            $context.request.query = res.response.translated_text;
        });
    }
});