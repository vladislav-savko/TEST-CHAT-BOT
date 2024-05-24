require: slotfilling/slotFilling.sc
    module = sys.zb-common
    
require: scripts/api.js
    type = scriptEs6
    name = api
    
require: scripts/utilits.js
    type = scriptEs6
    name = utulits
    
theme: /
    
    state: Start
        q!: $regex</start>
        intent!: /hello
        scriptEs6:
            if (!$session.data) {
                utulits.sessionInit();
            }
        random:
            a: Hello! I am your real estate assistant. Are you looking to rent or buy a property?
            a: Hi! I’m here to help you find the perfect home. Are you planning to rent or buy?
            a: Good day! I’m ready to assist you with choosing a property. Are you interested in renting or buying?
            a: Greetings! Looking for a new apartment? Tell me what you need, and I’ll help you find the best option.
            a: Hello! I am your AI real estate assistant. How can I assist you—renting or buying?
            
    state: BuyOrRent
        intent!: /buy_or_rent
        scriptEs6:
            if ($parseTree._buy_or_rent) {
              $session.data.listingType = $parseTree._buy_or_rent.toUpperCase();
            }
            
            if ($parseTree._types_of_estate) {
              $session.data.propertyTypes = [$parseTree._types_of_estate.toUpperCase()];
            }
            
            
            if ($parseTree._location) {
                const city = $parseTree._location;
                await api.getCityInfo(city).then(function (resC) {
                    if (resC) {
                        $session.data.cityId = resC.data[0].cityId;
                    }
                }).catch(function (errC) {
                    $reactions.answer("Что-то сервер барахлит.1");
                });
            }
            
            await api.getListing($session.data).then(function (resL) {
                if (resL) {
                     $reactions.answer(resL.data.listings[0].title);
                }
            }).catch(function (errL) {
                $reactions.answer(JSON.stringify($session.data));
                $reactions.answer("Что-то сервер барахлит.2");
            });
            
    state: Bye
        intent!: /bye
        random:
            a: Thank you for reaching out to me! Good luck with your housing search!
            a: All the best! If you have any more questions, don't hesitate to ask.
            a: I hope I was able to help. Have a great day!
            a: Goodbye! Best of luck with renting or buying your new apartment!
            a: Thank you for your time! If you need further assistance, I'm always here.
            a: See you soon! Good luck with your housing!
            a: Glad to help! All the best in your apartment search.
            a: Farewell! I hope you find your perfect home soon.
            a: Thank you for reaching out! If you have any more questions, I'm here to help.
            a: All the best! May your real estate search be successful.


    state: NoMatch
        event!: noMatch
        random: 
            a: Sorry, I didn't understand your command. Could you clarify what exactly you wanted to know or do? For example, are you looking for information about real estate, or do you have another request?
            a: I'm sorry, but I didn't recognize that command. Could you explain further what you were trying to do? For instance, are you looking to find an apartment for rent or for sale, or do you have other real estate questions?
            a: I couldn't understand your command. Could you please clarify your request? For example, are you seeking information about the real estate market, or do you have specific housing requirements?
        
    