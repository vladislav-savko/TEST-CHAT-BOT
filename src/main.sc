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

    state: SwitchInterfaceLanguage
        q!: $regex</switchLanguage>
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
            scriptEs6:
                await stateJs.inputLocation();
                    
        state: InputBedrooms
            scriptEs6:
                await stateJs.inputBedrooms();
                    
        state: InputListingTypes
            scriptEs6:
                await stateJs.inputListingTypes();
        
        state: InputPropertyTypes
            scriptEs6:
                await stateJs.inputPropertyTypes();
                    
        state: InputPrice
            scriptEs6:
                await stateJs.inputPrice();              

    state: DisplayResult
        scriptEs6:
            await stateJs.displayResults();

        state: ShowMore
            scriptEs6:
                await stateJs.showMore();
                
        state: ShowByPosition
            scriptEs6:
                await stateJs.showByPosition();
                
            state: Seller
                q: $regex</seller>
                scriptEs6:
                    await stateJs.seller();
                    
        state: FiltersInfo
            q: $regex</filters>
            scriptEs6:
                await stateJs.filtersInfo();
                    
    state: TelegramCallback
        event!: telegramCallbackQuery
        scriptEs6:
            await stateJs.telegramCallback();
            
        state: Seller
            q: $regex</seller>
            scriptEs6:
                await stateJs.seller();
                
    state: ShowByIndex
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
    
    state: Undo
        q!: $regex</undo>
        scriptEs6:
            await stateJs.undo();
            
    state: Bye
        q!: $regex</bye>
        scriptEs6:
            await stateJs.bye();

    state: NoMatch
        event!: noMatch
        scriptEs6:
            await stateJs.noMatch();