/**
 * @typedef {Object} FetchErrors
 * @property {(country: string) => string} notFoundCityInCounty - Функция для сообщения об ошибке при отсутствии городов в стране
 * @property {string} invalidPositionValue - Сообщение об ошибке при недопустимом значении позиции
 * @property {string} listing - Сообщение о проблеме в листинге
 * @property {string} noMoreListing - Сообщение о том, что больше нет доступных листингов
 * @property {string} noSearchRequest - Сообщение о необходимости сначала выполнить поиск
 * @property {string} seller - Сообщение о невозможности получить информацию о продавце
*/

/**
 * @typedef {Object} Buttons
 * @property {string} clearFilters - Текст для кнопки "Очистить фильтры"
 * @property {string} currentFilters - Текст для кнопки "Текущие фильтры"
 * @property {string} openInBrowser - Текст для кнопки "Открыть в браузере"
 * @property {string} sellerContacts - Текст для кнопки "Контакты продавца"
 * @property {string} showDetails - Текст для кнопки "Показать детали"
 * @property {string} showMore - Текст для кнопки "Показать больше"
 * @property {string} showOnMap - Текст для кнопки "Показать на карте"
*/

/**
 * @typedef {Object} Info
 * @property {string} about - Информация о возможности получения списка фильтров
 * @property {string} noMoreResultsReset - Сообщение о необходимости сброса фильтров при отсутствии результатов
 * @property {string} noMoreResultsResetCommand - Информация о команде сброса фильтров при отсутствии результатов
 * @property {string} showMoreResults - Инструкция о показе дополнительных результатов
 * @property {string} showMoreResultsAndReset - Инструкция о показе дополнительных результатов и сбросе фильтров
*/

/**
 * @typedef {string[]} Help
*/

/**
 * @typedef {string[]} Hello
*/

/**
 * @typedef {string[]} Bye
*/

/**
 * @typedef {string[]} NoMatch
*/

/**
 * @typedef {Object} GetProperty
 * @property {string} area - Запрос на площадь периметра
 * @property {string} bedrooms - Запрос на количество спален
 * @property {string} budget - Запрос на бюджет
 * @property {string} coverageRatio - Запрос на коэффициент застройки
 * @property {string} density - Запрос на застройку
 * @property {string} floorNumber - Запрос на этажность
 * @property {string} id - Запрос на ID объекта недвижимости
 * @property {string} listingType - Запрос на тип листинга (продажа или аренда)
 * @property {string} location - Запрос на город расположения
 * @property {string} propertyType - Запрос на тип недвижимости (апартаменты, дом, вилла и т.д.)
 * @property {string} residentialFloors - Запрос на этажность жилых помещений
*/

/**
 * @typedef {Object} Property
 * @property {string} airConditioning - Кондиционирование воздуха
 * @property {string} alarmSystem - Система сигнализации
 * @property {string} area - Площадь недвижимости
 * @property {string} balcony - Балкон
 * @property {string} bathrooms - Ванные комнаты
 * @property {string} bedrooms - Спальни
 * @property {string} buildigConditions - Состояние здания
 * @property {string} coverageRatio - Коэффициент застройки
 * @property {string} density - Застройка
 * @property {string} electricity - Электричество
 * @property {string} floorArea - Площадь пола
 * @property {string} furnishing - Меблировка
 * @property {string} gas - Газ
 * @property {string} heating - Отопление
 * @property {string} infrastructureAmenities - Инфраструктурные удобства
 * @property {string} internet - Интернет
 * @property {string} kitchen - Кухня
 * @property {string} parking - Парковка
 * @property {string} repairAmenities - Удобства ремонта
 * @property {string} residentialFloors - Жилые этажи
 * @property {string} sewageSystem - Канализационная система
 * @property {string} television - Телевидение
 * @property {string} water - Вода
 * @property {string} waterHeating - Водонагреватель
 * @property {{ value: string, budget: string }} price - Цена
 * @property {{ sale: string, rent: string, shotRent: string }} listingType - Тип листинга
 * @property {{ apartment: string, villa: string, detachedHouse: string, semiDetachedHouse: string, office: string, hotel: string, manufacturing: string, retailSpace: string, publicCateringFacility: string, warehouse: string, carParking: string, shop: string, restaurant: string, otherCommercial: string, commercialPlot: string, residentialPlot: string, agriculturePlot: string }} propertyType - Тип недвижимости
*/

/**
 * @typedef {Object} Translation
 * @property {FetchErrors} fetchErrors - Объект с ошибками
 * @property {Buttons} buttons - Объект с текстами кнопок
 * @property {Info} info - Объект с информационными сообщениями
 * @property {Help} help - Массив строк для справочной информации
 * @property {Hello} hello - Массив строк для приветственных сообщений
 * @property {Bye} bye - Массив строк для сообщений прощания
 * @property {NoMatch} noMatch - Массив строк для сообщений о непонимании
 * @property {GetProperty} getProperty - Объект с запросами на получение свойств недвижимости
 * @property {Property} property - Объект с описанием свойств недвижимости
*/