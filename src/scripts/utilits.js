import anisad from "./api/anisad.js";
import TurndownService from "turndown";
import { VERSION } from "./config.js";
import local from "./local/local.js";
import response from "./response.js";
import {
    getPropertyDetails,
    getPreviewImage,
    getDescription,
    getLinkToBrowserPage,
    getLinkToMap,
} from "./createTextData.js";

import "./typeDoc/session.js";
import "./typeDoc/reactions.js";
import "./typeDoc/request.js";
import "./typeDoc/global.js";

export function session() {
    $session.data = {
        skip: 0,
        take: 3,
        rooms: [],
        airConditioning: [],
        alarmSystem: [],
        bathroomNumbers: [],
        bedrooms: [],
        buildingConditions: [],
        cityId: null,
        companyName: null,
        countryId: null,
        coverageRatioFrom: null,
        coverageRatioTo: null,
        densityFrom: null,
        densityTo: null,
        districtId: null,
        electricity: [],
        energyEfficiency: [],
        fireplace: [],
        floorAreaFrom: null,
        floorAreaTo: null,
        furnishing: [],
        heating: [],
        infrastructureAmenity: [],
        internet: [],
        isIncludeCollapsing: true,
        listingType: "",
        locationFeatures: [],
        parking: [],
        pentHouse: [],
        plotAreaFrom: null,
        plotAreaTo: null,
        priceFrom: null,
        priceTo: null,
        propertyStatus: [],
        propertyTypes: [],
        repairAmenity: [],
        residentialFloorsFrom: null,
        residentialFloorsTo: null,
        sewageSystem: [],
        sort: "BY_INDEX",
        swimmingPool: [],
        waterHeating: [],
        withoutSold: true,
        yearOfConstructionFrom: null,
        yearOfConstructionTo: null,
    };

    $session.location = {};

    $session.filters = {
        messageId: null,
        param: null,
    };

    $session.params = {};
    $session.state = null;
    $session.seller = null;
    $session.ids = [];

    $session.lastParams = {};

    $session.version = VERSION;
}

export const initSession = () => {
    if (!$session.data || $session.version !== VERSION) {
        session();
    }

    if ($session.version !== VERSION) {
        $session.isNewUser = true;
    }
};

export const getCityInfo = async (city, country = "cyprus") => {
    country = country || "cyprus";
    try {
        const resC = await anisad.getCitiesInfo(city, country);
        // if (!resC) return false;

        const filteredCities = resC.filter(
            (city) => city.countryNameEn.toLowerCase() === country.toLowerCase()
        );

        if (filteredCities.length === 0) {
            const { lang } = $session;
            response.randomText(
                local(lang).fetchErrors.notFoundCityInCounty(country)
            );
            return false;
        }

        let firstCity = null;
        if (filteredCities[0].cityNameEn === "paralimni") {
            firstCity = filteredCities[1];
        } else {
            firstCity = filteredCities[0];
        }

        if (!firstCity.districtName && !firstCity.cityName) {
            $session.data.countryId = firstCity.countryId;
            $session.data.cityId = null;
            $session.data.districtId = null;
        } else if (firstCity.districtName === firstCity.cityName) {
            $session.data.districtId = firstCity.districtId;
            $session.data.cityId = null;
            $session.data.countryId = null;
        } else {
            $session.data.cityId = firstCity.cityId;
            $session.data.districtId = null;
            $session.data.countryId = null;
        }

        log({
            function: "getCityInfo",
            input: { city, country },
            output: { firstCity },
        });

        return firstCity;
    } catch (error) {
        // $reactions.answer("*City* Something's broken, please try again later. Sorry");

        log({
            function: "getCityInfo",
            input: { city, country },
            output: { message: "ERROR" },
        });

        return false;
    }
};

export function getIdsFromListings(res) {
    return res && res.data && Array.isArray(res.data.listings)
        ? res.data.listings.map((listing) => listing.id)
        : [];
}

export const hasNextPage = (total, take, skip) => skip + take < total;

export const printShowMore = (total, take, skip) => {
    const hastNext = hasNextPage(total, take, skip);
    const { lang } = $session;
    const isTelegram = $request.channelType === "telegram";

    const textMessage = hastNext
        ? local(lang).info.showMoreResults
        : local(lang).info.noMoreResultsReset;

    const telegramTextMessage = hastNext
        ? local(lang).info.showMoreResultsAndReset
        : local(lang).info.noMoreResultsReset;

    const telegramButtons = hastNext
        ? [
              local(lang).buttons.showMore,
              local(lang).buttons.currentFilters,
              local(lang).buttons.clearFilters,
          ]
        : [local(lang).buttons.clearFilters];

    if (isTelegram) {
        response.text(telegramTextMessage);
        response.buttons(telegramButtons);
    } else {
        response.text(textMessage + hastNext);
    }
};

export const getListings = async (sessionData) => {
    const { lang } = await $session;
    sessionData.take = 3;

    await anisad.postHistory(`${$request.channelUserId}`, {
        type: "FILTER",
        filters: sessionData,
    });

    try {
        const res = await anisad.getListing(sessionData);
        const hasListings = res && res.data.listings.length > 0;

        log({
            function: "getListings",
            input: { sessionData },
            output: { listings: res },
        });

        if (hasListings) {
            $session.ids = getIdsFromListings(res);

            res.data.listings.forEach((listing) => {
                const listingData = listing.realtyDetails;

                const propertyDetails = getPropertyDetails(
                    listing,
                    listingData
                );

                const previewImage = getPreviewImage(listing);

                const description = getDescription(
                    listing,
                    propertyDetails,
                    lang
                );

                response.image(previewImage);
                response.text(description);

                if ($request.channelType === "telegram") {
                    const { buttons } = local(lang);
                    response.inlineURL(
                        buttons.openInBrowser,
                        getLinkToBrowserPage(listing)
                    );
                    response.inlineCallback(
                        buttons.showDetails,
                        `Show details for ${listing.id}`
                    );
                }
            });

            printShowMore(res.data.total, 3, sessionData.skip);
            return true;
        } else {
            printShowMore(res.data.total, 3, sessionData.skip);
            return false;
        }
    } catch (error) {
        log({
            function: "getListings",
            input: { sessionData },
            output: { message: "ERROR" },
        });

        return false;
    }
};

export const printPost = async (listing) => {
    const { lang } = await $session;
    const images = listing.photos?.map((url) =>
        url?.replace("upload", "upload/c_limit,h_3000,w_1920/q_auto")
    );
    const turndownService = new TurndownService();
    const { buttons } = local(lang);

    const get_description = await anisad.getTranslateListing(listing.id, lang);

    const description = turndownService
        .turndown(get_description.description)
        .replaceAll("\\-", "-")
        .replaceAll("\n\n", "\n");

    const title_lang =
        $session.lang === "el"
            ? "cy"
            : $session.lang === "uk"
            ? "ua"
            : $session.lang || "en";

    const title = listing.title[title_lang];

    if ($request.channelType === "telegram") {
        response.imagesTG(images);
    } else {
        response.images(images);
    }

    const header = `*${title}*\n*€${listing.price}*`;

    response.text(header);

    if ($request.channelType === "telegram") {
        response.channel([
            {
                method: "sendMessage",
                body: {
                    text: description,
                    parse_mode: "Markdown",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: buttons.openInBrowser,
                                    web_app: {
                                        url: getLinkToBrowserPage(listing),
                                    },
                                },
                            ],
                            [
                                {
                                    text: buttons.showOnMap,
                                    web_app: {
                                        url: getLinkToMap(listing),
                                    },
                                },
                            ],
                            [
                                {
                                    text: buttons.sellerContacts,
                                    callback_data: `Seller Contacts ${listing.id}`,
                                },
                            ],
                        ],
                    },
                },
            },
        ]);
    } else {
        response.text(description);
        const linksText =
            `[${buttons.openInBrowser}](${getLinkToBrowserPage(listing)}) \n` +
            `[${buttons.showOnMap}](${getLinkToMap(listing)})`;
        response.text(linksText);
        response.buttons([buttons.sellerContacts]);
    }

    log({
        function: "printPost",
        input: { listing },
        output: { header, description },
    });
};

export const printSellerInfo = async (data) => {
    const { lang } = await $session;
    const description = `*${data.firstName} ${data.lastName}*`;

    log({
        function: "printSellerInfo",
        input: { data },
        output: { description },
    });

    response.channel([
        {
            method: "sendMessage",
            body: {
                text: description,
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        ...(data.phoneNumber
                            ? [
                                  [
                                      {
                                          text: `📞 ${
                                              local(lang).seller.phone
                                          }`,
                                          copy_text: {
                                              text: `${data.phoneNumber}`,
                                          },
                                      },
                                  ],
                              ]
                            : []),
                        ...(data.email
                            ? [
                                  [
                                      {
                                          text: `✉️ ${
                                              local(lang).seller.email
                                          }`,
                                          copy_text: {
                                              text: `${data.email}`,
                                          },
                                      },
                                  ],
                              ]
                            : []),
                        ...(data.seller.webSite
                            ? [
                                  [
                                      {
                                          text: `🌐 ${local(lang).seller.site}`,
                                          web_app: {
                                              url: `${data.seller.webSite}`,
                                          },
                                      },
                                  ],
                              ]
                            : []),
                        ...(data.seller.viber
                            ? [
                                  [
                                      {
                                          text: `Viber`,
                                          copy_text: {
                                              text: `${data.seller.viber}`,
                                          },
                                      },
                                  ],
                              ]
                            : []),
                        ...(data.seller.whatsUp
                            ? [
                                  [
                                      {
                                          text: `WhatsUp`,
                                          copy_text: {
                                              text: `${data.seller.whatsUp}`,
                                          },
                                      },
                                  ],
                              ]
                            : []),
                    ],
                },
            },
        },
    ]);
};

export const getListingById = async (id) => {
    const { lang } = await $session;
    try {
        const { data: listing } = await anisad.getListingById(id);

        await anisad.postHistory(`${await $request.channelUserId}`, {
            type: "LISTING",
            value: `${id}`,
        });

        if (listing) {
            await printPost(listing);
            $session.seller = id;
        }

        log({
            function: "getListingById",
            input: { id },
        });
    } catch (error) {
        log({
            function: "getListingById",
            input: { id },
            output: { message: "ERROR" },
        });
        response.text(local(lang).fetchErrors.listing);
        return false;
    }
};

export const getSeller = async () => {
    const { lang, seller: sellerId } = $session;

    try {
        const { data: seller } = await anisad.getSellerById(sellerId);

        if (seller) {
            await printSellerInfo(seller);
        }

        log({
            function: "getSeller",
            input: { sellerId },
            output: { seller },
        });
    } catch (error) {
        response.text(local(lang).fetchErrors.seller);

        log({
            function: "getSeller",
            input: { sellerId },
            output: { message: "ERROR" },
        });

        return false;
    }
};

export const getFiltersInfo = async () => {
    const lastTransition = findLastNonSwitchState($session.transitionsHistory);
    const { state: lastState } = lastTransition;
    let isEdit = false;
    if (lastState === "/DisplayResult/FiltersInfo" && $session.filters.param) {
        isEdit = true;
        let param = await $session.filters.param;

        const clearParam = async (param_) => {
            $session.data[`${param_}From`] = Array.isArray(
                await $session.data[`${param_}From`]
            )
                ? []
                : null;
            $session.data[`${param_}To`] = Array.isArray(
                await $session.data[`${param_}To`]
            )
                ? []
                : null;
        };

        if (
            [
                "coverageRatio",
                "density",
                "floorArea",
                "plotArea",
                "price",
                "residentialFloors",
                "yearOfConstruction",
            ].includes(param)
        ) {
            await clearParam(param);
        } else if (param === "location") {
            $session.data.districtId = null;
            $session.data.cityId = null;
            $session.data.countryId = null;
            $session.location = {};
        } else {
            $session.data[param] = Array.isArray(await $session.data[param])
                ? []
                : null;
        }
    }

    const { data, location, lang } = await $session;
    const {
        airConditioning, //AirConditioningEnum[],
        alarmSystem, //boolean[],
        bathroomNumbers, //Array<number | string>,
        bedrooms, //Array<number | string>,
        buildingConditions, //BuildingConditionEnum[],
        companyName, //string,
        coverageRatioFrom, //number,
        coverageRatioTo, //number,
        densityFrom, //number,
        densityTo, //number,
        electricity, //boolean[],
        energyEfficiency, //EnergyEfficiencyEnum[],
        fireplace, //boolean[],
        floorAreaFrom, //number,
        floorAreaTo, //number,
        furnishing, //FurnishingEnum[],
        gas, //boolean[],
        heating, //HeatingEnum[],
        infrastructureAmenity, //InfrastructureAmenitiesV2Enum[],
        internet, //InternetEnum[],
        listingType, //ListingTypeEnum,
        locationFeatures, //LocationFeaturesEnum[],
        parking, //boolean[],
        pentHouse, //boolean[],
        plotAreaFrom, //number,
        plotAreaTo, //number,
        priceFrom, //number,
        priceTo, //number,
        propertyStatus, //PropertyStatusEnum[],
        propertyTypes, //PropertyTypeEnum[],
        repairAmenity, //RepairAmenitiesV2Enum[],
        residentialFloorsFrom, //number,
        residentialFloorsTo, //number,
        sewageSystem, //SewageSystemEnum[],
        swimmingPool, //boolean[],
        waterHeating, //WaterHeatingEnum[],
        water, //WaterEnum[],
        yearOfConstructionFrom, //number,
        yearOfConstructionTo, //number,
    } = data;

    // additionalAmenity?: AdditionalAmenitiesV2Enum[];
    // airConditioning?: AirConditioningEnum[];
    // alarmSystem?: boolean[];
    // appliances?: boolean[];
    // balcony?: boolean[];
    // bathroom?: boolean[];
    // bathroomBoolean?: boolean[];
    // bathroomNumbers: Array<number | string>;
    // bathroomsFrom: number;
    // bathroomsTo: number;
    // bedrooms: Array<number | string>;
    // bedroomsFrom?: number;
    // bedroomsTo?: number;
    // bedsFrom?: number;
    // bedsTo?: number;
    // buildingConditions?: BuildingConditionEnum[];
    // category?: ListingCategoryEnum[];
    // cityId?: number;
    // cityName?: string;
    // companyName?: string;
    // condition?: ConditionEnum[];
    // countryId?: number;
    // coverageRatioFrom: number;
    // coverageRatioTo: number;
    // densityFrom: number;
    // densityTo: number;
    // districtId?: number;
    // districtIdFrom?: number;
    // districtIdTo?: number;
    // districtName?: string;
    // electricity?: boolean[];
    // energyEfficiency?: EnergyEfficiencyEnum[];
    // excludeCityId: number;
    // excludeIds: number[];
    // fireplace?: boolean[];
    // floorAreaFrom?: number;
    // floorAreaTo?: number;
    // floorNumberFrom?: number;
    // floorNumberTo?: number;
    // furnishing?: FurnishingEnum[];
    // gas?: boolean[];
    // heating?: HeatingEnum[];
    // infrastructureAmenity?: InfrastructureAmenitiesV2Enum[];
    // internet?: InternetEnum[];
    // isIncludeCollapsing?: boolean;
    // isOnlyTop?: boolean;
    // isOnlyVia?: boolean;
    // isOrderByTop?: boolean;
    // isOrderByVia?: boolean;
    // isOrderRandom?: boolean;
    // kitchen?: boolean[];
    // latitudeFrom: number;
    // latitudeTo: number;
    // listingType?: ListingTypeEnum;
    // locationFeatures?: LocationFeaturesEnum[];
    // longitudeFrom: number;
    // longitudeTo: number;
    // numberOfOwnersFrom: number;
    // numberOfOwnersTo: number;
    // parentId?: Array<string>;
    // parking?: boolean[];
    // pentHouse?: boolean[];
    // petFriendly?: boolean[];
    // plotAreaFrom?: number;
    // plotAreaTo?: number;
    // priceFrom?: number;
    // priceTo?: number;
    // propertyStatus?: PropertyStatusEnum[];
    // propertyTypes?: PropertyTypeEnum[];
    // proposalTypes?: ProposalTypeEnum[];
    // realEstateReferenceNumberFrom: number;
    // realEstateReferenceNumberTo: number;
    // repair?: RepairEnum[];
    // repairAmenity?: RepairAmenitiesV2Enum[];
    // residentialFloorsFrom?: number;
    // residentialFloorsTo?: number;
    // rooms?: RoomsEnum[];
    // sellerIds: number[];
    // sewageSystem?: SewageSystemEnum[];
    // sewageSystemBoolean?: boolean[];
    // sleepingPlacesFrom?: number;
    // sleepingPlacesTo?: number;
    // sort: ListingSearchOrderEnum = ListingSearchOrderEnum.NEWEST;
    // swimmingPool?: boolean[];
    // television?: boolean[];
    // updatedDateFrom?: Date;
    // updatedDateTo?: Date;
    // ventilation?: VentilationEnum[];
    // water?: WaterEnum[];
    // waterHeating?: WaterHeatingEnum[];
    // withoutSold?: boolean;
    // yearOfConstructionFrom: number;
    // yearOfConstructionTo: number;
    // yearsOwnedFrom: number;
    // yearsOwnedTo: number;

    const {
        airConditioning: tAirConditioning, //value
        alarmSystem: tAlarmSystem,
        area: tArea,
        balcony: tBalcony,
        bathrooms: tBathrooms,
        bedrooms: tBedrooms,
        buildigConditions: tBuildingConditions, //value
        coverageRatio: tCoverageRatio,
        density: tDensity,
        electricity: tElectricity,
        floorArea: tFloorArea,
        furnishing: tFurnishing, //value
        gas: tGas,
        heating: tHeating, //value
        infrastructureAmenities: tInfrastructureAmenities, //value
        internet: tInternet, //value
        kitchen: tKitchen,
        parking: tParking,
        repairAmenities: tRepairAmenities, //value
        residentialFloors: tResidentialFloors,
        sewageSystem: tSewageSystem,
        television: tTelevision,
        water: tWater,
        waterHeating: tWaterHeating, //value
        location: tLocation,
        locationFeatures: tLocationFeatures, //value
        swimmingPool: tSwimmingPool,
        price: tPrice, //value
        listingType: tListingType, //value
        propertyType: tPropertyType, //value
        propertyStatus: tPropertyStatus, //value
        yearOfConstruction: tYearOfConstruction,
    } = local(lang).property;

    const filtersText = local(lang).general.filters + ":\n";

    const filters_property = {
        /**
         * Конфигурация для конкретной кнопки.
         * @property {Object} <key>
         * @property {string} [<key>.text] - Локализованный текст для кнопки.
         * @property {string | null} [<key>.info] - Дополнительная информация о кнопке. Может быть `null`, если
         * подробности отсутствуют.
         */
        propertyTypes: {
            text: tPropertyType.value,
            info: propertyTypes.length
                ? `*${tPropertyType.value}*: ${propertyTypes
                      .map((type) => tPropertyType[type])
                      .join(", ")}`
                : null,
        },
        listingType: {
            text: tListingType.value,
            info: listingType
                ? `*${tListingType.value}*: ${tListingType[listingType]}`
                : null,
        },
        price: {
            text: tPrice.budget,
            info:
                priceFrom || priceTo
                    ? `*${tPrice.budget}*: ${priceFrom || "0"} - ${
                          priceTo || ""
                      }`
                    : null,
        },
        bedrooms: {
            text: tBedrooms,
            info: bedrooms.length
                ? `*${tBedrooms}*: ${bedrooms.join(", ")}`
                : null,
        },
        bathroomNumbers: {
            text: tBathrooms,
            info: bathroomNumbers.length
                ? `*${tBathrooms}*: ${bathroomNumbers.join(", ")}`
                : null,
        },
        yearOfConstruction: {
            text: tYearOfConstruction,
            info: yearOfConstructionFrom
                ? `*${tYearOfConstruction}*: ${yearOfConstructionFrom}`
                : null,
        },
        location: {
            text: tLocation,
            info:
                JSON.stringify(location || {}) !== "{}"
                    ? location.cityNameEn
                        ? `*${tLocation}*: ${location.cityNameEn}, ${location.countryNameEn}`
                        : `*${tLocation}*: ${location.countryNameEn}`
                    : null,
        },
        buildingConditions: {
            text: tBuildingConditions.value,
            info: buildingConditions.length
                ? `*${tBuildingConditions.value}*: ${buildingConditions
                      .map((type) => tBuildingConditions[type])
                      .join(", ")}`
                : null,
        },
        propertyStatus: {
            text: tPropertyStatus.value,
            info: propertyStatus.length
                ? `*${tPropertyStatus.value}*: ${propertyStatus
                      .map((type) => tPropertyStatus[type])
                      .join(", ")}`
                : null,
        },
        airConditioning: {
            text: tAirConditioning.value,
            info: airConditioning.length
                ? `*${tAirConditioning.value}*: ${airConditioning
                      .map((type) => tAirConditioning[type])
                      .join(", ")}`
                : null,
        },
        alarmSystem: {
            text: tAlarmSystem,
            info: alarmSystem.length
                ? `*${tAlarmSystem}*: ${alarmSystem[0] ? "+" : "-"}`
                : null,
        },
        coverageRatio: {
            text: tCoverageRatio,
            info:
                coverageRatioFrom || coverageRatioTo
                    ? `*${tCoverageRatio}*: ${coverageRatioFrom || "0"} - ${
                          coverageRatioTo || ""
                      }`
                    : null,
        },
        density: {
            text: tDensity,
            info:
                densityFrom || densityTo
                    ? `*${tDensity}*: ${densityFrom || "0"} - ${
                          densityTo || ""
                      }`
                    : null,
        },
        electricity: {
            text: tElectricity,
            info: electricity.length
                ? `*${tElectricity}*: ${electricity[0] ? "+" : "-"}`
                : null,
        },
        floorArea: {
            text: tArea,
            info:
                floorAreaFrom || floorAreaTo
                    ? `*${tArea}*: ${floorAreaFrom || "0"} ${
                          `- ${floorAreaTo}` || ""
                      }`
                    : null,
        },
        furnishing: {
            text: tFurnishing.value,
            info: furnishing.length
                ? `*${tFurnishing.value}*: ${furnishing
                      .map((type) => tFurnishing[type])
                      .join(", ")}`
                : null,
        },
        heating: {
            text: tHeating.value,
            info: heating.length
                ? `*${tHeating.value}*: ${heating
                      .map((type) => tHeating[type])
                      .join(", ")}`
                : null,
        },
        infrastructureAmenity: {
            text: tInfrastructureAmenities.value,
            info: infrastructureAmenity.length
                ? `*${tInfrastructureAmenities.value}*: ${infrastructureAmenity
                      .map((type) => tInfrastructureAmenities[type])
                      .join(", ")}`
                : null,
        },
        internet: {
            text: tInternet.value,
            info: internet.length
                ? `*${tInternet.value}*: ${internet
                      .map((type) => tInternet[type])
                      .join(", ")}`
                : null,
        },
        locationFeatures: {
            text: tLocationFeatures.value,
            info: locationFeatures.length
                ? `*${tLocationFeatures.value}*: ${locationFeatures
                      .map((type) => tLocationFeatures[type])
                      .join(", ")}`
                : null,
        },
        parking: {
            text: tParking,
            info: parking.length
                ? `*${tParking}*: ${parking[0] ? "+" : "-"}`
                : null,
        },
        repairAmenity: {
            text: tRepairAmenities.value,
            info: repairAmenity.length
                ? `*${tRepairAmenities.value}*: ${repairAmenity
                      .map((type) => tRepairAmenities[type])
                      .join(", ")}`
                : null,
        },
        residentialFloors: {
            text: tResidentialFloors,
            info:
                residentialFloorsFrom || residentialFloorsTo
                    ? `*${tResidentialFloors}*: ${
                          residentialFloorsFrom || "0"
                      } - ${residentialFloorsTo || ""}`
                    : null,
        },
        sewageSystem: {
            text: tSewageSystem,
            info: sewageSystem.length
                ? `*${tSewageSystem}*: ${sewageSystem[0] ? "+" : "-"}`
                : null,
        },
        swimmingPool: {
            text: tSwimmingPool,
            info: swimmingPool.length
                ? `*${tSwimmingPool}*: ${swimmingPool[0] ? "+" : "-"}`
                : null,
        },
        waterHeating: {
            text: tWaterHeating.value,
            info: waterHeating.length
                ? `*${tWaterHeating.value}*: ${waterHeating
                      .map((type) => tWaterHeating[type])
                      .join(", ")}`
                : null,
        },
    };

    const filters = Object.entries(filters_property)
        .map(([key, { info }]) => info)
        .filter(Boolean)
        .join("\n");

    const buttons = Object.entries(filters_property).map(
        ([key, { text, info }]) => {
            if (info)
                return {
                    key,
                    text,
                };
        }
    );

    if (isEdit) {
        const reply = {
            body: {
                text: `${filtersText}${filters}`,
                parse_mode: "Markdown",
                message_id: $session.filters.messageId,
                reply_markup: {
                    inline_keyboard: buttons.filter(Boolean).map((value) => [
                        {
                            text: `${value.text} ❌`,
                            callback_data: `Clear parament ${value.key}`,
                        },
                    ]),
                },
            },
            method: "editMessageText",
        };

        response.channel([reply]);
    } else {
        response.text(`${filtersText}${filters}`);
        buttons.map((value) => {
            if (value)
                return response.inlineCallback(
                    `${value.text} ❌`,
                    `Clear parament ${value.key}`
                );
        });
        response.text(local(lang).info.continueSearch);
        response.buttons([local(lang).buttons.continueSearch]);
    }

    log({
        function: "getFiltersInfo",
        input: { $session },
        output: { description: `${filtersText}${filters}` },
    });

    $session.filters = {
        messageId: null,
        param: null,
    };
};

export function arrayСomparison(arr1, arr2) {
    return (
        arr1.length === arr2.length &&
        arr1.every((value) => arr2.includes(value))
    );
}

export function copyObjectWithoutFields(source, fieldsToExclude) {
    const result = {};
    for (let key in source) {
        if (!fieldsToExclude.includes(key)) {
            result[key] = source[key];
        }
    }
    return result;
}

export const printHelpText = () => {
    const { lang } = $session;
    const texts = local(lang).help;

    texts.forEach((text) => {
        response.text(text);
    });
};

/** Меняет язык интерфейса.
 * @param {string} code - Код языка, на который нужно переключиться. */
export const switchLanguage = (code) => {
    $session.lang = code;
};

export function findLastNonSwitchState(transitions) {
    if (!Array.isArray(transitions)) return null;

    for (let i = transitions.length - 1; i >= 0; i--) {
        if (
            transitions[i].state !== "/SwitchInterfaceLanguage" &&
            transitions[i].state !== "/Preprocess" &&
            transitions[i].state !== "/Loader"
        ) {
            return transitions[i];
        }
    }
    return null;
}

export default {
    session,
    initSession,
    getCityInfo,
    getListings,
    getListingById,
    getSeller,
    arrayСomparison,
    copyObjectWithoutFields,
    printHelpText,
    getFiltersInfo,
};
