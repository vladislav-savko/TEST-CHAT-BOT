/**
 * @typedef {Object} SessionData
 * @property {number} skip - Количество пропущенных элементов (сдвиг) при пагинации.
 * @property {number} take - Количество элементов для выборки.
 * @property {string[]} propertyTypes - Типы недвижимости для фильтрации.
 * @property {string} listingType - Тип объявления (например, аренда или продажа).
 * @property {string} sort - Порядок сортировки (например, "NEWEST").
 * @property {Array.<string|number>} rooms - Количество комнат.
 * @property {?number} priceFrom - Минимальная цена.
 * @property {?number} priceTo - Максимальная цена.
 * @property {?number} plotAreaTo - Максимальная площадь участка.
 * @property {?number} plotAreaFrom - Минимальная площадь участка.
 * @property {?number} bedroomsFrom - Минимальное количество спален.
 * @property {?number} bedroomsTo - Максимальное количество спален.
 * @property {?number} densityFrom - Минимальная плотность застройки.
 * @property {?number} densityTo - Максимальная плотность застройки.
 * @property {?number} coverageRatioTo - Максимальный коэффициент покрытия.
 * @property {?number} coverageRatioFrom - Минимальный коэффициент покрытия.
 * @property {?number} residentialFloorsTo - Максимальное количество жилых этажей.
 * @property {?number} residentialFloorsFrom - Минимальное количество жилых этажей.
 * @property {?number} yearOfConstructionFrom - Год постройки от.
 * @property {?number} yearOfConstructionTo - Год постройки до.
 * @property {?number} floorAreaFrom - Минимальная площадь этажа.
 * @property {?number} floorAreaTo - Максимальная площадь этажа.
 * @property {Array.<boolean|string>} water - Вода (возможные значения).
 * @property {Array.<boolean>} sewageSystemBoolean - Наличие канализации.
 * @property {Array.<boolean>} bathroomBoolean - Наличие ванной комнаты.
 * @property {Array.<string>} buildingConditions - Условия здания.
 * @property {Array.<string>} furnishing - Обстановка.
 * @property {Array.<string>} repair - Ремонт.
 * @property {Array.<string>} alarmSystem - Система сигнализации.
 * @property {Array.<string>} condition - Состояние.
 * @property {Array.<string>} parking - Парковка.
 * @property {Array.<string>} electricity - Электричество.
 * @property {Array.<string>} gas - Газ.
 * @property {Array.<string>} airConditioning - Кондиционер.
 * @property {Array.<string>} heating - Отопление.
 * @property {Array.<string>} waterHeating - Водонагреватель.
 * @property {Array.<string>} kitchen - Кухня.
 * @property {Array.<string>} balcony - Балкон.
 * @property {Array.<string>} television - Телевидение.
 * @property {Array.<string>} internet - Интернет.
 * @property {Array.<string>} infrastructureApartmentAmenity - Удобства для квартир.
 * @property {Array.<string>} infrastructurePlotAmenity - Удобства для участков.
 * @property {Array.<string>} infrastructureCommerceAmenity - Удобства для коммерческих объектов.
 * @property {boolean} withoutSold - Исключать проданные объекты.
 * @property {?number} cityId - Идентификатор города.
 */

/**
 * @typedef {Object} SessionInfo
 * @property {?any} city - Название города.
 * @property {?any} country - Название страны.
 * @property {?any} property - Информация о недвижимости.
 */

/**
 * @typedef {Object} Session
 * @property {SessionData} data - Данные сессии.
 * @property {SessionInfo} info - Информация о сессии.
 * @property {Object} params - Параметры сессии.
 * @property {?string} state - Состояние сессии.
 * @property {?any} seller - Информация о продавце.
 * @property {Array.<number|string>} ids - Идентификаторы.
 * @property {string} lang - Язык сессии.
 * @property {Object} lastParams - Параметры последнего успешного запроса.
 * @property {string} version - Версия бота.
 */

/**
 * @type {Session}
 */
var $session;