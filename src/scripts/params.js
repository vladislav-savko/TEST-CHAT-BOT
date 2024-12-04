import response from "./response.js";
import utl from "./utilits.js";

export const processParams = async () => {
    let emptyParams = [];
    let newParams = [];

    const newData = $session.lastData;

    if (newData.city || newData.country) {
        const cityChanged =
            newData.city &&
            (!$session.location ||
                $session.location.cityNameEn !== newData.city);
        const countryChanged =
            newData.country &&
            (!$session.location ||
                $session.location.countryNameEn !== newData.country);

        if (cityChanged || countryChanged) {
            const location = await utl.getCityInfo(
                newData.city,
                newData.country
            );
            $session.location = location;
            newParams.push("Location");
        }
    }

    if (newData.listingType) {
        if (newData.listingType !== $session.data.listingType) {
            $session.data.listingType = newData.listingType;
            newParams.push("ListingTypes");
        }
    }

    if (newData.propertyType) {
        const formatToArray = (input) =>
            Array.isArray(input) ? input : [input];

        let pp = formatToArray(newData.propertyType);

        pp = pp
            .map((type) => {
                if (type === "HOUSE") {
                    return ["DETACHED_HOUSE", "SEMIDETACHED_HOUSE", "VILLA"];
                }
                return type;
            })
            .flat();

        $session.data.propertyTypes = pp;
        newParams.push("PropertyTypes");
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
    }

    if (newData.infrastructureAmenity) {
        if (newData.infrastructureAmenity.includes("INDOOR_POOL"))
            $session.data.swimmingPool = [true];
    }

    if (
        !$session.location ||
        (!$session.data.districtId &&
            !$session.data.cityId &&
            !$session.data.countryId &&
            !newData.city &&
            !newData.country)
    ) {
        log($session.location);
        emptyParams.push("Location");
    }
    if (!$session.data.listingType) emptyParams.push("ListingTypes");
    if (!$session.data.propertyTypes.length) emptyParams.push("PropertyTypes");
    if (!$session.data.priceTo && !$session.data.priceFrom)
        emptyParams.push("Price");

    return { emptyParams, newParams };
};

export const emptyParamsResult = async (params) => {
    const routes = {
        PropertyTypes: "/InputData/InputPropertyTypes",
        Location: "/InputData/InputLocation",
        ListingTypes: "/InputData/InputListingTypes",
        Price: "/InputData/InputPrice",
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
