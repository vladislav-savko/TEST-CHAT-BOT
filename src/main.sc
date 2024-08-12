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

require: scripts/state/index.js
    type = scriptEs6
    name = stateJs
    
require: scripts/init.js
    
theme: /
    
    state: Start
        q!: $regex</start> 
        intent!: /hello
        scriptEs6:
            await stateJs.start();

    state: SwitchIntefraceLanguage
        q!: $regex</switchLanguage>
        intent!: /switchLanguage
        scriptEs6:
            await stateJs.switchIntefraceLanguage();

        state: Get  
            q: * @language *
            scriptEs6:
                $reactions.transition("/SwitchIntefraceLanguage");
        
    state: Search
        intent!: /searchAll
        scriptEs6:
            await stateJs.search();
             
        state: SwitchParams
            scriptEs6:
                await stateJs.switchParams();
                
        state: InputLocation
            q!: * (location/city/county) * [{@location [@country]}] *
            scriptEs6:
                await stateJs.inputLocation();
                    
            state: Get  
                q: * {@location @country} *
                scriptEs6:
                    $reactions.transition("/Search/InputLocation");
        
        state: InputBathrooms
            q!: * bathrooms* * (@duckling.interval::bathroom|@duckling.number::bathroom) *
            scriptEs6:
                await stateJs.inputBathroom();
                    
            state: Get
                q: * (@duckling.interval::bathroom|@duckling.number::bathroom) *
                scriptEs6:
                    $reactions.transition("/Search/InputBathrooms");
                    
        state: InputBedrooms
            q!: * bedroom* * (@duckling.interval::bedroom|@duckling.number::bedroom) *
            scriptEs6:
                await stateJs.inputBedrooms();
                    
            state: Get
                q: * (@duckling.interval::bedroom|@duckling.number::bedroom) *
                scriptEs6:
                    $reactions.transition("/Search/InputBedrooms");
                    
        state: InputListingTypes
            q!: * {Listing types [ownership]} * @listingType *
            scriptEs6:
                await stateJs.inputListingTypes();
                    
            state: Get
                q: * @listingType *
                scriptEs6:
                    $reactions.transition("/Search/InputListingTypes");
        
        state: InputPropertyTypes
            q!: * {Property types} * @propertyTypes *
            scriptEs6:
                await stateJs.inputPropertyTypes();
                    
            state: Get
                q: * @propertyTypes *
                scriptEs6:
                    $reactions.transition("/Search/InputPropertyTypes");
                    
        state: InputPrice
            #q!: * (budget/price/cost/costs) * (@duckling.amount-of-money::price|@duckling.interval::price) *
            scriptEs6:
                await stateJs.inputPrice();
                    
            state: Get
                q: * (@duckling.amount-of-money::price|@duckling.interval::price|@duckling.number::price) *
                scriptEs6:
                    $reactions.transition("/Search/InputPrice");
                    
        state: InputArea
            q!: * (area|Floor area) * (@duckling.interval::area|@duckling.number::area) *
            scriptEs6:
                await stateJs.inputArea();
                    
            state: Get
                q: * (@duckling.interval::area|@duckling.number::area) *
                scriptEs6:
                    $reactions.transition("/Search/InputArea");
                    
        state: InputCoverageRatio
            q!: * {Coverage Ratio} * (@duckling.interval::coverageRatio|@duckling.number::coverageRatio) *
            scriptEs6:
                await stateJs.inputCoverageRatio();
                    
            state: Get
                q: * (@duckling.interval::coverageRatio|@duckling.number::coverageRatio) *
                scriptEs6:
                    $reactions.transition("/Search/InputCoverageRatio");
                    
        state: InputDensity
            q!: * Density * (@duckling.interval::density|@duckling.number::density) *
            scriptEs6:
                await stateJs.inputDensity();
                    
            state: Get
                q: * (@duckling.interval::density|@duckling.number::density) *
                scriptEs6:
                    $reactions.transition("/Search/InputDensity");
                    
        state: InputFloorNumber
            q!: * {Floor number} * (@duckling.interval::floorNumber|@duckling.number::floorNumber) *
            scriptEs6:
                await stateJs.inputFloorNumber();
                    
            state: Get
                q: * (@duckling.interval::floorNumber|@duckling.number::floorNumber) *
                scriptEs6:
                    $reactions.transition("/Search/InputFloorNumber");
                    
        state: InputResidentialFloors
            q!: * {Residential Floors} * (@duckling.interval::residentialFloors|@duckling.number::residentialFloors) *
            scriptEs6:
                await stateJs.inputResidentialFloors();
                    
            state: Get
                q: * (@duckling.interval::residentialFloors|@duckling.number::residentialFloors) *
                scriptEs6:
                    $reactions.transition("/Search/InputFloorNumber");

    state: DisplayResults
        scriptEs6:
            await stateJs.displayResults();

        state: ShowMore
            q: * (show more listings|more listings|next listings|show more) *
            scriptEs6:
                await stateJs.showMore();
                
        state: ShowByPosition
            intent!: /detailsPosition
            scriptEs6:
                await stateJs.showByPosition();
                
            state: Seller
                q: Seller Contacts
                scriptEs6:
                    await stateJs.seller();
                    
        state: FiltersInfo
            intent!: /filtersInfo
            scriptEs6:
                await stateJs.filtersInfo();
                    
    state: TelegramCallback
        event!: telegramCallbackQuery
        scriptEs6:
            await stateJs.telegramCallback();
            
        state: Seller
            q: Seller Contacts
            scriptEs6:
                await stateJs.seller();
                
    state: ShowByIndex
        intent!: /anisadIndex
        scriptEs6:
            await stateJs.showByIndex();
            
        state: Get
            q: * @duckling.number::index *
            scriptEs6:
                $reactions.transition("/ShowByIndex"); 
            
        state: Seller
            q: Seller Contacts
            scriptEs6:
                await stateJs.seller();
                
    state: Restart
        intent!: /reset
        scriptEs6:
            await stateJs.restart();

    state: Help
        q!: * (info|Info) *
        scriptEs6:
            await stateJs.help();
    
    state: Undo
        q!: ~Undo
        scriptEs6:
            await stateJs.undo();
            
    state: Bye
        intent!: /bye
        scriptEs6:
            await stateJs.bye();
            
    state: Sort
        intent!: /sort
        scriptEs6:
            $session.data.sort = $parseTree.value.sorter;
            $reactions.transition("/Search");

    state: NoMatch
        event!: noMatch
        scriptEs6:
            await stateJs.noMatch();