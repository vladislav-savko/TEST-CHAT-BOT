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
        currentFilters: `Show filters`,
        openInBrowser: `OpenInBrowser`,
        sellerContacts: `Seller contacts`,
        showDetails: `Show details`,
        showMore: `Show more`,
        showOnMap: `Show on map`,
        continueSearch: `Continue search`,
    },
    info: {
        about: `If you would like to learn which filters can be used to find the best option for you, simply say \*Info\*`,
        noMoreResultsReset: `There are no more results, say "\*Reset\*" to clear the filters.`,
        noMoreResultsResetCommand: `There are no more results, you can clear the filters with the **Reset** command`,
        showMoreResults: `To see more results, just say \*Show more\*`,
        showMoreResultsAndReset: `To see more results say "\*Show more\*". To clear filters say "\*Reset\*"`,
        language: `English language, русский язык, українська мова, ελληνική γλώσσα, język polski`,
        continueSearch: `To continue the search, say \*Continue search\*`,
    },
    help: [
        "To change the language, specify the language in which you want the bot to interact with you. For example, Switch to Polish.",
        "The bot can speak 5 languages: \n - English \n - Greek \n - Russian \n - Ukrainian \n - Polish",
        "To start a search, you need to specify the location, type of property (house, villa, apartment, commercial property, plot), type of listing (rent or purchase), and budget. For example, *I want to buy a house in Limassol, my budget is over 100 thousand euros*",
        "Here’s a list of filters you can input: \n" +
            `🔘 *Property type* \nApartment, Villa, Detached House, Semi-detached House, Office, Hotel, Manufacturing, Commercial Space, Catering Facility, Warehouse, Parking, Shop, Restaurant, Other Commercial Real Estate, Commercial Plot, Residential Plot, Agricultural Plot \n💬 _"Looking for an apartment"_\n\n` +
            `🔘 *Listing type* \nRent, Short-term Rent, Sale \n💬 _"Want to buy"_\n\n` +
            `🔘 *Price* \n💬 _"Budget from 150k to 200k euros"_\n\n` +
            `🔘 *Furnishing* \nNone, Partially, Fully \n💬 _"Partially furnished"_\n\n` +
            `🔘 *Property status* \nNew, Resale \n💬 _"New property"_\n\n` +
            `🔘 *Condition* \nNew, Good Condition, Needs Renovation \n💬 _"In good condition"_\n\n` +
            `🔘 *Security Alarm System* \n💬 _"With a security system"_\n\n` +
            `🔘 *Air Conditioning* \nEverywhere, Only in Bedrooms, None \n💬 _"Without air conditioning"_\n\n` +
            `🔘 *Heating* \nNone, Central, Gas, Electric, Liquid Fuel \n💬 _"With gas heating"_\n\n` +
            `🔘 *Water Heating* \nNone, Central, Boiler, Solar System, Photovoltaic System \n💬 _"With central water supply"_\n\n` +
            `🔘 *Balcony* \n💬 _"With a balcony"_\n\n` +
            `🔘 *Year Built* \n💬 _"Built in 2024"_\n\n` +
            `🔘 *Building Condition* \nReady to Move In, Under Construction \n💬 _"The building is under construction"_\n\n` +
            `🔘 *Condition* \nNew, Well-maintained, Needs Repairs \n💬 _"Well-maintained apartment"_\n\n` +
            `🔘 *Kitchen* \n💬 _"With a kitchen"_\n\n` +
            `🔘 *Parking* \n💬 _"With parking"_\n\n` +
            `🔘 *Floor Area* \n💬 _"90 square meters"_\n\n` +
            `🔘 *Number of Rooms* \n💬 _"2-3 rooms"_\n\n` +
            `🔘 *Number of Bathrooms* \n💬 _"Two bathrooms"_\n\n` +
            `🔘 *Pet-friendly* \n💬 _"Pets allowed"_\n\n` +
            `🔘 *Electricity* \n💬 _"With electricity connection"_\n\n` +
            `🔘 *Internet* \nNone, Wi-Fi, Cable, Mobile \n💬 _"Need cable internet"_\n\n` +
            `🔘 *Location Features* \nNear a Lake, Near the Sea, Near a Slope, Near a School, Scenic View, Near the Airport, Near a River, Near a Forest, Near the Mountains, Near a Kindergarten, Near the Metro, Near a Park, City Center, Sea View, Quiet Area, Prestigious Area, Near a Supermarket \n💬 _"Near the sea"_\n\n` +
            `🔘 *Infrastructure Facilities* \nSecurity, Separate Entrance, Barbecue Area, Golf, Underground Parking, Tennis Court, Playground, Video Surveillance, Gym, Elevator, Indoor Pool, Reception, Gated Entrance, Underfloor Heating, Terrace, Sustainable Design, Solar Panels, Thermal Insulation, Basement, Roof Terrace, Garden, Garage, Plot, Storage, Sauna \n💬 _"Near a gym"_\n\n` +
            `🔘 *Renovation Features* \nLarge Balcony, Modern Design, Large Kitchen, Panoramic Windows, Bathroom with Bathtub, Solar Water Heater, Laminate in All Bedrooms \n💬 _"With modern design"_ \n\n` +
            `🔘 *Additional Features* \nBest Price, Negotiable, No VAT, Title Deeds \n💬 _"Show with the best price"_\n\n`,
        `To get more details about a specific property, enter "*show by* _property ID_". You can also use commands "*details for* _first|last_ *listing*" after displaying the list.`,
        `If you want to restart the conversation and clear all previous information, simply say *Reset*`,
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
    general: {
        filters: "Applied filters in search",
    },
    seller: {
        phone: "Phone number",
        email: "Email",
        site: "Website",
    },
    property: {
        airConditioning: {
            value: "Air conditioning",
            NO: "No",
            EVERYWHERE: "Everywhere",
            ONLY_BEDROOMS: "Only bedrooms",
            PROVISION: "Provision",
            YES: "Yes",
        },
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
        furnishing: {
            value: "Furnishing",
            NO: "No",
            PARTLY: "Partly",
            FULLY: "Fully",
            YES: "Yes",
        },
        gas: `Gas`,
        heating: {
            value: "Heating",
            NO: "No",
            CENTRAL: "Central",
            GAS: "Gas",
            ELECTRIC: "Electric",
            LIQUID_FUEL: "Liquid fuel",
            YES: "Yes",
        },
        infrastructureAmenities: {
            value: `Infrastructure amenities`,
            SECURITY: "Security",
            SEPARATE_ENTRANCE: "Separate entrance",
            BBQ_AREA: "BBQ area",
            GOLF: "Golf",
            UNDERGROUND_PARKING: "Underground parking",
            TENNIS_COURT: "Tennis court",
            PLAYGROUND: "Playground",
            CCTV: "CCTV",
            GYM: "Gym",
            ELEVATOR: "Elevator",
            INDOOR_POOL: "Indoor pool",
            RECEPTION: "Reception",
            GATED_ENTRANCE: "Gated entrance",
            UNDERFLOOR_HEATING: "Underfloor heating",
            TERRACE: "Terrace",
            SUSTAINABLE_DESIGN: "Sustainable design",
            PHOTOVOLTAIC_PROVISIONS: "Photovoltaic provisions",
            THERMAL_INSULATION: "Thermal insulation",
            WITH_BASEMENT: "With basement",
            ROOF_TERRACE: "Roof terrace",
            WITH_GARDEN: "With garden",
            WITH_GARAGE: "With garage",
            WITH_PLOT: "With plot",
            STORAGE: "Storage",
            SAUNA: "Sauna",
        },
        internet: {
            value: "Internet",
            NO: "No",
            WIFI: "Wi-Fi",
            CABLE: "Cable",
            MOBILE: "Mobile",
            YES: "Yes",
        },
        kitchen: `Kitchen`,
        parking: `Parking`,
        repairAmenities: {
            value: "Repair amenities",
            BIG_BALCONY: "Big balcony",
            MODERN_DESIGN: "Modern design",
            BIG_KITCHEN: "Big kitchen",
            PANORAMIC_WINDOWS: "Panoramic windows",
            EN_SUITE_BATHROOM: "En-suite bathroom",
            SOLAR_POWERED_WATER_BOILER: "Solar powered water boiler",
            LAMINATED_FLOORS_IN_ALL_BEDROOMS:
                "Laminated floors in all bedrooms",
        },
        residentialFloors: `Residential floors`,
        sewageSystem: `Sewage system`,
        television: `Television`,
        water: `Water`,
        waterHeating: {
            value: "Water heating",
            NO: "No",
            CENTRAL: "Central",
            BOILER: "Boiler",
            COMBINE: "Combine",
            SOLAR_SYSTEM: "Solar system",
            PHOTOVOLTAIC_SYSTEM: "Photovoltaic system",
        },
        location: `Location`,
        locationFeatures: {
            value: "Location features",
            NEAR_THE_LAKE: "Near the lake",
            NEAR_THE_SEA: "Near the sea",
            NEAR_THE_SLOPE: "Near the slope",
            NEAR_THE_SCHOOL: "Near the school",
            BEAUTIFUL_VIEW: "Beautiful view",
            NEAR_THE_AIRPORT: "Near the airport",
            NEAR_THE_RIVER: "Near the river",
            NEAR_THE_FOREST: "Near the forest",
            NEAR_THE_MOUNTAINS: "Near the mountains",
            NEAR_THE_KINDERGARTEN: "Near the kindergarten",
            NEAR_THE_SUBWAY: "Near the subway",
            NEAR_THE_PARK: "Near the park",
            CITY_CENTER: "City center",
            SEA_VIEW: "Sea view",
            CALM_DISTRICT: "Calm district",
            PRESTIGIOUS_DISTRICT: "Prestigious district",
            NEAR_THE_SUPERMARKET: "Near the supermarket",
        },
        swimmingPool: "Swimming pool",
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
