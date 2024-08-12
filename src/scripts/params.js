import utl from "./utilits.js";
import api from "./api.js";


const getFromIntervalOrNumber = (obj) => {
    let from = 0;
    let to = null;
    
    if (!obj[0].value.from) {
        to = obj[0].value;
    } else {
        if (!obj[0].value.to) {
            from = obj[0].value.from.value;
        } else {
            from = obj[0].value.from.value;
            to = obj[0].value.to.value;
        }
    }

    return {
        from,
        to,
    };
};

const getFromIntervalOrNumberBedrooms = (obj) => {
    let from = 1;
    let to = null;

    if (!obj[0].value.from) {
        to = obj[0].value;
        from = obj[0].value;
    } else {
        if (!obj[0].value.to) {
            from = obj[0].value.from.value;
        } else {
            from = obj[0].value.from.value;
            to = obj[0].value.to.value;
        }
    }

    return {
        from,
        to,
    };
};

const getCity = (obj) => {
    return obj[0].value;
};

const getCountry = (obj) => {
    return obj[0].value;
};

const getProperty = (obj, propertyName) => {
    return obj[0]?.value?.[propertyName] || [];
};

const getInfAmenity = (obj) => {
    return [...new Set(obj.flatMap((item) => item.infra))];
};

const getLocAmenity = (obj) => {
    return [...new Set(obj.flatMap((item) => item.infra))];
};

export const getAllParamsFromTree = async (parseTree) => {
    let filledParams = {};
    //$reactions.answer(JSON.stringify($parseTree));

    if (parseTree.propertyTypes) {
        // filledParams.propertyTypes = parseTree._propertyTypes.estate;
        filledParams.propertyTypes = getProperty(
            parseTree.propertyTypes,
            "estate"
        );
    }

    if (parseTree.bedroom) {
        const bedrooms = getFromIntervalOrNumberBedrooms(parseTree.bedroom);
        //filledParams.bedroomsFrom = bedrooms.from;
        //filledParams.bedroomsTo = bedrooms.to;
        if (bedrooms.from == bedrooms.to) {
            if (typeof bedrooms.from === "string") {
                filledParams.bedrooms = [0];
            } else {
                filledParams.bedrooms = [bedrooms.from];
            }
        } else {
            filledParams.bedrooms = [];
            bedrooms.to = bedrooms.to === null ? 20 : bedrooms.to;
            while (bedrooms.from - 1 != bedrooms.to) {
                filledParams.bedrooms.push(bedrooms.to);
                bedrooms.to -= 1;
            }
        }
    }
    
    if (parseTree.company_name) {
        filledParams.companyName = parseTree.company_name[0].value.company;
    }
    
    if (parseTree.fireplace) {
        filledParams.fireplace = parseTree.fireplace[0].value.fire;
    }

    if (parseTree.price) {
        const price = getFromIntervalOrNumber(parseTree.price);
        filledParams.priceFrom = price.from;
        filledParams.priceTo = price.to;
    }

    if (parseTree.area) {
        const area = getFromIntervalOrNumber(parseTree.area);
        filledParams.areaFrom = area.from;
        filledParams.areaTo = area.to;
    }

    if (parseTree.coverageRatio) {
        const coverageRatio = getFromIntervalOrNumber(parseTree.coverageRatio);
        filledParams.coverageRatioFrom = coverageRatio.from;
        filledParams.coverageRatioTo = coverageRatio.to;
    }

    if (parseTree.density) {
        const density = getFromIntervalOrNumber(parseTree.density);
        filledParams.densityFrom = density.from;
        filledParams.densityTo = density.to;
    }

    if (parseTree.floorNumber) {
        const floorNumber = getFromIntervalOrNumber(parseTree.floorNumber);
        filledParams.floorNumberFrom = floorNumber.from;
        filledParams.floorNumberTo = floorNumber.to;
    }

    if (parseTree.residentialFloors) {
        const residentialFloors = getFromIntervalOrNumber(
            parseTree.residentialFloors
        );
        filledParams.residentialFloorsFrom = residentialFloors.from;
        filledParams.residentialFloorsTo = residentialFloors.to;
    }

    if (parseTree.listingType) {
        // filledParams.listingType = parseTree._listingType.constBuyRent;
        filledParams.listingType = getProperty(
            parseTree.listingType,
            "constBuyRent"
        );
    }

    if (parseTree._kitchen) {
        filledParams.kitchen = parseTree._kitchen.kitchen;
    }

    if (parseTree._balcony) {
        filledParams.balcony = parseTree._balcony.balcony;
    }

    if (parseTree.internet) {
        filledParams.internet = getProperty(parseTree.internet, "internet");
    }

    if (parseTree.alarm) {
        filledParams.alarmSystem = getProperty(parseTree.alarm, "alarm");
    }

    if (parseTree.conditioner_colder) {
        filledParams.airConditioning = getProperty(
            parseTree.conditioner_colder,
            "airConditioning"
        );
    }

    if (parseTree.electricity) {
        filledParams.electricity = getProperty(
            parseTree.electricity,
            "electricity"
        );
    }

    if (parseTree.furniture) {
        filledParams.furnishing = getProperty(parseTree.furniture, "furniture");
    }

    if (parseTree.heater) {
        filledParams.heating = getProperty(parseTree.heater, "heater");
    }

    if (parseTree.parking) {
        filledParams.parking = getProperty(parseTree.parking, "parking");
    }

    if (parseTree.television) {
        filledParams.television = getProperty(parseTree.television, "TV");
    }

    if (parseTree.water_heater) {
        filledParams.waterHeating = getProperty(
            parseTree.water_heater,
            "water"
        );
    }
    
    if (parseTree.country) {
       const countr = await api.getCountriesInfo(
           parseTree.country[0].value.name
           );
       filledParams.countryId = countr.data[0].countryId;
    }

    if (parseTree.location) {
        filledParams.location = getCity(parseTree.location);
    }

    if (parseTree._infrastructure_amenity) {
            filledParams.infAmenity = getInfAmenity(
                parseTree._infrastructure_amenity
            );
    }
    
    if (parseTree._location_features) {
        filledParams.locAmenity = getLocAmenity(
            parseTree._location_features
        );
    }

    if (parseTree._repair) {
        filledParams.repair = parseTree._repair.repair;
    }

    if (parseTree.progress_condition) {
        filledParams.buildingConditions =
            parseTree.progress_condition[0].value.condition;
    }

    if (parseTree.house_condition) {
        filledParams.condition =
            parseTree.house_condition[0].value.house_condition;
    }

    return filledParams;
};

export const processParams = async () => {
    let emptyParams = [];
    let newParams = [];

    if ($session.params.location) {
        if (
            !$session.info.location ||
            $session.info.location.cityNameEn !== $session.params.location.name
        ) {
            const location = await utl.getCityInfo(
                $session.params.location.name,
                $session.params.location.country
            );
            $session.info.location = location;
            newParams.push("Location");
        }
    } else if ($session.params.countryId) {
        newParams.push("Location");
    } else {
        emptyParams.push("Location");
    }
    

    //sale_rent
    if ($session.params.listingType) {
        if ($session.params.listingType !== $session.data.listingType) {
            $session.data.listingType = $session.params.listingType;
            newParams.push("ListingTypes");
        }
    } else emptyParams.push("ListingTypes");

    if ($session.params.propertyTypes) {
        if (
            !utl.arrayСomparison(
                $session.params.propertyTypes,
                $session.data.propertyTypes
            )
        ) {
            $session.data.propertyTypes = $session.params.propertyTypes;
            newParams.push("PropertyTypes");
        }
    } else emptyParams.push("PropertyTypes");

    if ($session.params.priceFrom || $session.params.priceTo) {
        if (
            $session.params.priceFrom !== $session.data.priceFrom ||
            $session.params.priceTo !== $session.data.priceTo
        ) {
            $session.data.priceTo = Number($session.params.priceTo);
            $session.data.priceFrom = Number($session.params.priceFrom);
            newParams.push("Price");
        }
    } else emptyParams.push("Price");

    if ($session.params.infAmenity && !emptyParams.includes("PropertyTypes")) {
        switch ($session.data.propertyTypes[0]) {
            case "APARTMENT":
                $session.data.infrastructureApartmentAmenity.push($session.params.infAmenity[0]);
                break;
            case "DETACHED_HOUSE":
            case "SEMIDETACHED_HOUSE":
            case "VILLA":
                $session.data.infrastructureHouseAmenity.push($session.params.infAmenity[0]);
                break;
            case "COMMERCIAL_PLOT":
            case "RESIDENTIAL_PLOT":
            case "AGRICULTURE_PLOT":
                $session.data.infrastructurePlotAmenity.push($session.params.infAmenity[0]);
                break;
            case "OFFICE":
            case "HOTEL":
            case "MANUFACTURING":
            case "RETAIL_SPACE":
            case "WAREHOUSE":
            case "CAR_PARKING":
                $session.data.infrastructureCommerceAmenity.push($session.params.infAmenity[0]);
                break;
        }
    }
    
    if ($session.params.locAmenity && !emptyParams.includes("PropertyTypes")) {
         switch ($session.data.propertyTypes[0]) {
            case "APARTMENT":
                $session.data.locationFeatures.push($session.params.locAmenity[0]);
                break;
            case "DETACHED_HOUSE":
            case "SEMIDETACHED_HOUSE":
            case "VILLA":
                $session.data.locationFeatures.push($session.params.locAmenity[0]);
                break;
            case "COMMERCIAL_PLOT":
            case "RESIDENTIAL_PLOT":
            case "AGRICULTURE_PLOT":
                $session.data.locationFeatures.push($session.params.locAmenity[0]);
                break;
            case "OFFICE":
            case "HOTEL":
            case "MANUFACTURING":
            case "RETAIL_SPACE":
            case "WAREHOUSE":
            case "CAR_PARKING":
                $session.data.locationFeatures.push($session.params.locAmenity[0]);
                break;
        }
    }

    if (
        ($session.params.areaFrom || $session.params.areaTo) &&
        !emptyParams.includes("PropertyTypes")
    ) {
        switch ($session.data.propertyTypes[0]) {
            case "COMMERCIAL_PLOT":
            case "RESIDENTIAL_PLOT":
            case "AGRICULTURE_PLOT": {
                $session.data.plotAreaFrom = $session.params.areaFrom;
                $session.data.plotAreaTo = $session.params.areaTo;
                break;
            }
            case "OFFICE":
            case "HOTEL":
            case "MANUFACTURING":
            case "RETAIL_SPACE":
            case "WAREHOUSE":
            case "CAR_PARKING": {
                $session.data.floorAreaFrom = $session.params.areaFrom;
                $session.data.floorAreaTo = $session.params.areaTo;
                break;
            }
        }
    }

    return { emptyParams, newParams };
};

export const emptyParamsResult = async (params) => {
    const routes = {
        PropertyTypes: "/Search/InputPropertyTypes",
        Location: "/Search/InputLocation",
        Price: "/Search/InputPrice",
        ListingTypes: "/Search/InputListingTypes",
    };

    for (const param of Object.keys(routes)) {
        if (params.includes(param)) {
            $reactions.transition(routes[param]);
            return;
        }
    }

    if (params.length === 0) {
        return $reactions.transition("/DisplayResults");
    }
};

export const updSessionInfo = async (info, params) => {
    $session.data = { ...info, ...params };
};

export const checkChangePropertyType = async (data, tree) => {
    if (
        JSON.stringify(data.propertyTypes) !=
        JSON.stringify(getProperty(tree.propertyTypes, "estate"))
    ) {
        var listing = data.listingType;
        //var city = $session.info.location;
        var from = data.priceFrom;
        var to = data.priceTo;
        utl.session();
        $session.params.listingType = listing;
        //$session.params.location = city;
        $session.params.priceFrom = from;
        $session.params.priceTo = to;
    }
};

export async function updateSessionParamsAndTransition() {
    const params = await getAllParamsFromTree($parseTree);
    $session.params = { ...$session.params, ...params };
    $reactions.transition("/Search/SwitchParams");
}

export default {
    getAllParamsFromTree,
    processParams,
    emptyParamsResult,
    updSessionInfo,
    checkChangePropertyType,
    updateSessionParamsAndTransition,
};
