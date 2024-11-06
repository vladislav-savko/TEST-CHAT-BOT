/** @type {Translation} */
export default {
    fetchErrors: {
        notFoundCityInCountry: (country) =>
            `Извините, города в стране ${country} не найдены. Попробуйте снова.`,
        invalidPositionValue: `Недопустимое значение позиции.`,
        listing: `Что-то пошло не так, пожалуйста, попробуйте позже. Извините.`,
        noMoreListing: `Извините, больше нет доступных объявлений по вашему запросу.`,
        noSearchRequest: `Я не знаю, какие объекты я могу вам показать, вам нужно сначала сделать запрос на поиск.`,
        seller: `Извините, я не могу получить информацию о продавце.`,
    },
    buttons: {
        clearFilters: `Очистить фильтры`,
        currentFilters: `Фильтры`,
        openInBrowser: `Открыть в браузере`,
        sellerContacts: `Контакты продавца`,
        showDetails: `Показать детали`,
        showMore: `Показать больше`,
        showOnMap: `Показать на карте`,
    },
    info: {
        about: `Если вы хотите узнать, какие фильтры можно использовать для поиска наилучшего варианта для вас, просто скажите \*Информация\*`,
        noMoreResultsReset: `Больше нет результатов, скажите "\*Сброс\*" для очистки фильтров.`,
        noMoreResultsResetCommand: `Больше нет результатов, вы можете очистить фильтры командой **Сброс**`,
        showMoreResults: `Чтобы увидеть больше результатов, просто скажите \*Показать больше\*`,
        showMoreResultsAndReset: `Чтобы увидеть больше результатов, скажите "\*Показать больше\*". Чтобы очистить фильтры, скажите "\*Сброс\*"`,
        language: `English language, русский язык, українська мова, ελληνική γλώσσα, język polski`,
    },
    help: [
        "Чтобы сменить язык, напишите язык, на котором вы хотите, чтобы ваш бот взаимодействовал с вами. Например, Переключиться на польский",
        "Бот может говорить на 5 языках: \n - Английский \n - Греческий \n - Русский \n - Украинский \n - Польский",
        "Чтобы начать поиск, вам нужно указать местоположение, тип недвижимости (дом, вилла, квартира, коммерция, участок), тип объявления (аренда или покупка) и бюджет. Например, *Я хочу купить дом в Лимассоле с бюджетом более 10 тысяч долларов*",
        "Вот список удобств, которые вы можете ввести: \n - Система охранной сигнализации \n - Кондиционер *(Везде, Только в спальнях, Нет)* \n - Балкон \n - Состояние здания *(Готово к заселению, На стадии строительства)* \n - Состояние *(Новое, Хорошо ухоженное, Требуется ремонт)* \n - Кухня \n - Парковка \n - Природный газ \n - Электричество \n - Интернет *(Нет, Wi-Fi, Кабельный, Мобильный)* \n - Отопление *(Нет, Центральное, Газ, Электрическое, Жидкое топливо)* \n - Водонагрев *(Нет, Центральное, Бойлер, Солнечная система, Фотоэлектрическая система)* \n - Удобства *(Рядом с школой, Рядом с парком, Спокойный район, В центре, Парковочное место, Красивый вид, Сауна, Вид на море, Охрана, Склад, Рядом с метро, Рядом с детским садом, Рядом с морем, Рядом с озером, С садом, С гаражом)*",
        "Если при добавлении параметров к запросу на каком-то этапе вы столкнулись с отсутствием результатов поиска, вы можете отменить последнее введенное значение с помощью команды *Отменить*.",
        `Чтобы получить более подробную информацию о конкретной недвижимости, введите "*показать по* _id недвижимости_". Вы также можете использовать команды "*детали для* _первого|последнего_ *объявления*" после отображения списка.`,
        "Если вы хотите перезапустить разговор и очистить всю предыдущую информацию, просто скажите *Сброс*",
    ],
    hello: [
        `Здравствуйте! Я ваш помощник по недвижимости. Вы хотите арендовать или купить недвижимость?`,
        `Привет! Я здесь, чтобы помочь вам найти идеальный дом. Вы планируете арендовать или купить?`,
        `Добрый день! Я готов помочь вам с выбором недвижимости. Вас интересует аренда или покупка?`,
        `Приветствую! Ищете новую квартиру? Скажите, что вам нужно, и я помогу вам найти лучший вариант.`,
        `Здравствуйте! Я ваш ИИ-помощник по недвижимости. Как я могу вам помочь — аренда или покупка?`,
    ],
    bye: [
        "Спасибо, что обратились ко мне! Удачи в поиске жилья!",
        "Всего наилучшего! Если у вас есть еще вопросы, не стесняйтесь задавать.",
        "Надеюсь, я смог вам помочь. Хорошего дня!",
        "До свидания! Удачи с арендой или покупкой новой квартиры!",
        "Спасибо за ваше время! Если вам потребуется дополнительная помощь, я всегда здесь.",
        "До скорого! Удачи в поиске жилья!",
        "Рад был помочь! Всего наилучшего в поиске квартиры.",
        "Прощайте! Надеюсь, вы скоро найдете свой идеальный дом.",
        "Спасибо, что обратились! Если у вас будут еще вопросы, я здесь, чтобы помочь.",
        "Всего наилучшего! Пусть ваш поиск недвижимости будет успешным.",
    ],
    noMatch: [
        "Извините, я не понял вашу команду. Могли бы вы уточнить, что именно вы хотите узнать или сделать? Например, вы ищете информацию о недвижимости или у вас другой запрос?",
        "Извините, но я не распознал эту команду. Могли бы вы подробнее объяснить, что вы пытались сделать? Например, вы хотите найти квартиру для аренды или покупки, или у вас есть другие вопросы по недвижимости?",
        "Я не понял вашу команду. Могли бы вы уточнить ваш запрос? Например, вы ищете информацию о рынке недвижимости или у вас есть конкретные требования к жилью?",
    ],
    getProperty: {
        area: `Какой периметр вас интересует?`,
        bedrooms: `Сколько спален вам нужно?`,
        budget: `Какой у вас бюджет?`,
        coverageRatio: `Какие предпочтения по коэффициенту застройки?`,
        country: `Would you like to check all the option in this country?`,
        density: `Какая плотность застройки вам нужна?`,
        floorNumber: `На каких этажах вы хотите найти помещение?`,
        id: `Пожалуйста, укажите ID объекта недвижимости.`,
        listingType: `Какой тип владения недвижимостью вас интересует: покупка или аренда?`,
        location: `В каком городе или в какой стране вы хотите посмотреть недвижимость?`,
        propertyType: `Какой тип недвижимости вас интересует: квартира, дом, вилла, коммерция, участок?`,
        residentialFloors: `На каких этажах должны располагаться жилые этажи?`,
        language: `Какой язык интерфейса вы хотите выбрать?`,
    },
    general: {
        filters: "Применённые фильтра при поиске",
    },
    property: {
        airConditioning: {
            value: `Кондиционер`,
            NO: "Нет",
            EVERYWHERE: "Везде",
            ONLY_BEDROOMS: "Только в спальнях",
            PROVISION: "Подводка",
            YES: "Да",
        },
        alarmSystem: `Система охранной сигнализации`,
        area: `Площадь объекта`,
        balcony: `Балкон`,
        bathrooms: `Ванные комнаты`,
        bedrooms: `Спальни`,
        buildigConditions: {
            value: `Состояние здания`,
            READY_TO_MOVE_IN: `Готово к заселению`,
            UNDER_CONSTRUCTION: `В стадии строительства`,
            NEEDS_RENOVATION: `Требует ремонта`,
            RENOVATED: `Отремонтировано`,
        },
        coverageRatio: `Коэффициент застройки`,
        density: `Плотность застройки`,
        electricity: `Электричество`,
        floorArea: `Площадь этажа`,
        furnishing: {
            value: "Меблировка",
            NO: "Нет",
            PARTLY: "Частично",
            FULLY: "Полностью",
            YES: "Да",
        },
        gas: `Газ`,
        heating: {
            value: `Отопление`,
            NO: "Нет",
            CENTRAL: "Центральное",
            GAS: "Газовое",
            ELECTRIC: "Электрическое",
            LIQUID_FUEL: "Жидкое топливо",
            YES: "Да",
        },
        infrastructureAmenities: {
            value: "Удобства инфраструктуры",
            SECURITY: "Охрана",
            SEPARATE_ENTRANCE: "Отдельный вход",
            BBQ_AREA: "Зона барбекю",
            GOLF: "Гольф",
            UNDERGROUND_PARKING: "Подземная парковка",
            TENNIS_COURT: "Теннисный корт",
            PLAYGROUND: "Детская площадка",
            CCTV: "Видеонаблюдение",
            GYM: "Тренажерный зал",
            ELEVATOR: "Лифт",
            INDOOR_POOL: "Крытый бассейн",
            RECEPTION: "Ресепшен",
            GATED_ENTRANCE: "Закрытый въезд",
            UNDERFLOOR_HEATING: "Теплый пол",
            TERRACE: "Терраса",
            SUSTAINABLE_DESIGN: "Экологичный дизайн",
            PHOTOVOLTAIC_PROVISIONS: "Фотоэлектрические установки",
            THERMAL_INSULATION: "Теплоизоляция",
            WITH_BASEMENT: "С подвалом",
            ROOF_TERRACE: "Терраса на крыше",
            WITH_GARDEN: "С садом",
            WITH_GARAGE: "С гаражом",
            WITH_PLOT: "С участком",
            STORAGE: "Хранилище",
            SAUNA: "Сауна",
        },
        internet: {
            value: `Интернет`,
            WIFI: "Wi-Fi",
            CABLE: "Кабельный",
            MOBILE: "Мобильный",
            YES: "Да",
        },
        kitchen: `Кухня`,
        parking: `Парковка`,
        repairAmenities: {
            value: "Особенности ремонта",
            BIG_BALCONY: "Большой балкон",
            MODERN_DESIGN: "Современный дизайн",
            BIG_KITCHEN: "Большая кухня",
            PANORAMIC_WINDOWS: "Панорамные окна",
            EN_SUITE_BATHROOM: "Собственная ванная комната",
            SOLAR_POWERED_WATER_BOILER: "Водонагреватель на солнечных батареях",
            LAMINATED_FLOORS_IN_ALL_BEDROOMS:
                "Ламинированные полы во всех спальнях",
        },
        residentialFloors: `Жилые этажи`,
        sewageSystem: `Канализация`,
        television: `Телевидение`,
        water: `Вода`,
        waterHeating: {
            value: "Водонагрев",
            NO: "Нет",
            CENTRAL: "Центральный",
            BOILER: "Бойлер",
            COMBINE: "Комбинированный",
            SOLAR_SYSTEM: "Солнечная система",
            PHOTOVOLTAIC_SYSTEM: "Фотоэлектрическая система",
        },
        location: `Локация`,
        locationFeatures: {
            value: "Особенности расположения",
            NEAR_THE_LAKE: "Рядом с озером",
            NEAR_THE_SEA: "Рядом с морем",
            NEAR_THE_SLOPE: "Рядом со склоном",
            NEAR_THE_SCHOOL: "Рядом со школой",
            BEAUTIFUL_VIEW: "Прекрасный вид",
            NEAR_THE_AIRPORT: "Рядом с аэропортом",
            NEAR_THE_RIVER: "Рядом с рекой",
            NEAR_THE_FOREST: "Рядом с лесом",
            NEAR_THE_MOUNTAINS: "Рядом с горами",
            NEAR_THE_KINDERGARTEN: "Рядом с детским садом",
            NEAR_THE_SUBWAY: "Рядом с метро",
            NEAR_THE_PARK: "Рядом с парком",
            CITY_CENTER: "Центр города",
            SEA_VIEW: "Вид на море",
            CALM_DISTRICT: "Спокойный район",
            PRESTIGIOUS_DISTRICT: "Престижный район",
            NEAR_THE_SUPERMARKET: "Рядом с супермаркетом",
        },
        swimmingPool: `Бассейн`,
        price: {
            value: `Цена`,
            budget: `Бюджет`,
        },
        listingType: {
            value: `Тип владения`,
            RENT: `Аренда`,
            SHORT_RENT: `Краткосрочная аренда`,
            SALE: `Продажа`,
        },
        propertyType: {
            value: "Тип недвижимости",
            APARTMENT: `Квартира`,
            VILLA: `Вилла`,
            DETACHED_HOUSE: `Отдельно стоящий дом`,
            SEMIDETACHED_HOUSE: `Дуплекс`,
            OFFICE: `Офис`,
            HOTEL: `Отель`,
            MANUFACTURING: `Производство`,
            RETAIL_SPACE: `Торговое помещение`,
            PUBLIC_CATERING_FACILITY: `Общественное питание`,
            WAREHOUSE: `Склад`,
            CAR_PARKING: `Парковка`,
            SHOP: `Магазин`,
            RESTAURANT: `Ресторан`,
            OTHER_COMMERCIAL: `Другое коммерческое`,
            COMMERCIAL_PLOT: `Коммерческий участок`,
            RESIDENTIAL_PLOT: `Жилой участок`,
            AGRICULTURE_PLOT: `Сельскохозяйственный участок`,
        },
    },
};
