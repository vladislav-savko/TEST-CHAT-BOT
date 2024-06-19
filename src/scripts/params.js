import utl from './utilits.js';
import api from "./api.js";

const getFromIntervalOrNumber = (obj) => {
    let from = 0;
    let to = null;
    
    if (obj[0].value.to) {
        to = obj[0].value.to.value;
        from = obj[0].value.from.value;
    } else {
        to = obj[0].value;
    }
    
    return {
        from,
        to
    }
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
    return [...new Set(obj.flatMap(item => item.infra))];
};

const getAllParamsFromTree = async (parseTree) => {
    let filledParams = {};
    $reactions.answer(JSON.stringify($parseTree));
    
    if (parseTree.bedroom) {
        const bedrooms = getFromIntervalOrNumber(parseTree.bedroom);
        filledParams.bedroomsFrom = bedrooms.from;
        filledParams.bedroomsTo = bedrooms.to;
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
        const residentialFloors = getFromIntervalOrNumber(parseTree.residentialFloors);
        filledParams.residentialFloorsFrom = residentialFloors.from;
        filledParams.residentialFloorsTo = residentialFloors.to;
    }
    
    if (parseTree._listingType) {
        filledParams.listingType = parseTree._listingType.constBuyRent;
    }
    
    if (parseTree._propertyTypes) {
        filledParams.propertyTypes = parseTree._propertyTypes.estate;
    }
    
    if (parseTree._kitchen) {
        filledParams.kitchen = parseTree._kitchen.kitchen;
    }
    
    if (parseTree._balcony) {
        filledParams.balcony = parseTree._balcony.balcony;
    }
    
    if (parseTree.internet) {
        filledParams.internet = getProperty(parseTree.internet, 'internet');
    }
    
    if (parseTree.alarm) {
        filledParams.alarmSystem = getProperty(parseTree.alarm, 'alarm');
    }
    
    if (parseTree.conditioner_colder) {
        filledParams.airConditioning = getProperty(parseTree.conditioner_colder, 'airConditioning');
    }
    
    if (parseTree.electricity) {
        filledParams.electricity = getProperty(parseTree.electricity, 'electricity');
    }
    
    if (parseTree.furniture) {
        filledParams.furnishing = getProperty(parseTree.furniture, 'furniture');
    }
    
    if (parseTree.heater) {
        filledParams.heating = getProperty(parseTree.heater, 'heater');
    }
    
    if (parseTree.parking) {
        filledParams.parking = getProperty(parseTree.parking, 'parking');
    }
    
    if (parseTree.television) {
        filledParams.television = getProperty(parseTree.television, 'TV');
    }
    
    if (parseTree.water_heater) {
        filledParams.waterHeating = getProperty(parseTree.water_heater, 'water');
    }
    
    if (parseTree.location) {
        filledParams.location = getCity(parseTree.location);
    }
    
    if (parseTree._infrastructure_amenity) {
        filledParams.infAmenity = getInfAmenity(parseTree._infrastructure_amenity);
    }
    
    if (parseTree._repair) {
        filledParams.repair = parseTree._repair.repair;
    }
    
    return filledParams;
};

const processParams = async () => {
    let emptyParams = [];
    let newParams = [];
    
    if ($session.params.location) {
        if (!$session.info.location || ($session.info.location.cityNameEn !== $session.params.location.name)) {
            const location = await utl.getCityInfo($session.params.location.name, $session.params.location.country);
            $session.info.location = location;
            newParams.push('Location');
        }
    } else emptyParams.push('Location'); 
    
    //sale_rent
    if ($session.params.listingType) {
        if ($session.params.listingType !== $session.data.listingType) {
            $session.data.listingType = $session.params.listingType;
            newParams.push('ListingTypes');
        }
    } else emptyParams.push('ListingTypes');
    
    if ($session.params.propertyTypes) {
        if (!utl.arrayСomparison($session.params.propertyTypes, $session.data.propertyTypes)) {
            $session.data.propertyTypes = $session.params.propertyTypes;
            newParams.push('PropertyTypes');
        }
    } else emptyParams.push('PropertyTypes');
    
    if ($session.params.priceFrom || $session.params.priceTo) {
        if (($session.params.priceFrom !== $session.data.priceFrom) || ($session.params.priceTo !== $session.data.priceTo)) {
            $session.data.priceTo = $session.params.priceTo;
            $session.data.priceFrom = $session.params.priceFrom;
            newParams.push('Price');
        }
    } else emptyParams.push('Price');
    
    if ($session.params.infAmenity && !emptyParams.includes('PropertyTypes')) {
        switch ($session.data.propertyTypes[0]) {
            case "APARTMENT":
            case "DETACHED_HOUSE":
            case "SEMIDETACHED_HOUSE":
            case "VILLA":
                $session.data.infrastructureApartmentAmenity = $session.params.infAmenity;
                break;
            case "COMMERCIAL_PLOT":
            case "RESIDENTIAL_PLOT":
            case "AGRICULTURE_PLOT":
                $session.data.infrastructurePlotAmenity = $session.params.infAmenity;
                break;
            case "OFFICE":
            case "HOTEL":
            case "MANUFACTURING":
            case "RETAIL_SPACE":
            case "WAREHOUSE":
            case "CAR_PARKING":
                $session.data.infrastructureCommerceAmenity = $session.params.infAmenity;
                break;
        }
    }
    
    if (($session.params.areaFrom || $session.params.areaTo) && !emptyParams.includes('PropertyTypes')) {
        switch ($session.data.propertyTypes[0]) {
            case "COMMERCIAL_PLOT":
            case "RESIDENTIAL_PLOT":
            case "AGRICULTURE_PLOT":
                {
                    $session.data.plotAreaFrom = $session.params.areaFrom;
                    $session.data.plotAreaTo = $session.params.areaTo;
                    break;
                }
            case "OFFICE":
            case "HOTEL":
            case "MANUFACTURING":
            case "RETAIL_SPACE":
            case "WAREHOUSE":
            case "CAR_PARKING":
                {
                    $session.data.floorAreaFrom = $session.params.areaFrom;
                    $session.data.floorAreaTo = $session.params.areaTo;
                    break;
                }
        }
    }
    
    return { emptyParams, newParams };
}

const emptyParamsResult = async (params) => {
    const routes = {
        'PropertyTypes': '/Search/InputPropertyTypes',
        'Location': '/Search/InputLocation',
        'Price': '/Search/InputPrice',
        'ListingTypes': '/Search/InputListingTypes'
    };

    for (const param of Object.keys(routes)) {
        if (params.includes(param)) {
            $reactions.transition(routes[param]);
            return;
        }
    }

    if (params.length === 0) {
        $reactions.transition("/DisplayResults");
    }
};

const updSessionInfo = async (info, params) => {
    $session.data = {...info, ...params};
}

export default {
    getAllParamsFromTree,
    processParams,
    emptyParamsResult,
    updSessionInfo,
}