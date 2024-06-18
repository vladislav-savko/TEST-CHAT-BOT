import utl from './utilits.js'
import api from "./api.js";

const getBedrooms = (text) => {
    const pattern = /\b(\d+)\b(?:\s*[-–—]\s*\b(\d+)\b|\s+to\s+\b(\d+)\b|\s+or\s+more\b|\s+or\s+less\b|\s+and\s+more\b|\s+and\s+less\b)?\s*(bedroom|room)s?\b/gi;
    const match = pattern.exec(text);
    
    let from = null;
    let to = null;
    
    if (match) {
        from = parseInt(match[1], 10);
        to = null;

        if (match[2]) {
            to = parseInt(match[2], 10);
        } else if (match[3]) {
            to = parseInt(match[3], 10);
        } else if (/or\s+more|and\s+more/i.test(match[0])) {
            to = Infinity;
        } else if (/or\s+less|and\s+less/i.test(match[0])) {
            to = from;
            from = 0;
        }
        
        return {
            from,
            to
        }
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
    
    if (parseTree._bedroom) {
        const bedrooms = getBedrooms(parseTree._bedroom);
        filledParams.bedroomsFrom = bedrooms.from;
        filledParams.bedroomsTo = bedrooms.to;
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
    
    // if (parseTree.country) {
    //     filledParams.country = getCountry(parseTree.country);
    // }
    
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
        //$reactions.answer("LOAP")
        //$reactions.answer(JSON.stringify($session.info));
        //$reactions.answer(JSON.stringify($session.params));
        if (!$session.info.location || ($session.info.location.cityNameEn !== $session.params.location.name)) {
            const location = await utl.getCityInfo($session.params.location.name, $session.params.location.country);
            //if (location.cityId == location.districtId) {
           ///     delete location.cityId
            //}
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
    
    return { emptyParams, newParams };
}

const emptyParamsResult = async (params) => {
    if (params.length > 0) {
        const text = `Ok, I understand, but you still need to specify the following parameters: ${params.includes('Location') ? `\n-location` : ''}${params.includes('ListingTypes') ? `\n-buying or renting` : ''}${params.includes('PropertyTypes') ? `\n-type of property` : ''}`;
        $reactions.answer(text);
    }
    
    if (params.length === 0) {
        $reactions.transition("/DisplayResults");
    }
}

const updSessionInfo = async (info, params) => {
    //$reactions.answer('UPRSESSIONINFO');
    //$reactions.answer(JSON.stringify(params));
    $session.data = {...info, ...params};
   // $reactions.answer(JSON.stringify($session.data));
}

export default {
    getAllParamsFromTree,
    processParams,
    emptyParamsResult,
    updSessionInfo,
}