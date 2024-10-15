import response from "./response.js";
import utl from "./utilits.js";

export const processParams = async () => {
    let emptyParams = [];
    let newParams = [];

    const newData = $session.lastData;

    if (newData.city || newData.country) {
        if (
            !$session.location ||
            $session.location.cityNameEn !== newData.city
        ) {
            const location = await utl.getCityInfo(
                newData.city,
                newData.country
            );
            $session.location = location;
            newParams.push("Location");
        }
    } else {
        emptyParams.push("Location");
    }

    //sale_rent
    if (newData.listingType) {
        if (newData.listingType !== $session.data.listingType) {
            $session.data.listingType = newData.listingType;
            newParams.push("ListingTypes");
        }
    } else emptyParams.push("ListingTypes");

    // response.log(newData);

    if (newData.propertyType) {
        const formatToArray = (input) =>
            Array.isArray(input) ? input : [input];
        
        let pp = formatToArray(newData.propertyType);
        
        pp = pp.map(type => {
            if (type === "HOUSE") {
                return ["DETACHED_HOUSE", "SEMIDETACHED_HOUSE", "VILLA"];
            }
            return type;
        }).flat();
    
        $session.data.propertyTypes = pp;
        newParams.push("PropertyTypes");
    } else {
        emptyParams.push("PropertyTypes");
    }

    if (newData.priceFrom || newData.priceTo) {
        if (
            newData.priceFrom !== $session.data.priceFrom ||
            newData.priceTo !== $session.data.priceTo
        ) {
            $session.data.priceTo = Number(newData.priceTo);
            $session.data.priceFrom = Number(newData.priceFrom);
            newParams.push("Price");
        }
    } else emptyParams.push("Price");

    // if ($session.params.infAmenity && !emptyParams.includes("PropertyTypes")) {
    //     switch ($session.data.propertyTypes[0]) {
    //         case "APARTMENT":
    //             $session.data.infrastructureApartmentAmenity.push(
    //                 $session.params.infAmenity[0]
    //             );
    //             break;
    //         case "DETACHED_HOUSE":
    //         case "SEMIDETACHED_HOUSE":
    //         case "VILLA":
    //             $session.data.infrastructureHouseAmenity.push(
    //                 $session.params.infAmenity[0]
    //             );
    //             break;
    //         case "COMMERCIAL_PLOT":
    //         case "RESIDENTIAL_PLOT":
    //         case "AGRICULTURE_PLOT":
    //             $session.data.infrastructurePlotAmenity.push(
    //                 $session.params.infAmenity[0]
    //             );
    //             break;
    //         case "OFFICE":
    //         case "HOTEL":
    //         case "MANUFACTURING":
    //         case "RETAIL_SPACE":
    //         case "WAREHOUSE":
    //         case "CAR_PARKING":
    //             $session.data.infrastructureCommerceAmenity.push(
    //                 $session.params.infAmenity[0]
    //             );
    //             break;
    //     }
    // }

    if ($session.params.locAmenity && !emptyParams.includes("PropertyTypes")) {
        // switch ($session.data.propertyTypes[0]) {
        //     case "APARTMENT":
        //         $session.data.locationFeatures.push($session.params.locAmenity[0]);
        //         break;
        //     case "DETACHED_HOUSE":
        //     case "SEMIDETACHED_HOUSE":
        //     case "VILLA":
        //         $session.data.locationFeatures.push($session.params.locAmenity[0]);
        //         break;
        //     case "COMMERCIAL_PLOT":
        //     case "RESIDENTIAL_PLOT":
        //     case "AGRICULTURE_PLOT":
        //         $session.data.locationFeatures.push($session.params.locAmenity[0]);
        //         break;
        //     case "OFFICE":
        //     case "HOTEL":
        //     case "MANUFACTURING":
        //     case "RETAIL_SPACE":
        //     case "WAREHOUSE":
        //     case "CAR_PARKING":
        //         $session.data.locationFeatures.push($session.params.locAmenity[0]);
        //         break;
        // }
    }

    // if (
    //     ($session.params.areaFrom || $session.params.areaTo) &&
    //     !emptyParams.includes("PropertyTypes")
    // ) {
    //     switch ($session.data.propertyTypes[0]) {
    //         case "COMMERCIAL_PLOT":
    //         case "RESIDENTIAL_PLOT":
    //         case "AGRICULTURE_PLOT": {
    //             $session.data.plotAreaFrom = $session.params.areaFrom;
    //             $session.data.plotAreaTo = $session.params.areaTo;
    //             break;
    //         }
    //         case "OFFICE":
    //         case "HOTEL":
    //         case "MANUFACTURING":
    //         case "RETAIL_SPACE":
    //         case "WAREHOUSE":
    //         case "CAR_PARKING": {
    //             $session.data.floorAreaFrom = $session.params.areaFrom;
    //             $session.data.floorAreaTo = $session.params.areaTo;
    //             break;
    //         }
    //     }
    // }

    return { emptyParams, newParams };
};

export const emptyParamsResult = async (params) => {
    const routes = {
        PropertyTypes: "/InputData/InputPropertyTypes",
        Location: "/InputData/InputLocation",
        Price: "/InputData/InputPrice",
        ListingTypes: "/InputData/InputListingTypes",
    };

    for (const param of Object.keys(routes)) {
        if (params.includes(param)) {
            $reactions.transition(routes[param]);
            return;
        }
    }

    if (params.length === 0) {
        return $reactions.transition("/DisplayResult");
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

// export async function updateSessionParamsAndTransition() {
//     const params = await getAllParamsFromTree($parseTree);
//     $session.params = { ...$session.params, ...params };
//     $reactions.transition("/Search/SwitchParams");
// }

export default {
    // getAllParamsFromTree,
    processParams,
    emptyParamsResult,
    updSessionInfo,
    checkChangePropertyType,
    // updateSessionParamsAndTransition,
};
