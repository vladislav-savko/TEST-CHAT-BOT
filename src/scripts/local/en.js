/** @type {Translation} */
export default {
    fetchErrors: {
        notFoundCityInCounty: (country) =>
            `Sorry, no cities found in ${country}. Please try again.`,
        invalidPositionValue: `Invalid position value.`,
        listing: `Something's broken, please try again later. Sorry`,
        noMoreListing: `Sorry, there are no more listings available based on your request.`,
        noSearchRequest: `I don't know what properties I can show you, you need to make a search request first.`,
        seller: `Sorry, I can't get seller information.`,
    },
    buttons: {
        clearFilters: `Clear filters`,
        currentFilters: `Filters`,
        openInBrowser: `OpenInBrowser`,
        sellerContacts: `Seller contacts`,
        showDetails: `Show details`,
        showMore: `Show more`,
        showOnMap: `Show on map`,
    },
    info: {
        about: `If you would like to learn which filters can be used to find the best option for you, simply say \*Info\*`,
        noMoreResultsReset: `There are no more results, say "\*Reset\*" to clear the filters.`,
        noMoreResultsResetCommand: `There are no more results, you can clear the filters with the **Reset** command`,
        showMoreResults: `To see more results, just say \*Show more\*`,
        showMoreResultsAndReset: `To see more results say "\*Show more\*". To clear filters say "\*Reset\*"`,
        language: `English language, русский язык, українська мова, ελληνική γλώσσα, język polski`,
    },
    help: [
        "To switch language write the language in which you want your bot to interact with you. For instance, **Switch to Greek**",
        "Bot can speak 5 languages: \n - English \n - Greek \n - Russian \n - Ukrainian \n - Polish",
        "To start the search, you need to state the location, property type(house, villa, apartment, commerce, plot), listing type (rent or buy) and budget. For example, *I want to buy a house in Limassol with the budget above 10k$*",
        "Here is the list of benefits you can type: \n - Alarm system \n - Air conditioning *(Everywhere, Only bedrooms, No)* \n - Balcony \n - Building condition *(Ready To move in , Under construction)* \n - Condition *(New , Well maintaned, Needs renovation)* \n - Kitchen \n - Parking \n - Natural gas \n - Electricity \n - Internet *(No, Wi-Fi, Cable, Mobile)* \n - Heating *(No, Central, Gas, Elctric, Liquid fuel)* \n - Water heating *(No, Central, Boiler, Solar system, Photovoltaic system)* \n - Amenities *(Near the school, Near the park, Calm district, In the center, Parking place, Beautiful view, Sauna, Sea view, Security, Storage, Near the subway, Near the kindergarten, Near the sea, Near the lake, With garden, With garage)*",
        "If, when adding parameters to a query, at some point you encounter a lack of search results, you can cancel the last entered value using the *Undo* command.",
        `To get more details on a specific property, enter "*show by* _id property_". You can also use the "*details for* _first|last_ *one*" commands after the listing is displayed.`,
        "If you would like to restart the conversation and clear all previous information, simply say *Reset*",
    ],
    hello: [
        `Hello! I am your real estate assistant. Are you looking to rent or buy a property?`,
        `Hi! I’m here to help you find the perfect home. Are you planning to rent or buy?`,
        `Good day! I’m ready to assist you with choosing a property. Are you interested in renting or buying?`,
        `Greetings! Looking for a new apartment? Tell me what you need, and I’ll help you find the best option.`,
        `Hello! I am your AI real estate assistant. How can I assist you—renting or buying?`,
    ],
    bye: [
        "Thank you for reaching out to me! Good luck with your housing search!",
        "All the best! If you have any more questions, don't hesitate to ask.",
        "I hope I was able to help. Have a great day!",
        "Goodbye! Best of luck with renting or buying your new apartment!",
        "Thank you for your time! If you need further assistance, I'm always here.",
        "See you soon! Good luck with your housing!",
        "Glad to help! All the best in your apartment search.",
        "Farewell! I hope you find your perfect home soon.",
        "Thank you for reaching out! If you have any more questions, I'm here to help.",
        "All the best! May your real estate search be successful.",
    ],
    noMatch: [
        "Sorry, I didn't understand your command. Could you clarify what exactly you wanted to know or do? For example, are you looking for information about real estate, or do you have another request?",
        "I'm sorry, but I didn't recognize that command. Could you explain further what you were trying to do? For instance, are you looking to find an apartment for rent or for sale, or do you have other real estate questions?",
        "I couldn't understand your command. Could you please clarify your request? For example, are you seeking information about the real estate market, or do you have specific housing requirements?",
    ],
    getProperty: {
        area: `What perimeter area are you interested in?`,
        bedrooms: `How many bedrooms do you need?`,
        budget: `What budget are you looking for?`,
        coverageRatio: `What are the preferences for the development coefficient?`,
        country: `Would you like to check all the option in this country?`,
        density: `What building density do you need?`,
        floorNumber: `On which floors would you like to find the premises?`,
        id: `Please provide the property ID.`,
        listingType: `What type of property ownership are you interested in: buying or renting?`,
        location: `In which city or country would you like to view the property?`,
        propertyType: `What type of property are you interested in: apartment, house, villa, commerce, plot?`,
        residentialFloors: `On which floors should residential floors be located?`,
        language: `Which interface language would you like to choose?`,
    },
    property: {
        general: {
            filters: "Applied filters in search",
        },
        airConditioning: `Air conditioning`,
        alarmSystem: `Alarm system`,
        area: `Property area`,
        balcony: `Balcony`,
        bathrooms: `Bathrooms`,
        bedrooms: `Bedrooms`,
        buildigConditions: {
            value: `Building condition`,
            READY_TO_MOVE_IN: `Ready to move in`,
            UNDER_CONSTRUCTION: `Under construction`,
            NEEDS_RENOVATION: `Needs renovation`,
            RENOVATED: `Renovated`,
        },
        coverageRatio: `Coverage ratio`,
        density: `Density`,
        electricity: `Electricity`,
        floorArea: `Floor area`,
        furnishing: `Furnishing`,
        gas: `Gas`,
        heating: `Heating`,
        infrastructureAmenities: `Infrastructure amenities`,
        internet: `Internet`,
        kitchen: `Kitchen`,
        parking: `Parking`,
        repairAmenities: `Repair amenities`,
        residentialFloors: `Residential floors`,
        sewageSystem: `Sewage system`,
        television: `Television`,
        water: `Water`,
        waterHeating: `Water heating`,
        location: `Location`,
        price: {
            value: `Price`,
            budget: `Budget`,
        },
        listingType: {
            value: `Ownership type`,
            RENT: `Rent`,
            SHORT_RENT: `Short-term rent`,
            SALE: `Sale`,
        },
        propertyType: {
            value: `Property type`,
            APARTMENT: `Apartment`,
            VILLA: `Villa`,
            DETACHED_HOUSE: `Detached house`,
            SEMIDETACHED_HOUSE: `Semi-detached house`,
            OFFICE: `Office`,
            HOTEL: `Hotel`,
            MANUFACTURING: `Manufacturing`,
            RETAIL_SPACE: `Retail space`,
            PUBLIC_CATERING_FACILITY: `Public catering facility`,
            WAREHOUSE: `Warehouse`,
            CAR_PARKING: `Car parking`,
            SHOP: `Shop`,
            RESTAURANT: `Restaurant`,
            OTHER_COMMERCIAL: `Other commercial`,
            COMMERCIAL_PLOT: `Commercial plot`,
            RESIDENTIAL_PLOT: `Residential plot`,
            AGRICULTURE_PLOT: `Agriculture plot`,
        },
    },
};
