/**
 * @typedef {Object} Translation
 * @property {FetchErrors} fetchErrors - Ошибки при загрузке данных
 * @property {Buttons} buttons - Тексты для кнопок
 * @property {Info} info - Информационные сообщения
 * @property {string[]} help - Помощь с инструкциями
 * @property {string[]} hello - Приветственные сообщения
 * @property {string[]} bye - Прощальные сообщения
 * @property {string[]} noMatch - Сообщения о недопонимании команды
 * @property {GetProperty} getProperty - Запросы для получения свойств недвижимости
 * @property {General} general - Общие тексты
 * @property {Property} property - Атрибуты и особенности недвижимости
 */

/**
 * @typedef {Object} FetchErrors
 * @property {(country: string) => string} notFoundCityInCountry - Функция для сообщения об ошибке при отсутствии городов в стране
 * @property {string} invalidPositionValue - Сообщение об ошибке при недопустимом значении позиции
 * @property {string} listing - Сообщение о проблеме в листинге
 * @property {string} noMoreListing - Сообщение о том, что больше нет доступных листингов
 * @property {string} noSearchRequest - Сообщение о необходимости сначала выполнить поиск
 * @property {string} seller - Сообщение о невозможности получить информацию о продавце
 */

/**
 * @typedef {Object} Buttons
 * @property {string} clearFilters - Текст кнопки для очистки фильтров
 * @property {string} currentFilters - Текст кнопки для отображения текущих фильтров
 * @property {string} openInBrowser - Текст кнопки для открытия в браузере
 * @property {string} sellerContacts - Текст кнопки для отображения контактов продавца
 * @property {string} showDetails - Текст кнопки для отображения деталей
 * @property {string} showMore - Текст кнопки для отображения большего количества
 * @property {string} showOnMap - Текст кнопки для отображения на карте
 */

/**
 * @typedef {Object} Info
 * @property {string} about - Сообщение о том, как получить информацию о фильтрах
 * @property {string} noMoreResultsReset - Сообщение о том, что результатов больше нет и можно сбросить фильтры
 * @property {string} noMoreResultsResetCommand - Сообщение с командой для сброса фильтров
 * @property {string} showMoreResults - Сообщение с инструкцией для отображения большего количества результатов
 * @property {string} showMoreResultsAndReset - Сообщение с инструкцией для отображения большего количества и сброса фильтров
 * @property {string} language - Доступные языки
 */

/**
 * @typedef {Object} GetProperty
 * @property {string} area - Запрос для площади
 * @property {string} bedrooms - Запрос для количества спален
 * @property {string} budget - Запрос для бюджета
 * @property {string} coverageRatio - Запрос для коэффициента застройки
 * @property {string} country - Запрос для страны
 * @property {string} density - Запрос для плотности застройки
 * @property {string} floorNumber - Запрос для этажности
 * @property {string} id - Запрос для ID недвижимости
 * @property {string} listingType - Запрос для типа объявления
 * @property {string} location - Запрос для локации
 * @property {string} propertyType - Запрос для типа недвижимости
 * @property {string} residentialFloors - Запрос для жилых этажей
 * @property {string} language - Запрос для языка интерфейса
 */

/**
 * @typedef {Object} General
 * @property {string} filters - Текст для отображения примененных фильтров
 */

/**
 * @typedef {Object} Property
 * @property {string} airConditioning - Кондиционер
 * @property {string} alarmSystem - Система охранной сигнализации
 * @property {string} area - Площадь объекта
 * @property {string} balcony - Балкон
 * @property {string} bathrooms - Ванные комнаты
 * @property {string} bedrooms - Спальни
 * @property {BuildigConditions} buildigConditions - Состояние здания
 * @property {string} coverageRatio - Коэффициент застройки
 * @property {string} density - Плотность застройки
 * @property {string} electricity - Электричество
 * @property {string} floorArea - Площадь этажа
 * @property {string} furnishing - Меблировка
 * @property {string} gas - Газ
 * @property {string} heating - Отопление
 * @property {InfrastructureAmenities} infrastructureAmenities - Удобства инфраструктуры
 * @property {string} internet - Интернет
 * @property {string} kitchen - Кухня
 * @property {string} parking - Парковка
 * @property {RepairAmenities} repairAmenities - Особенности ремонта
 * @property {string} residentialFloors - Жилые этажи
 * @property {string} sewageSystem - Канализация
 * @property {string} television - Телевидение
 * @property {string} water - Вода
 * @property {string} waterHeating - Водонагрев
 * @property {string} location - Локация
 * @property {LocationFeatures} locationFeatures - Особенности расположения
 * @property {string} swimmingPool - Бассейн
 * @property {Price} price - Цена
 * @property {ListingType} listingType - Тип владения
 * @property {PropertyType} propertyType - Тип недвижимости
 */

/**
 * @typedef {Object} RepairAmenities
 * @property {string} value - Особенности ремонта
 * @property {string} RENOVATED - Отремонтировано
 * @property {string} PARTIALLY_RENOVATED - Частично отремонтировано
 * @property {string} NEEDS_RENOVATION - Требует ремонта
 * @property {string} NEW_BUILD - Новостройка
 * @property {string} IN_PROGRESS_RENOVATION - В процессе ремонта
 */

/**
 * @typedef {Object} BuildigConditions
 * @property {string} value - Состояние здания
 * @property {string} READY_TO_MOVE_IN - Готово к заселению
 * @property {string} UNDER_CONSTRUCTION - В стадии строительства
 * @property {string} NEEDS_RENOVATION - Требует ремонта
 * @property {string} RENOVATED - Отремонтировано
 */

/**
 * @typedef {Object} InfrastructureAmenities
 * @property {string} value - Удобства инфраструктуры
 * @property {string} SECURITY - Охрана
 * @property {string} SEPARATE_ENTRANCE - Отдельный вход
 * @property {string} BBQ_AREA - Зона барбекю
 * @property {string} GOLF - Гольф
 * @property {string} UNDERGROUND_PARKING - Подземная парковка
 * @property {string} TENNIS_COURT - Теннисный корт
 * @property {string} PLAYGROUND - Детская площадка
 * @property {string} CCTV - Видеонаблюдение
 * @property {string} GYM - Тренажерный зал
 * @property {string} ELEVATOR - Лифт
 * @property {string} INDOOR_POOL - Крытый бассейн
 * @property {string} RECEPTION - Ресепшен
 * @property {string} GATED_ENTRANCE - Закрытый въезд
 * @property {string} UNDERFLOOR_HEATING - Теплый пол
 * @property {string} TERRACE - Терраса
 * @property {string} SUSTAINABLE_DESIGN - Экологичный дизайн
 * @property {string} PHOTOVOLTAIC_PROVISIONS - Фотоэлектрические установки
 * @property {string} THERMAL_INSULATION - Теплоизоляция
 * @property {string} WITH_BASEMENT - С подвалом
 * @property {string} ROOF_TERRACE - Терраса на крыше
 * @property {string} WITH_GARDEN - С садом
 * @property {string} WITH_GARAGE - С гаражом
 * @property {string} WITH_PLOT - С участком
 * @property {string} STORAGE - Хранилище
 * @property {string} SAUNA - Сауна
 */

/**
 * @typedef {Object} LocationFeatures
 * @property {string} value - Особенности расположения
 * @property {string} NEAR_THE_LAKE - Рядом с озером
 * @property {string} NEAR_THE_SEA - Рядом с морем
 * @property {string} NEAR_THE_SLOPE - Рядом со склоном
 * @property {string} NEAR_THE_SCHOOL - Рядом со школой
 * @property {string} BEAUTIFUL_VIEW - Прекрасный вид
 * @property {string} NEAR_THE_AIRPORT - Рядом с аэропортом
 * @property {string} NEAR_THE_RIVER - Рядом с рекой
 * @property {string} NEAR_THE_FOREST - Рядом с лесом
 * @property {string} NEAR_THE_MOUNTAINS - Рядом с горами
 * @property {string} NEAR_THE_KINDERGARTEN - Рядом с детским садом
 * @property {string} NEAR_THE_SUBWAY - Рядом с метро
 * @property {string} NEAR_THE_PARK - Рядом с парком
 */

/**
 * @typedef {Object} Price
 * @property {string} value - Цена
 * @property {string} per_month - В месяц
 * @property {string} per_night - За ночь
 * @property {string} per_square_meter - За квадратный метр
 * @property {string} one_time - Единовременно
 * @property {string} negotiable - Договорная
 */

/**
 * @typedef {Object} ListingType
 * @property {string} value - Тип недвижимости
 * @property {string} SALE - Продажа
 * @property {string} RENT - Аренда
 */

/**
 * @typedef {Object} PropertyType
 * @property {string} value - Тип объекта недвижимости
 * @property {string} VILLA - Вилла
 * @property {string} APARTMENT - Квартира
 * @property {string} HOUSE - Дом
 * @property {string} COMMERCIAL_PROPERTY - Коммерческая недвижимость
 * @property {string} GARAGE - Гараж
 * @property {string} LAND - Земельный участок
 */
