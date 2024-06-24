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
            //$reactions.answer(JSON.stringify($session.data));
            //нужно удалить в проде (НАВЕРНОЕ, а может и так заебись)
            util.session();
        random:
            a: Hello! I am your real estate assistant. Are you looking to rent or buy a property?
            a: Hi! I’m here to help you find the perfect home. Are you planning to rent or buy?
            a: Good day! I’m ready to assist you with choosing a property. Are you interested in renting or buying?
            a: Greetings! Looking for a new apartment? Tell me what you need, and I’ll help you find the best option.
            a: Hello! I am your AI real estate assistant. How can I assist you—renting or buying?
            
    state: Search
        intent!: /searchAll
        scriptEs6:
            # $reactions.answer(JSON.stringify($parseTree));
            const params = await pr.getAllParamsFromTree($parseTree);
            # $reactions.answer(JSON.stringify(params));
            $session.params = {...$session.params, ...params};
            $reactions.transition("/Search/SwitchParams");
            $session.state = "Search";
            
        state: SwitchParams
            scriptEs6:
                $session.state = "SwitchSearch";
                
                const { emptyParams, newParams } = await pr.processParams();
                const params = await util.copyObjectWithoutFields($session.params, ['location', 'listingType', 'propertyTypes', 'infAmenity', 'priceFrom', 'priceTo', 'areaFrom', 'areaTo']);
                const data = $session.data;
                
                await pr.updSessionInfo(data, params);
                await pr.emptyParamsResult(emptyParams);
                
        state: InputLocation
            q!: * (location/city/county) * {@location [@country]} *
            scriptEs6:
                if(!$parseTree._location) {
                    $reactions.answer("In what location would you like to view the property?");
                } else {
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                }
                    
            state: Get  
                q: * {@location @country} *
                scriptEs6:
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                    
        state: InputBedrooms
            q!: * bedroom* * (@duckling.interval::bedroom|@duckling.number::bedroom) *
            scriptEs6:
                if(!$parseTree.bedroom) {
                    $reactions.answer("How many bedrooms do you need?");
                } else {
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                }
                    
            state: Get
                q: * (@duckling.interval::bedroom|@duckling.number::bedroom) *
                scriptEs6:
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                    
        state: InputListingTypes
            q!: * {Listing types [ownership]} * @listingType *
            scriptEs6:
                if(!$parseTree._listingType) {
                    $reactions.answer("What type of property ownership are you interested in: buying or renting?");
                } else {
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                }
                    
            state: Get
                q: * @listingType *
                scriptEs6:
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
        
        state: InputPropertyTypes
            q!: * {Property types} * @propertyTypes *
            scriptEs6:
                if(!$parseTree._propertyTypes) {
                    $reactions.answer("What type of property are you interested in: apartment, house, villa, commerce, plot?");
                } else {
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                }
                    
            state: Get
                q: * @propertyTypes *
                scriptEs6:
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                    
        state: InputPrice
            #q!: * (budget/price/cost/costs) * (@duckling.amount-of-money::price|@duckling.interval::price) *
            scriptEs6:
                if(!$parseTree.price) {
                    $reactions.answer("What budget are you looking for?");
                } else {
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                }
                    
            state: Get
                q: * (@duckling.amount-of-money::price|@duckling.interval::price|@duckling.number::price) *
                scriptEs6:
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                    
        state: InputArea
            q!: * (area|Floor area) * (@duckling.interval::area|@duckling.number::area) *
            scriptEs6:
                if(!$parseTree.area) {
                    $reactions.answer("What perimeter area are you interested in?");
                } else {
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                }
                    
            state: Get
                q: * (@duckling.interval::area|@duckling.number::area) *
                scriptEs6:
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                    
        state: InputCoverageRatio
            q!: * {Coverage Ratio} * (@duckling.interval::coverageRatio|@duckling.number::coverageRatio) *
            scriptEs6:
                if(!$parseTree.coverageRatio) {
                    $reactions.answer("What are the preferences for the development coefficient?");
                } else {
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                }
                    
            state: Get
                q: * (@duckling.interval::coverageRatio|@duckling.number::coverageRatio) *
                scriptEs6:
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                    
        state: InputDensity
            q!: * Density * (@duckling.interval::density|@duckling.number::density) *
            scriptEs6:
                if(!$parseTree.density) {
                    $reactions.answer("What building density do you need?");
                } else {
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                }
                    
            state: Get
                q: * (@duckling.interval::density|@duckling.number::density) *
                scriptEs6:
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                    
        state: InputFloorNumber
            q!: * {Floor number} * (@duckling.interval::floorNumber|@duckling.number::floorNumber) *
            scriptEs6:
                if(!$parseTree.floorNumber) {
                    $reactions.answer("On which floors would you like to find the premises?");
                } else {
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                }
                    
            state: Get
                q: * (@duckling.interval::floorNumber|@duckling.number::floorNumber) *
                scriptEs6:
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                    
        state: InputResidentialFloors
            q!: * {Residential Floors} * (@duckling.interval::residentialFloors|@duckling.number::residentialFloors) *
            scriptEs6:
                if(!$parseTree.residentialFloors) {
                    $reactions.answer("On which floors should residential floors be located?");
                } else {
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");
                }
                    
            state: Get
                q: * (@duckling.interval::residentialFloors|@duckling.number::residentialFloors) *
                scriptEs6:
                    const params = await pr.getAllParamsFromTree($parseTree);
                    $session.params = {...$session.params, ...params};
                    $reactions.transition("/Search/SwitchParams");

    state: DisplayResults
        scriptEs6:
            if ($session.state !== 'Show more') {
                $session.data.skip = 0;
            }
            
            //$reactions.answer(JSON.stringify($session.data));
            const getListingSuccessfully = await util.getListings($session.data);
            if (getListingSuccessfully) {
                $reactions.answer("To see more results, just say **Show more**");
            } else {
                $reactions.answer("Sorry, there are no more listings available based on your request.");
            }
            $reactions.answer("If you would like to restart the conversation and clear all previous information, simply say **Reset**");
            
            $session.state = "Display";

        state: ShowMore
            q: * (show more listings|more listings|next listings|show more) *
            scriptEs6:
                $session.data.skip += 3;
                $session.state = "Show more";
                $reactions.transition("/DisplayResults");
                
    state: ShowByIndex
        intent!: /anisadIndex
        scriptEs6:
            const index = $parseTree.index[0].value;
            await util.getListingById(index);
            
        state: Seller
            q: Seller Contacts
            scriptEs6:
                await util.getSeller();

    state: Restart
        intent!: /reset
        scriptEs6:
            util.session();
            $reactions.transition("/Start");
    
    # state: Undo
    #     q!: ~Undo
    #     scriptEs6:
    #         $session.params = $session.lastParams;
    #         $reactions.transition("/Search/SwitchParams");
            
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