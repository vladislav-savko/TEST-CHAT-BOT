require: slotfilling/slotFilling.sc
    module = sys.zb-common

require: scripts/api.js
    type = scriptEs6
    name = api

require: scripts/utilits.js
    type = scriptEs6
    name = util

theme: /

    state: Start
        q!: $regex</start>
        intent!: /hello
        scriptEs6:
            util.initSession();
            
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
                $session.data.listingType = $parseTree._buy_or_rent.constBuyRent;
            }

            if (!$parseTree._types_of_estate) {
                $reactions.transition("/BuyOrRent/PropertyType");
                return;
            } else {
                $session.data.propertyTypes = $parseTree._types_of_estate.estate;
            }
            
            if ($parseTree._location) {
                await util.getCityInfo($parseTree._location);
            } else {
                $reactions.transition("./Location");
                return;
            }
            
            $reactions.transition("./ConfirmBuyOrRent");

        state: ConfirmBuyOrRent
            scriptEs6:
                util.confirmAction($session.data.listingType, $parseTree._types_of_estate.word);
                
            state: GetConfirmation
                q: * (yes|correct|+) *
                scriptEs6:
                    $reactions.transition("/BuyOrRent/PropertyType");
                q: * (no|incorrect|-) *
                scriptEs6:
                    $reactions.transition("/BuyOrRent");

        state: PropertyType
            scriptEs6:
                if (!$session.data.propertyTypes) {
                    $reactions.answer("What type of property are you looking for?");
                } else {
                    $reactions.transition("/DisplayResults");
                }
                
            state: GetPropertyType
                q: * @propertyType *
                scriptEs6:
                    $session.data.propertyTypes = $parseTree._propertyType;
                    $reactions.transition("/BuyOrRent/CityConfirmation");

        state: CityConfirmation
            scriptEs6:
                util.confirmAction($session.data.listingType, $parseTree._types_of_estate.word);
                
            state: GetCityConfirmation
                q: * (yes|correct|+) *
                scriptEs6:
                    $reactions.transition("/DisplayResults");
                q: * (no|incorrect|-) *
                scriptEs6:
                    $reactions.transition("../Location");

        state: Location
            scriptEs6:
                const action = $session.data.listingType.toLowerCase() === "sale" ? "buy" : $session.data.listingType.toLowerCase();
                $reactions.answer(`Okay, in which city do you want to ${action} ${$parseTree._types_of_estate.word.toLowerCase()}?`);
                
            state: GetLocation
                q: * @location *
                scriptEs6:
                    if ($parseTree._location) {
                        await util.getCityInfo($parseTree._location);
                    } else {
                        $reactions.transition("/BuyOrRent/Location");
                        return;
                    }
  
                    $reactions.transition("/DisplayResults");

    state: Bedroom
        intent!: /bedroom
        scriptEs6:
            $session.data.bedroomsFrom = $parseTree._Number;
            $session.data.bedroomsTo = $parseTree._Number;
        go!: /BuyOrRent

    state: DisplayResults
        scriptEs6:
            const getListingSuccessfully = await util.getListings($session.data);
            if (getListingSuccessfully) {
                $reactions.answer("Here are some listings based on your request. If you want to see more results, just say 'Show more listings' or to see results in another city, say 'Show me listings in *city*'.");
            } else {
                $reactions.answer("There are no more listings available based on your request. If you want to see results in another city, just say 'Show me listings in *city*'.");
            }

        state: ShowMore
            q: * (show more listings|more listings|next listings|show more) *
            scriptEs6:
                $session.data.skip += 3;
                $reactions.transition("/DisplayResults");

        state: ReplaceLocation
            q: * @location *
            scriptEs6:
                const getCitySuccessfully = await getCityInfo($parseTree._location);
                if (getCitySuccessfully) $reactions.transition("/DisplayResults");

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
