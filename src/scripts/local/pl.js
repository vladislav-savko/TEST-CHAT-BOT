/** @type {Translation} */
export default {
    fetchErrors: {
        notFoundCityInCountry: (country) =>
            `Przepraszam, nie znaleziono miast w kraju ${country}. Proszę spróbować ponownie.`,
        invalidPositionValue: `Nieprawidłowa wartość pozycji.`,
        listing: `Coś poszło nie tak, spróbuj ponownie później. Przepraszam.`,
        noMoreListing: `Przepraszam, nie ma więcej dostępnych ofert zgodnych z twoim zapytaniem.`,
        noSearchRequest: `Nie wiem, jakie nieruchomości mogę ci pokazać, musisz najpierw złożyć zapytanie o wyszukiwanie.`,
        seller: `Przepraszam, nie mogę uzyskać informacji o sprzedawcy.`,
    },
    buttons: {
        clearFilters: `Wyczyść filtry`,
        currentFilters: `Pokaż filtry`,
        openInBrowser: `Otwórz w przeglądarce`,
        sellerContacts: `Kontakty sprzedawcy`,
        showDetails: `Pokaż szczegóły`,
        showMore: `Pokaż więcej`,
        showOnMap: `Pokaż na mapie`,
        continueSearch: `Kontynuuj wyszukiwanie`,
    },
    info: {
        about: `Jeśli chcesz dowiedzieć się, jakich filtrów można użyć, aby znaleźć najlepszą opcję dla siebie, po prostu powiedz \*Info\*`,
        noMoreResultsReset: `Nie ma więcej wyników, powiedz "\*Reset\*" aby wyczyścić filtry.`,
        noMoreResultsResetCommand: `Nie ma więcej wyników, możesz wyczyścić filtry komendą **Reset**`,
        showMoreResults: `Aby zobaczyć więcej wyników, po prostu powiedz \*Pokaż więcej\*`,
        showMoreResultsAndReset: `Aby zobaczyć więcej wyników powiedz "\*Pokaż więcej\*". Aby wyczyścić filtry powiedz "\*Reset\*"`,
        language: `English language, русский язык, українська мова, ελληνική γλώσσα, język polski`,
        continueSearch: `Aby kontynuować wyszukiwanie, powiedz \*Kontynuuj wyszukiwanie\*`,
    },
    help: [
        "Aby zmienić język, napisz język, w którym chcesz, aby twój bot się z tobą komunikował. Na przykład, Przełącz na język grecki",
        "Bot może mówić w 5 językach: \n - Angielski \n - Grecki \n - Rosyjski \n - Ukraiński \n - Polski",
        "Aby rozpocząć wyszukiwanie, musisz podać lokalizację, typ nieruchomości (dom, willa, mieszkanie, handel, działka), typ oferty (wynajem lub kupno) i budżet. Na przykład, *Chcę kupić dom w Limassol z budżetem powyżej 10 tys. dolarów*",
        "Oto lista udogodnień, które możesz wpisać: \n - System alarmowy \n - Klimatyzacja *(Wszędzie, Tylko w sypialniach, Brak)* \n - Balkon \n - Stan budynku *(Gotowe do zamieszkania, W budowie)* \n - Stan *(Nowe, Dobrze utrzymane, Wymaga remontu)* \n - Kuchnia \n - Parking \n - Gaz ziemny \n - Elektryczność \n - Internet *(Brak, Wi-Fi, Kablowy, Mobilny)* \n - Ogrzewanie *(Brak, Centralne, Gazowe, Elektryczne, Paliwo ciekłe)* \n - Ogrzewanie wody *(Brak, Centralne, Bojler, System słoneczny, System fotowoltaiczny)* \n - Udogodnienia *(Blisko szkoły, Blisko parku, Spokojna okolica, W centrum, Miejsce parkingowe, Piękny widok, Sauna, Widok na morze, Ochrona, Magazyn, Blisko metra, Blisko przedszkola, Blisko morza, Blisko jeziora, Z ogrodem, Z garażem)*",
        "Jeśli podczas dodawania parametrów do zapytania napotkasz brak wyników wyszukiwania, możesz cofnąć ostatnią wprowadzaną wartość za pomocą komendy *Cofnij*.",
        `Aby uzyskać więcej szczegółów na temat konkretnej nieruchomości, wpisz "*pokaż wg* _id nieruchomości_". Możesz także użyć komend "*szczegóły dla* _pierwsza|ostatnia_ *jedna*" po wyświetleniu listy.`,
        "Jeśli chcesz zresetować rozmowę i wyczyścić wszystkie poprzednie informacje, po prostu powiedz *Reset*",
    ],
    hello: [
        `Cześć! Jestem twoim asystentem ds. nieruchomości. Czy chcesz wynająć czy kupić nieruchomość?`,
        `Witaj! Jestem tutaj, aby pomóc ci znaleźć idealny dom. Czy planujesz wynająć czy kupić?`,
        `Dzień dobry! Jestem gotów pomóc ci w wyborze nieruchomości. Czy interesuje cię wynajem czy kupno?`,
        `Witaj! Szukasz nowego mieszkania? Powiedz, czego potrzebujesz, a pomogę ci znaleźć najlepszą opcję.`,
        `Cześć! Jestem twoim asystentem ds. nieruchomości AI. Jak mogę ci pomóc — wynajem czy kupno?`,
    ],
    bye: [
        "Dziękuję za skontaktowanie się ze mną! Powodzenia w poszukiwaniu mieszkania!",
        "Wszystkiego najlepszego! Jeśli masz jeszcze pytania, nie wahaj się pytać.",
        "Mam nadzieję, że mogłem pomóc. Miłego dnia!",
        "Do widzenia! Powodzenia z wynajmem lub zakupem nowego mieszkania!",
        "Dziękuję za twój czas! Jeśli potrzebujesz dalszej pomocy, jestem zawsze tutaj.",
        "Do zobaczenia wkrótce! Powodzenia w poszukiwaniu mieszkania!",
        "Cieszę się, że mogłem pomóc! Wszystkiego najlepszego w poszukiwaniu mieszkania.",
        "Żegnaj! Mam nadzieję, że wkrótce znajdziesz swój idealny dom.",
        "Dziękuję za kontakt! Jeśli masz jeszcze pytania, jestem tutaj, aby pomóc.",
        "Wszystkiego najlepszego! Niech twoje poszukiwania nieruchomości zakończą się sukcesem.",
    ],
    noMatch: [
        "Przepraszam, nie zrozumiałem twojej komendy. Czy możesz wyjaśnić, co dokładnie chcesz wiedzieć lub zrobić? Na przykład, czy szukasz informacji o nieruchomościach, czy masz inne pytanie?",
        "Przepraszam, ale nie rozpoznałem tej komendy. Czy możesz wyjaśnić, co chciałeś zrobić? Na przykład, czy chcesz znaleźć mieszkanie na wynajem lub na sprzedaż, czy masz inne pytania dotyczące nieruchomości?",
        "Nie zrozumiałem twojej komendy. Czy możesz wyjaśnić swoje zapytanie? Na przykład, czy szukasz informacji o rynku nieruchomości, czy masz konkretne wymagania dotyczące mieszkania?",
    ],
    getProperty: {
        area: `Jaki obszar cię interesuje?`,
        bedrooms: `Ile sypialni potrzebujesz?`,
        budget: `Jaki jest twój budżet?`,
        coverageRatio: `Jakie są preferencje dotyczące współczynnika zabudowy?`,
        country: `Would you like to check all the option in this country?`,
        density: `Jaką gęstość zabudowy potrzebujesz?`,
        floorNumber: `Na których piętrach chcesz znaleźć pomieszczenia?`,
        id: `Proszę podać ID nieruchomości.`,
        listingType: `Jaki rodzaj własności nieruchomości cię interesuje: kupno czy wynajem?`,
        location: `W jakim mieście chcesz obejrzeć nieruchomość?`,
        propertyType: `Jakim rodzajem nieruchomości jesteś zainteresowany: mieszkanie, dom, willa, handel, działka?`,
        residentialFloors: `Na których piętrach powinny znajdować się piętra mieszkalne?`,
        language: `Jaki język interfejsu chcesz wybrać?`,
    },
    general: {
        filters: "Zastosowane filtry w wyszukiwarce",
    },
    property: {
        airConditioning: {
            value: "Klimatyzacja",
            NO: "Nie",
            EVERYWHERE: "Wszędzie",
            ONLY_BEDROOMS: "Tylko w sypialniach",
            PROVISION: "Przewidziane",
            YES: "Tak",
        },
        alarmSystem: `System alarmowy`,
        area: `Powierzchnia nieruchomości`,
        balcony: `Balkon`,
        bathrooms: `Łazienki`,
        bedrooms: `Sypialnie`,
        buildigConditions: {
            value: `Stan budynku`,
            READY_TO_MOVE_IN: `Gotowy do zamieszkania`,
            UNDER_CONSTRUCTION: `W budowie`,
            NEEDS_RENOVATION: `Wymaga remontu`,
            RENOVATED: `Wyremontowany`,
        },
        coverageRatio: `Współczynnik zabudowy`,
        density: `Gęstość zabudowy`,
        electricity: `Elektryczność`,
        floorArea: `Powierzchnia piętra`,
        furnishing: {
            value: "Meble",
            NO: "Nie",
            PARTLY: "Częściowo",
            FULLY: "W pełni",
            YES: "Tak",
        },
        gas: `Gaz`,
        heating: {
            value: "Ogrzewanie",
            NO: "Nie",
            CENTRAL: "Centralne",
            GAS: "Gazowe",
            ELECTRIC: "Elektryczne",
            LIQUID_FUEL: "Płynne paliwo",
            YES: "Tak",
        },
        infrastructureAmenities: {
            value: "Udogodnienia infrastruktury",
            SECURITY: "Ochrona",
            SEPARATE_ENTRANCE: "Oddzielne wejście",
            BBQ_AREA: "Strefa BBQ",
            GOLF: "Golf",
            UNDERGROUND_PARKING: "Podziemny parking",
            TENNIS_COURT: "Kort tenisowy",
            PLAYGROUND: "Plac zabaw",
            CCTV: "Monitoring",
            GYM: "Siłownia",
            ELEVATOR: "Winda",
            INDOOR_POOL: "Basen kryty",
            RECEPTION: "Recepcja",
            GATED_ENTRANCE: "Strzeżone wejście",
            UNDERFLOOR_HEATING: "Ogrzewanie podłogowe",
            TERRACE: "Taras",
            SUSTAINABLE_DESIGN: "Zrównoważony design",
            PHOTOVOLTAIC_PROVISIONS: "Instalacje fotowoltaiczne",
            THERMAL_INSULATION: "Izolacja termiczna",
            WITH_BASEMENT: "Z piwnicą",
            ROOF_TERRACE: "Taras na dachu",
            WITH_GARDEN: "Z ogrodem",
            WITH_GARAGE: "Z garażem",
            WITH_PLOT: "Z działką",
            STORAGE: "Magazyn",
            SAUNA: "Sauna",
        },
        internet: {
            value: "Internet",
            NO: "Nie",
            WIFI: "Wi-Fi",
            CABLE: "Kablowy",
            MOBILE: "Mobilny",
            YES: "Tak",
        },
        kitchen: `Kuchnia`,
        parking: `Parking`,
        repairAmenities: {
            value: "Cechy wykończenia",
            BIG_BALCONY: "Duży balkon",
            MODERN_DESIGN: "Nowoczesny design",
            BIG_KITCHEN: "Duża kuchnia",
            PANORAMIC_WINDOWS: "Panoramiczne okna",
            EN_SUITE_BATHROOM: "Łazienka z sypialnią",
            SOLAR_POWERED_WATER_BOILER:
                "Boiler wodny zasilany energią słoneczną",
            LAMINATED_FLOORS_IN_ALL_BEDROOMS:
                "Laminowane podłogi we wszystkich sypialniach",
        },
        residentialFloors: `Piętra mieszkalne`,
        sewageSystem: `Kanalizacja`,
        television: `Telewizja`,
        water: `Woda`,
        waterHeating: {
            value: "Podgrzewanie wody",
            NO: "Nie",
            CENTRAL: "Centralne",
            BOILER: "Boiler",
            COMBINE: "Kombinowane",
            SOLAR_SYSTEM: "System solarny",
            PHOTOVOLTAIC_SYSTEM: "System fotowoltaiczny",
        },
        location: `Lokalizacja`,
        locationFeatures: {
            value: "Cechy lokalizacji",
            NEAR_THE_LAKE: "Blisko jeziora",
            NEAR_THE_SEA: "Blisko morza",
            NEAR_THE_SLOPE: "Blisko stoku",
            NEAR_THE_SCHOOL: "Blisko szkoły",
            BEAUTIFUL_VIEW: "Piękny widok",
            NEAR_THE_AIRPORT: "Blisko lotniska",
            NEAR_THE_RIVER: "Blisko rzeki",
            NEAR_THE_FOREST: "Blisko lasu",
            NEAR_THE_MOUNTAINS: "Blisko gór",
            NEAR_THE_KINDERGARTEN: "Blisko przedszkola",
            NEAR_THE_SUBWAY: "Blisko metra",
            NEAR_THE_PARK: "Blisko parku",
            CITY_CENTER: "Centrum miasta",
            SEA_VIEW: "Widok na morze",
            CALM_DISTRICT: "Cisna dzielnica",
            PRESTIGIOUS_DISTRICT: "Prestiżowa dzielnica",
            NEAR_THE_SUPERMARKET: "Blisko supermarketu",
        },
        swimmingPool: "Basen",
        price: {
            value: `Cena`,
            budget: `Budżet`,
        },
        listingType: {
            value: `Rodzaj własności`,
            RENT: `Wynajem`,
            SHORT_RENT: `Krótkoterminowy wynajem`,
            SALE: `Sprzedaż`,
        },
        propertyType: {
            value: `Typ nieruchomości`,
            APARTMENT: `Mieszkanie`,
            VILLA: `Willa`,
            DETACHED_HOUSE: `Dom wolnostojący`,
            SEMIDETACHED_HOUSE: `Dom bliźniak`,
            OFFICE: `Biuro`,
            HOTEL: `Hotel`,
            MANUFACTURING: `Produkcja`,
            RETAIL_SPACE: `Powierzchnia handlowa`,
            PUBLIC_CATERING_FACILITY: `Gastronomia`,
            WAREHOUSE: `Magazyn`,
            CAR_PARKING: `Parking`,
            SHOP: `Sklep`,
            RESTAURANT: `Restauracja`,
            OTHER_COMMERCIAL: `Inne komercyjne`,
            COMMERCIAL_PLOT: `Działka komercyjna`,
            RESIDENTIAL_PLOT: `Działka mieszkaniowa`,
            AGRICULTURE_PLOT: `Działka rolnicza`,
        },
    },
};
