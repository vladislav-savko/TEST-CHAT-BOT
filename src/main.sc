require: slotfilling/slotFilling.sc
    module = sys.zb-common

require: scripts/state/stateFromLLM/index.js
    type = scriptEs6
    name = stateJs
    
require: scripts/init.js
    
theme: /
    
    state: Start
        q!: $regex</start> 
        scriptEs6:
            await stateJs.start();

    state: Loader
        scriptEs6:
            await stateJs.loader();

    state: Preprocess
        q!: $regex</test_preprocess> 
        scriptEs6:
            await stateJs.preprocess();

    state: SwitchInterfaceLanguage
        q!: $regex</test_switch_language>
        scriptEs6:
            await stateJs.switchLanguage();

        state: Get
            q!: $regex</ru|/en|/el|/pl|/uk>
            scriptEs6:
                await stateJs.getLanguage();

    state: InputData
        scriptEs6:
            await stateJs.inputData();
                
        state: InputLocation
            q!: $regex</test_input_location>
            scriptEs6:
                await stateJs.inputLocation();
                    
        state: InputBedrooms
            q!: $regex</test_input_bedrooms>
            scriptEs6:
                await stateJs.inputBedrooms();
                    
        state: InputListingTypes
            q!: $regex</test_input_listing_types>
            scriptEs6:
                await stateJs.inputListingTypes();

            state: GetListingTypes
                event: telegramCallbackQuery
                scriptEs6:
                    await stateJs.getListingTypes();
        
        state: InputPropertyTypes
            q!: $regex</test_input_property_types>
            scriptEs6:
                await stateJs.inputPropertyTypes();

            state: GetPropertyTypes
                event: telegramCallbackQuery
                scriptEs6:
                    await stateJs.getPropertyTypes();
                    
        state: InputPrice
            q!: $regex</test_input_price>
            scriptEs6:
                await stateJs.inputPrice();     

            state: GetPrice
                event: telegramCallbackQuery
                scriptEs6:
                    await stateJs.getPrice();         

    state: DisplayResult
        q!: $regex</test_display_result>
        scriptEs6:
            await stateJs.displayResults();

        state: ShowMore
            q!: $regex</test_show_more>
            scriptEs6:
                await stateJs.showMore();
                
        state: ShowByPosition
            q!: $regex</test_show_by_position>
            scriptEs6:
                await stateJs.showByPosition();
                    
        state: FiltersInfo
            q!: $regex</test_filters>
            q: $regex</filters>
            scriptEs6:
                await stateJs.filtersInfo();
                    
    state: TelegramCallback
        event!: telegramCallbackQuery
        scriptEs6:
            await stateJs.telegramCallback();
                
    state: ShowByIndex
        q!: $regex</test_show_by_index>
        scriptEs6:
            await stateJs.showByIndex();
            
        state: Seller
            q: $regex</seller>
            scriptEs6:
                await stateJs.seller();
                
    state: Restart
        q: $regex</restart>
        scriptEs6:
            await stateJs.restart();

    state: InfoAbout
        q!: $regex</info>
        scriptEs6:
            await stateJs.help();
    
    # state: Undo
    #     q!: $regex</undo>
    #     scriptEs6:
    #         await stateJs.undo();
            
    state: Bye
        q!: $regex</bye>
        scriptEs6:
            await stateJs.bye();

    state: NewNotification || noContext = true
        event!: newNotification
        scriptEs6:
            await stateJs.newNotification();


    state: NoMatch
        event!: noMatch
        scriptEs6:
            await stateJs.noMatch();