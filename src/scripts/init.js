// bind("preMatch", function($context) {
//     if ($context.request.query[0] !== '/') {
//         $http.post("https://caila.io/api/mlpgate/account/1000062767/model/51023/predict", {
//             body: {
//                 "texts": [
//                     $context.request.query
//                 ]
//             },
//             headers: {
//                 "Content-Type": "application/json",
//                 "MLP-API-KEY": "1000160400.95801.PGCrF5ntqFXT6Nolbhg6Qfcbq5xeEJTjL1MMUEQi"
//             },
//         }).then(function (resL) {
//             if (resL.scored_languages_list[0].languages[0] !== 'en') {
//                 $http.get("https://655.mtis.workers.dev/translate?text=${text}&source_lang=${lng}&target_lang=en", {
//                     timeout: 10000,
//                     query: {
//                         text: $context.request.query,
//                         lng: resL.scored_languages_list[0].languages[0]
//                     }
//                 }).then(function (res) {
//                     $context.request.query = res.response.translated_text;
//                 });
//             }
//         });
//     }
// });

function language (text) { 
    return $http.post("https://caila.io/api/mlpgate/account/1000062767/model/51023/predict", {
        body: {
            "texts": [text]
        },
        headers: {
            "Content-Type": "application/json",
            "MLP-API-KEY": "1000160400.95801.PGCrF5ntqFXT6Nolbhg6Qfcbq5xeEJTjL1MMUEQi"
        },
    })
}

function translate (text, lng) {
    return $http.get("https://655.mtis.workers.dev/translate?text=${text}&source_lang=${lng}&target_lang=en", {
        timeout: 10000,
        query: {
            text: text,
            lng: lng
        }
    })
}

function correct (text, lng) {
    return $http.post("https://spl-c.onrender.com/correct?text=${text}&lng=${lng}", {
        timeout: 10000,
        query: {
            text: text,
            lng: lng
        }
    })
}

function isStringInArray(str, array) {
    return array.indexOf(str) !== -1;
}

var langs = ['ru', 'en', 'el', 'pl', 'uk'];

bind("preMatch", function($context) {
    var text = $context.request.query;
    if (text[0] === '/') return true;
    
    language(text).then(function (lng_res) {
        var lng = lng_res.scored_languages_list[0].languages[0];
        
        // if (isStringInArray(lng, langs)) {
        //     correct(text, lng).then(function (crt_res) {
        //         text = crt_res;
        //         $context.request.query = crt_res;
        //     });
        // }
        
        if (lng === 'en') return true;
        
        translate(text, lng).then(function (trn_res) {
            $context.request.query = trn_res.response.translated_text;
        });
    })
});