import api from "./api.js";
import TurndownService from "turndown";
import { API__LINK, VERSION } from "./config.js";
import local from "./local/local.js";
import response from "./response.js";

import "./typeDoc/session.js";
import "./typeDoc/reactions.js";
import "./typeDoc/states.js";

export function session() {
    $session.data = {
        skip: 0,
        take: 3,
        propertyTypes: [""],
        listingType: "",
        sort: "NEWEST",
        rooms: [],
        companyName: "",
        priceFrom: null,
        priceTo: null,
        plotAreaTo: null,
        plotAreaFrom: null,
        bedroomsFrom: null,
        bedroomsTo: null,
        densityFrom: null,
        densityTo: null,
        coverageRatioTo: null,
        coverageRatioFrom: null,
        residentialFloorsTo: null,
        residentialFloorsFrom: null,
        yearOfConstructionFrom: null,
        yearOfConstructionTo: null,
        floorAreaFrom: null,
        floorAreaTo: null,
        water: [],
        sewageSystemBoolean: [],
        bathroomBoolean: [],
        buildingConditions: [],
        furnishing: [],
        repair: [],
        alarmSystem: [],
        condition: [],
        parking: [],
        electricity: [],
        gas: [],
        airConditioning: [],
        heating: [],
        fireplace: null,
        waterHeating: [],
        kitchen: [],
        balcony: [],
        television: [],
        internet: [],
        infrastructureApartmentAmenity: [],
        infrastructurePlotAmenity: [],
        infrastructureCommerceAmenity: [],
        withoutSold: true,
        cityId: null,
    };

    $session.info = {
        city: null,
        country: null,
        property: null,
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
};

export const getCityInfo = async (city, country) => {
    try {
        const resC = await api.getCitiesInfo(city, country);
        if (resC) {
            const filteredCities = resC.data.filter(
                (city) =>
                    city.countryNameEn.toLowerCase() === country.toLowerCase()
            );
            if (filteredCities.length > 0) {
                if (
                    filteredCities[0].districtName == filteredCities[0].cityName
                ) {
                    $session.data.districtId = filteredCities[0].districtId;
                    delete $session.data.cityId;
                } else {
                    $session.data.cityId = filteredCities[0].cityId;
                    delete $session.data.districtId;
                }
                return filteredCities[0];
            } else {
                const { lang } = $session;
                response.randomText(
                    local(lang).fetchErrors.notFoundCityInCounty(country)
                );
                return false;
            }
        }
    } catch (error) {
        // $reactions.answer(
        //   "*City* Something's broken, please try again later. Sorry"
        // );
        return false;
    }
};

export const linkToBrowserPage = (data) => {
    return `${API__LINK}/${data.seo.listingType}/${data.seo.countryName}/${data.seo.cityName}/${data.seo.category}/${data.seo.propertyType}/${data.id}`;
};

export const linkToMap = (data) => {
    return `https://www.google.com/maps?q=${data.location?.latitude},${data.location?.longitude}`;
};

export const getListingData = (listing) => {
    if (listing.apartmentSell) return listing.apartmentSell;
    else if (listing.apartmentRent) return listing.apartmentRent;
    else if (listing.houseSell) return listing.houseSell;
    else if (listing.houseRent) return listing.houseRent;
    else if (listing.commerceSell) return listing.commerceSell;
    else if (listing.commerceRent) return listing.commerceRent;
    else if (listing.plotSell) return listing.plotSell;
    else if (listing.plotRent) return listing.plotRent;
};

export const postJSON = (object) => {
    $reactions.answer(JSON.stringify(object));
};

export function getIdsFromListings(res) {
    if (res && res.data && Array.isArray(res.data.listings)) {
        return res.data.listings.map((listing) => listing.id);
    } else {
        return [];
    }
}

export const hasNextPage = (total, take, skip) => {
    const displayed = skip + take;
    return displayed < total;
};

export const printShowMore = (total, take, skip) => {
    const hastNext = hasNextPage(total, take, skip);
    const { lang } = $session;

    if ($request.channelType === "telegram") {
        const buttons = hastNext
            ? [local(lang).buttons.showMore, local(lang).buttons.clearFilters]
            : [local(lang).buttons.clearFilters];

        if (hastNext) {
            response.text(local(lang).info.showMoreResultsAndReset);
        } else {
            response.text(local(lang).info.noMoreResultsReset);
        }

        response.buttons(buttons);
    } else if (hastNext) {
        response.text(local(lang).info.showMoreResults);
    } else {
        response.text(local(lang).info.noMoreResultsResetCommand);
    }
};

export const getLocationProperty = (listingLocation) => {
    if (!listingLocation) return "";

    const { city } = listingLocation;
    const { district, country } = city;

    let location =
        city.name !== district.name
            ? `${city.name}, ${district.name}`
            : `${city.name}`;

    return `${location}, ${country.name} \n`;
};

export const getListings = async (sessionData) => {
    const { lang } = $session;
    try {
        sessionData.take = 3;
        //$reactions.answer(JSON.stringify(sessionData));
        const res = await api.getListing(sessionData);
        if (res && res.data.listings.length > 0) {
            $session.ids = getIdsFromListings(res);
            res.data.listings.map((listing, idx) => {
                const listingData = getListingData(listing);
                const propertyDetails =
                    `${
                        listing.listingType !== null
                            ? `${listing.listingType}`
                            : ""
                    } ${
                        listing.price !== null
                            ? `\*${listing.price} €\* \n`
                            : ""
                    }` +
                    `${getLocationProperty(listing.location)}` +
                    `${
                        listingData.floorArea || listingData.plotArea
                            ? `- Property area: \*${
                                  listingData.floorArea || listingData.plotArea
                              }m²\* \n`
                            : ""
                    }` +
                    `${
                        listingData.bedrooms !== null &&
                        listingData.bedrooms !== undefined
                            ? `- Bedrooms: ${listingData.bedrooms} \n`
                            : ""
                    }` +
                    `${
                        listingData.furnishing !== null &&
                        $session.data.furnishing.length
                            ? `- Furnishing: \*${listingData.furnishing}\* \n`
                            : ""
                    }` +
                    `${
                        listingData.balcony !== null &&
                        $session.data.balcony.length
                            ? `- Balcony: ${listingData.balcony ? "+" : "-"} \n`
                            : ""
                    }` +
                    `${
                        listingData.bathrooms !== null && false
                            ? `- Bathrooms: ${listingData.bathrooms} \n`
                            : ""
                    }` +
                    `${
                        listingData.parking !== null &&
                        $session.data.parking.length
                            ? `- Parking: ${listingData.parking ? "+" : "-"} \n`
                            : ""
                    }` +
                    `${
                        listingData.electricity !== null &&
                        $session.data.electricity.length
                            ? `- Electricity: ${
                                  listingData.electricity ? "+" : "-"
                              } \n`
                            : ""
                    }` +
                    `${
                        listingData.television !== null &&
                        $session.data.television.length
                            ? `- Television: ${
                                  listingData.television ? "+" : "-"
                              } \n`
                            : ""
                    }` +
                    `${
                        listingData.alarmSystem !== null &&
                        $session.data.alarmSystem.length
                            ? `- Alarm system: ${
                                  listingData.alarmSystem ? "+" : "-"
                              } \n`
                            : ""
                    }` +
                    `${
                        listingData.gas !== null && $session.data.gas.length
                            ? `- Gas: ${listingData.gas ? "+" : "-"} \n`
                            : ""
                    }` +
                    `${
                        listingData.heating !== null &&
                        $session.data.heating.length
                            ? `- Heating: ${listingData.heating} \n`
                            : ""
                    }` +
                    `${
                        listingData.waterHeating !== null &&
                        $session.data.waterHeating.length
                            ? `- Water heating: ${listingData.waterHeating} \n`
                            : ""
                    }` +
                    `${
                        listingData.internet !== null &&
                        $session.data.internet.length
                            ? `- Internet: ${listingData.internet} \n`
                            : ""
                    }` +
                    `${
                        listingData.airConditioning !== null &&
                        $session.data.airConditioning.length
                            ? `- Air conditioning: \*${listingData.airConditioning}\* \n`
                            : ""
                    }` +
                    `${
                        listingData.infrastructureAmenity !== null
                            ? `- Infrastructure amenities: ${listingData.infrastructureAmenity
                                  .map((v) =>
                                      v.toLowerCase().replace(/_/g, " ")
                                  )
                                  .join(", ")} \n`
                            : ""
                    }` +
                    `${
                        listingData.repairAmenity !== null &&
                        $session.data.repair.length
                            ? `- Repair amenities: ${listingData.repairAmenity}`
                            : ""
                    }`
                        .split("\n")
                        .filter((line) => line.trim() !== "")
                        .join("\n");

                const image =
                    listing.photos.length !== 0
                        ? listing.photos[0]
                        : "https://dummyimage.com/600x400/000/ffffff&text=without+photo";

                const description =
                    `\*${listing.title.trim()}\* \n` +
                    `\*ID: ${listing.id}\* \n` +
                    `${propertyDetails} \n` +
                    `${
                        $request.channelType === "telegram"
                            ? ""
                            : `[${
                                  local(lang).buttons.openInBrowser
                              }](${linkToBrowserPage(listing)})`
                    }`;

                response.image(image);
                response.text(description);

                if ($request.channelType === "telegram") {
                    response.inlineURL(
                        local(lang).buttons.openInBrowser,
                        `${linkToBrowserPage(listing)}`
                    );
                    response.inlineCallback(
                        local(lang).buttons.showDetails,
                        response.text(listing.id)
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
        response.text(local(lang).fetchErrors.listing);
        return false;
    }
};

export const printPost = (listing) => {
    const { lang } = $session;
    const images = listing.photos.map((image) => image);

    let turndownService = new TurndownService();
    const description = turndownService
        .turndown(listing.description)
        .replaceAll("\\-", "-");

    response.images(images);
    response.text(`\*${listing.title.trim()}\*\n\*€${listing.price}\*`);
    response.text(description, "html");

    if ($request.channelType === "telegram") {
        response.inlineURL(
            local(lang).buttons.openInBrowser,
            `${linkToBrowserPage(listing)}`
        );
        response.inlineURL(
            local(lang).buttons.showOnMap,
            `${linkToMap(listing)}`
        );
        response.inlineCallback(
            local(lang).buttons.sellerContacts,
            `Seller Contacts`
        );
    } else {
        const linksText =
            `[${local(lang).buttons.openInBrowser}](${linkToBrowserPage(
                listing
            )}) \n` +
            `[${local(lang).buttons.showOnMap}](${linkToMap(listing)})`;

        response.text(linksText);
        response.buttons([local(lang).buttons.sellerContacts]);
    }
};

export const printSellerInfo = (seller) => {
    const text =
        `\*${seller.firstName} ${seller.lastName}\* \n` +
        `${seller.email} \n` +
        `${seller.phoneNumber}`;
    response.text(text);
};

export const getListingById = async (id) => {
    const { lang } = $session;
    try {
        const listing = await api.getListingById(id);

        if (listing) {
            printPost(listing.data);
            $session.seller = id;
        }
    } catch (error) {
        response.text(local(lang).fetchErrors.listing);
        return false;
    }
};

export const getSeller = async () => {
    const { lang } = $session;
    try {
        const seller = await api.getSellerById($session.seller);

        if (seller) {
            printSellerInfo(seller.data);
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
    } = data;

    const { city, country } = info;
    response.log({ ...data, ...info });

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
    } = local(lang).property;

    const filters = [
        propertyTypes ? `${propertyTypes}` : null,
        listingType ? `${listingType}` : null,
        priceFrom || priceTo
            ? `${tPrice.value}: ${priceFrom || "0"} - ${priceTo || ""}`
            : null,
        water.length ? `${tWater}: ${water}` : null,
        buildingConditions.length
            ? `${tBuildingConditions}: ${buildingConditions}`
            : null,
        furnishing.length ? `${tFurnishing}: ${furnishing}` : null,
        repair.length ? `${tRepair}: ${repair}` : null,
        alarmSystem.length ? `${tAlarmSystem}: ${alarmSystem}` : null,
        internet.length ? `${tInternet}: ${internet}` : null,
        balcony.length ? `${tBalcony}: ${balcony}` : null,
    ]
        .filter(Boolean)
        .join("\n");

    response.text(filters);
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

    texts.map((text) => {
        response.text(text);
    });
};

/** Меняет язык интерфейса.
 * @param {string} code - Код языка, на который нужно переключиться. */
export const switchLanguage = (code) => {
    $session.lang = code;
};

export function findLastNonSwitchState(transitions) {
    if (!transitions) return null;

    for (let i = transitions.length - 1; i >= 0; i--) {
        if (transitions[i].state !== "/SwitchIntefraceLanguage") {
            return transitions[i];
        }
    }
    return null; // если все элементы "/SwitchIntefraceLanguage"
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
