import api, { translate } from "./api.js";
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
import "./typeDoc/states.js";

export function session() {
    $session.data = {
        skip: 0,
        take: 3,
        rooms: [],
        listingType: "",
        sort: "BY_INDEX",
        energyEfficiency: [],
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
        fireplace: [],
        floorAreaFrom: null,
        floorAreaTo: null,
        furnishing: [],
        heating: [],
        infrastructureAmenity: [],
        internet: [],
        isIncludeCollapsing: true,
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
        swimmingPool: [],
        water: [],
        withoutSold: true,
        yearOfConstructionFrom: null,
        yearOfConstructionTo: null,
    };

    $session.location = {};

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
};

export const getCityInfo = async (city, country = "cyprus") => {
    log("getCity");
    try {
        const resC = await api.getCitiesInfo(city, country);
        if (!resC) return false;

        const filteredCities = resC.data.filter(
            (city) => city.countryNameEn.toLowerCase() === country.toLowerCase()
        );

        if (filteredCities.length === 0) {
            const { lang } = $session;
            response.randomText(
                local(lang).fetchErrors.notFoundCityInCounty(country)
            );
            return false;
        }

        const [firstCity] = filteredCities;
        if (firstCity.districtName === firstCity.cityName) {
            $session.data.districtId = firstCity.districtId;
            $session.data.cityId = null;
        } else {
            $session.data.cityId = firstCity.cityId;
            $session.data.districtId = null;
        }

        return firstCity;
    } catch (error) {
        // $reactions.answer("*City* Something's broken, please try again later. Sorry");
        return false;
    }
};

export const getListingData = (listing) => {
    const types = [
        "apartmentSell",
        "apartmentRent",
        "houseSell",
        "houseRent",
        "commerceSell",
        "commerceRent",
        "plotSell",
        "plotRent",
    ];

    for (const type of types) {
        if (listing[type]) return listing[type];
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
        ? [local(lang).buttons.showMore, local(lang).buttons.clearFilters]
        : [local(lang).buttons.clearFilters];

    if (isTelegram) {
        response.text(telegramTextMessage);
        response.buttons(telegramButtons);
    } else {
        response.text(textMessage + (hastNext ? "" : "Command"));
    }
};

export const getListings = async (sessionData) => {
    const { lang } = $session;
    sessionData.take = 3;

    // try {
    const res = await api.getListing(sessionData);
    const hasListings = res && res.data.listings.length > 0;

    if (hasListings) {
        $session.ids = getIdsFromListings(res);

        res.data.listings.forEach((listing) => {
            const listingData = getListingData(listing);

            const propertyDetails = getPropertyDetails(listing, listingData);

            const previewImage = getPreviewImage(listing);

            const description = getDescription(listing, propertyDetails, lang);

            response.image(previewImage);
            response.text(description);

            if ($request.channelType === "telegram") {
                const { buttons } = local(lang);
                response.inlineURL(
                    buttons.openInBrowser,
                    getLinkToBrowserPage(listing)
                );
                response.inlineCallback(buttons.showDetails, listing.id);
            }
        });

        printShowMore(res.data.total, 3, sessionData.skip);
        return true;
    } else {
        printShowMore(res.data.total, 3, sessionData.skip);
        return false;
    }
    // } catch (error) {
    //     response.text(local(lang).fetchErrors.listing);
    //     return false;
    // }
};

export const printPost = async (listing) => {
    const { lang } = $session;
    const images = listing.photos;

    const turndownService = new TurndownService();
    let description = turndownService
        .turndown(listing.description)
        .replaceAll("\\-", "-");

    const translate_description = await translate(description, "en");

    if (translate_description.code === 200) {
        description = translate_description.data[0].translations[0].text;
    } else {
        description = translate_description.data.response.translated_text;
    }

    const sendImages = () => {
        if ($request.channelType === "telegram") {
            response.imagesTG(images);
        } else {
            response.images(images);
        }
    };

    const sendButtons = () => {
        const { buttons } = local(lang);
        if ($request.channelType === "telegram") {
            response.inlineURL(
                buttons.openInBrowser,
                getLinkToBrowserPage(listing)
            );
            response.inlineURL(buttons.showOnMap, getLinkToMap(listing));
            response.inlineCallback(buttons.sellerContacts, "Seller Contacts");
        } else {
            const linksText =
                `[${buttons.openInBrowser}](${getLinkToBrowserPage(
                    listing
                )}) \n` + `[${buttons.showOnMap}](${getLinkToMap(listing)})`;
            response.text(linksText);
            response.buttons([buttons.sellerContacts]);
        }
    };

    sendImages();

    const title_lang =
        $session.lang === "el"
            ? "cy"
            : $session.lang === "uk"
            ? "ua"
            : $session.lang || "en";

    response.text(`*${listing.title[title_lang]}*\n*€${listing.price}*`);
    response.text(description, "html");
    sendButtons();
};

export const printSellerInfo = (seller) => {
    const text = `*${seller.firstName} ${seller.lastName}*\n${seller.email}\n${seller.phoneNumber}`;
    response.text(text);
};

export const getListingById = async (id) => {
    const { lang } = $session;
    try {
        const { data: listing } = await api.getListingById(id);

        if (listing) {
            await printPost(listing);
            $session.seller = id;
        }
    } catch (error) {
        response.text(local(lang).fetchErrors.listing);
        return false;
    }
};

export const getSeller = async () => {
    const { lang, seller: sellerId } = $session;

    try {
        const { data: seller } = await api.getSellerById(sellerId);

        if (seller) {
            printSellerInfo(seller);
        }
    } catch (error) {
        response.text(local(lang).fetchErrors.seller);
        return false;
    }
};

export const getFiltersInfo = async () => {
    const { data, info, lang } = $session;
    const {
        propertyTypes,
        listingType,
        priceFrom,
        priceTo,
        water,
        buildingConditions,
        furnishing,
        repair,
        alarmSystem,
        condition,
        parking,
        electricity,
        gas,
        airConditioning,
        heating,
        waterHeating,
        kitchen,
        balcony,
        television,
        internet,
        bedrooms,
        location,
        bathrooms,
    } = data;

    // const { city, country } = info;
    // response.log({ ...data, ...info });

    const {
        propertyType: tPropertyTypes,
        listingType: tListingType,
        price: tPrice,
        water: tWater,
        buildigConditions: tBuildingConditions,
        furnishing: tFurnishing,
        repairAmenities: tRepair,
        alarmSystem: tAlarmSystem,
        internet: tInternet,
        balcony: tBalcony,
        infrastructureAmenities: tIA,
        bedrooms: tBedrooms,
        bathrooms: tBathrooms,
        location: tLocation,
    } = local(lang).property;

    const filters = [
        propertyTypes
            ? `${tPropertyTypes.value}: ${propertyTypes
                  .map((type) => tPropertyTypes[type])
                  .join(", ")}`
            : null,
        listingType
            ? `${tListingType.value}: ${tListingType[listingType]}`
            : null,
        priceFrom || priceTo
            ? `${tPrice.value}: ${priceFrom || "0"} - ${priceTo || ""}`
            : null,
        bedrooms ? `${tBedrooms}: ${bedrooms.join(", ")}` : null,
        bathrooms ? `${tBathrooms}: ${bathrooms.join(", ")}` : null,
        location ? `${tLocation}: ${location.address}` : null,
        buildingConditions.length
            ? `${tBuildingConditions.value}: ${buildingConditions
                  .map((type) => tBuildingConditions[type])
                  .join(", ")}`
            : null,
        // furnishing.length ? `${tFurnishing}: ${furnishing}` : null,
        // repair.length ? `${tRepair}: ${repair}` : null,
        // alarmSystem.length ? `${tAlarmSystem}: ${alarmSystem}` : null,
        // internet.length ? `${tInternet}: ${internet}` : null,
        // balcony.length ? `${tBalcony}: ${balcony}` : null,
    ]
        .filter(Boolean)
        .join("\n");

    const filtersText = local(lang).general.filters + "\n";

    response.text(filtersText + filters);
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
        if (transitions[i].state !== "/SwitchInterfaceLanguage") {
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
