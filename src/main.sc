require: slotfilling/slotFilling.sc
    module = sys.zb-common

require: scripts/api.js
    type = scriptEs6
    name = api

require: scripts/utilits.js
    type = scriptEs6
    name = util
    
require: scripts/params.js
    type = scriptEs6
    name = pr
    
theme: /

    state: Start
        q!: $regex</start>
        intent!: /hello
        scriptEs6:
            util.initSession();
            $reactions.answer(JSON.stringify($session.data));
        random:
            a: Hello! I am your real estate assistant. Are you looking to rent or buy a property?
            a: Hi! I’m here to help you find the perfect home. Are you planning to rent or buy?
            a: Good day! I’m ready to assist you with choosing a property. Are you interested in renting or buying?
            a: Greetings! Looking for a new apartment? Tell me what you need, and I’ll help you find the best option.
            a: Hello! I am your AI real estate assistant. How can I assist you—renting or buying?
            
    state: Search
        intent!: /searchAll
        scriptEs6:
            //$reactions.answer(JSON.stringify($parseTree));
            const params = await pr.getAllParamsFromTree($parseTree);
           // $reactions.answer(JSON.stringify(params));
            $session.params = {...$session.params, ...params};
            
            $reactions.transition("/Search/SwitchParams");
            
        state: SwitchParams
            scriptEs6:
                $session.state = "SwitchSearch";
                
                const { emptyParams, newParams } = await pr.processParams();
                const params = await util.copyObjectWithoutFields($session.params, ['location', 'listingType', 'propertyTypes', 'infAmenity']);
                const data = $session.data;
                
                await pr.updSessionInfo(data, params);
                await pr.emptyParamsResult(emptyParams);
    state: Price
        intent!: /price_money
        scriptEs6:
            if (typeof $parseTree.value === 'number') {
                $session.data.priceTo = $parseTree.value; 
                delete $session.data.priceFrom;
            } else {
                if ($parseTree.value.from) {
                    $session.data.priceFrom = $parseTree.value.from.value;
                    delete $session.data.priceTo;
                }
                if ($parseTree.value.to) {
                   $session.data.priceTo = $parseTree.value.to.value;
                }
            }
        go!: /Search
        
    state: Area
        intent!: /area_field
        scriptEs6:
            
        go!: /Search

    # state: SearchStart
    #     intent!: /buy_or_rent
    #     scriptEs6:
    #         $reactions.answer(JSON.stringify($session.data));
    #         if ($parseTree._listingType) 
    #             $session.data.listingType = $parseTree._listingType.constBuyRent;
    #         if ($parseTree._propertyTypes) {
    #             $session.data.propertyTypes = $parseTree._propertyTypes.estate;
    #             $session.info.property = $parseTree._propertyTypes.word;
    #         }
    #         if ($parseTree._country) 
    #             $session.info.country = $parseTree._country;
            
    #         if ($parseTree._location) {
    #             $session.info.city = $parseTree._location;
    #         }
            
    #         $reactions.transition("/SearchStart/ConfirmSearch");

        # state: ConfirmSearch
        #     scriptEs6:
        #         if (!$session.data.listingType) 
        #             return $reactions.transition("/SearchStart/ListingType");
        #         else if (!$session.data.propertyTypes) 
        #             return $reactions.transition("/SearchStart/PropertyType");
        #         else if (!$session.info.country) 
        #             return $reactions.transition("/SearchStart/Country");
        #         else if (!$session.info.city) 
        #             return $reactions.transition("/SearchStart/Location");
        #         else
        #             util.confirmSearch($session.data.listingType, $session.info.property.toLowerCase(), $session.info.city.name, $session.info.country.name);
        #             // Второй Аргумент слово (Пример: House, а не DETACHED или SEMIDETACHED HOUSE будет написано)
        #             // 4 аргумент название страны
                
        #     state: Confirm
        #         q: * (ye*|cor*|+) *
        #         scriptEs6:
        #             $reactions.answer('lol');
        #             $reactions.transition("/DisplayResults");
            
        #     state: Deny
        #         q: * (no|incor*|-) *
        #         scriptEs6:
        #             $reactions.answer('kek');
        #             $session.data.listingType = null;
        #             $session.data.propertyTypes = null;
        #             $session.info.country = null;
        #             $session.info.city = null;
        #             $reactions.transition("/SearchStart/ConfirmSearch");

        # state: PropertyType
        #     scriptEs6:
        #         if (!$session.data.propertyTypes) {
        #             $reactions.answer("What type of property are you looking for?");
        #         } else {
        #             $reactions.transition("/SearchStart/ConfirmSearch");
        #         }
                
        #     state: GetPropertyType
        #         q: * @propertyType *
        #         scriptEs6:
        #             $session.data.propertyTypes = $parseTree._propertyTypes.estate;
        #             $reactions.transition("/SearchStart/ConfirmSearch");
                    
        # state: ListingType
        #     scriptEs6:
        #         if (!$session.data.listingType) {
        #             $reactions.answer("What type of transaction are you interested in, buying or renting?");
        #         } else {
        #             $reactions.transition("/SearchStart/ConfirmSearch");
        #         }
                
        #     state: GetListingType
        #         q: * @listingType *
        #         scriptEs6:
        #             $session.data.listingType = $parseTree._listingType.constBuyRent;
        #             $reactions.transition("/SearchStart/ConfirmSearch");
                    
        # state: Country
        #     scriptEs6:
        #         if (!$session.info.country) {
        #             $reactions.answer("In which country are you looking?");
        #         } else {
        #             $reactions.transition("/SearchStart/ConfirmSearch");
        #         }
                
        #     state: GetCountry
        #         q: * @country *
        #         scriptEs6:
        #             $session.info.country = $parseTree._country;
        #             $reactions.transition("/SearchStart/ConfirmSearch");
                    
        # state: Location
        #     scriptEs6:
        #         if (!$session.info.city) {
        #             $reactions.answer("In which city are you looking?");
        #         } else {
        #             $reactions.transition("/SearchStart/ConfirmSearch");
        #         }
                
        #     state: GetLocation
        #         q: * @location *
        #         scriptEs6:
        #             $session.info.city = $parseTree._location;
        #             $reactions.transition("/SearchStart/ConfirmSearch");

    state: DisplayResults
        scriptEs6:
            const getListingSuccessfully = await util.getListings($session.data);
            if (getListingSuccessfully) {
                //$reactions.answer(JSON.stringify($session.data));
                $reactions.answer("Here are some listings based on your request. If you want to see more results, just say 'Show more listings' or to see results in another city, say 'Show me listings in *city*'.");
            } else {
                $reactions.answer("There are no more listings available based on your request. If you want to see results in another city, just say 'Show me listings in *city*'.");
            }

        state: ShowMore
            q: * (show more listings|more listings|next listings|show more) *
            scriptEs6:
                $session.data.skip += 3;
                $reactions.transition("/DisplayResults");
                
    state: ShowByIndex
        intent!: /anisadIndex
        scriptEs6:
            const index = $parseTree.index[0].value;
            await util.getListingById(index);


    state: Restart
        intent!: /reset
        scriptEs6:
            util.session();
            $reactions.transition("/Start");
            
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