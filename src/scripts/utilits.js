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
                        listing.id
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
    const { data } = $session;
    const {
        propertyTypes,
        listingType,
        priceFrom,
        priceTo,
        plotAreaTo,
        plotAreaFrom,
        bedroomsFrom,
        bedroomsTo,
        densityFrom,
        densityTo,
        coverageRatioTo,
        coverageRatioFrom,
        residentialFloorsTo,
        residentialFloorsFrom,
        floorAreaFrom,
        floorAreaTo,
        water,
        sewageSystemBoolean,
        bathroomBoolean,
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
        infrastructureApartmentAmenity,
        infrastructurePlotAmenity,
        infrastructureCommerceAmenity,
        cityId,
    } = data;

    const filters =
        `${
            propertyTypes.length
                ? `Property types: ${propertyTypes.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            listingType ? `Listing type: ${listingType.toLowerCase()} \n` : ""
        }` +
        `${
            priceFrom !== null || priceTo !== null
                ? `Budget: ${priceFrom !== null ? `from ${priceFrom}` : ""}${
                      priceFrom !== null && priceTo !== null ? " to " : ""
                  }${priceTo !== null ? `up to ${priceTo}` : ""} \n`
                : ""
        }` +
        `${
            plotAreaFrom !== null || plotAreaTo !== null
                ? `Plot area: ${
                      plotAreaFrom !== null ? `from ${plotAreaFrom}` : ""
                  }${
                      plotAreaFrom !== null && plotAreaTo !== null ? " to " : ""
                  }${plotAreaTo !== null ? `up to ${plotAreaTo}` : ""} \n`
                : ""
        }` +
        `${
            bedroomsFrom !== null || bedroomsTo !== null
                ? `Bedrooms: ${
                      bedroomsFrom !== null ? `from ${bedroomsFrom}` : ""
                  }${
                      bedroomsFrom !== null && bedroomsTo !== null ? " to " : ""
                  }${bedroomsTo !== null ? `up to ${bedroomsTo}` : ""} \n`
                : ""
        }` +
        `${
            densityFrom !== null || densityTo !== null
                ? `Density: ${
                      densityFrom !== null ? `from ${densityFrom}` : ""
                  }${densityFrom !== null && densityTo !== null ? " to " : ""}${
                      densityTo !== null ? `up to ${densityTo}` : ""
                  } \n`
                : ""
        }` +
        `${
            coverageRatioFrom !== null || coverageRatioTo !== null
                ? `Coverage ratio: ${
                      coverageRatioFrom !== null
                          ? `from ${coverageRatioFrom}`
                          : ""
                  }${
                      coverageRatioFrom !== null && coverageRatioTo !== null
                          ? " to "
                          : ""
                  }${
                      coverageRatioTo !== null ? `up to ${coverageRatioTo}` : ""
                  } \n`
                : ""
        }` +
        `${
            residentialFloorsFrom !== null || residentialFloorsTo !== null
                ? `Residential floors: ${
                      residentialFloorsFrom !== null
                          ? `from ${residentialFloorsFrom}`
                          : ""
                  }${
                      residentialFloorsFrom !== null &&
                      residentialFloorsTo !== null
                          ? " to "
                          : ""
                  }${
                      residentialFloorsTo !== null
                          ? `up to ${residentialFloorsTo}`
                          : ""
                  } \n`
                : ""
        }` +
        // `${yearOfConstructionFrom !== null || yearOfConstructionTo !== null ? `Year of construction: ${yearOfConstructionFrom !== null ? `from ${yearOfConstructionFrom}` : ''}${yearOfConstructionFrom !== null && yearOfConstructionTo !== null ? ' to ' : ''}${yearOfConstructionTo !== null ? `up to ${yearOfConstructionTo}` : ''} \n` : ''}` +
        `${
            floorAreaFrom !== null || floorAreaTo !== null
                ? `Floor area: ${
                      floorAreaFrom !== null ? `from ${floorAreaFrom}` : ""
                  }${
                      floorAreaFrom !== null && floorAreaTo !== null
                          ? " to "
                          : ""
                  }${floorAreaTo !== null ? `up to ${floorAreaTo}` : ""} \n`
                : ""
        }` +
        `${water.length ? `Water: ${water.join(", ").toLowerCase()} \n` : ""}` +
        `${
            sewageSystemBoolean.length
                ? `Sewage system: ${sewageSystemBoolean
                      .join(", ")
                      .toLowerCase()} \n`
                : ""
        }` +
        `${
            buildingConditions.length
                ? `Building conditions: ${buildingConditions
                      .join(", ")
                      .toLowerCase()} \n`
                : ""
        }` +
        `${
            furnishing.length
                ? `Furnishing: ${furnishing.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            repair.length ? `Repair: ${repair.join(", ").toLowerCase()} \n` : ""
        }` +
        `${
            alarmSystem.length
                ? `Alarm system: ${alarmSystem.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            condition.length
                ? `Condition: ${condition.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            parking.length
                ? `Parking: ${parking.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            electricity.length
                ? `Electricity: ${electricity.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${gas.length ? `Gas: ${gas.join(", ").toLowerCase()} \n` : ""}` +
        `${
            airConditioning.length
                ? `Air conditioning: ${airConditioning
                      .join(", ")
                      .toLowerCase()} \n`
                : ""
        }` +
        `${
            heating.length
                ? `Heating: ${heating.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            waterHeating.length
                ? `Water heating: ${waterHeating.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            kitchen.length
                ? `Kitchen: ${kitchen.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            balcony.length
                ? `Balcony: ${balcony.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            television.length
                ? `Television: ${television.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            internet.length
                ? `Internet: ${internet.join(", ").toLowerCase()} \n`
                : ""
        }` +
        `${
            infrastructureApartmentAmenity.length
                ? `Infrastructure apartment amenity: ${infrastructureApartmentAmenity
                      .join(", ")
                      .toLowerCase()} \n`
                : ""
        }` +
        `${
            infrastructurePlotAmenity.length
                ? `Infrastructure plot amenity: ${infrastructurePlotAmenity
                      .join(", ")
                      .toLowerCase()} \n`
                : ""
        }` +
        `${
            infrastructureCommerceAmenity.length
                ? `Infrastructure commerce amenity: ${infrastructureCommerceAmenity
                      .join(", ")
                      .toLowerCase()} \n`
                : ""
        }` +
        `${
            $session.params.location.name !== null
                ? `Location: ${$session.params.location.name}, ${$session.params.location.country} \n`
                : ""
        }`;

    $reactions.answer(filters);
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
