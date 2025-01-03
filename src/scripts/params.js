import utl from "./utilits.js";

function isNumber(str) {
    return str.trim() !== "" && !isNaN(Number(str));
}

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

    if (
        (newData.priceFrom !== null && newData.priceFrom !== undefined) ||
        (newData.priceTo !== null && newData.priceTo !== undefined)
    ) {
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

    if (newData.floorArea) {
        $session.data.floorAreaFrom = Number(newData.floorArea);
    }

    if (newData.residentialFloors) {
        $session.data.residentialFloorsFrom = Number(newData.residentialFloors);
        $session.data.residentialFloorsTo = Number(newData.residentialFloors);
    }

    if (newData.yearOfConstruction) {
        $session.data.yearOfConstructionFrom = Number(
            newData.yearOfConstruction
        );
        $session.data.yearOfConstructionTo = Number(newData.yearOfConstruction);
    }

    if (newData.furnishing || newData.furnishing?.length) {
        $session.data.furnishing = Array.isArray(newData.furnishing)
            ? newData.furnishing
            : [newData.furnishing];
    }

    if (newData.bathrooms || newData.bathrooms?.length) {
        $session.data.bathroomNumbers = Array.isArray(newData.bathrooms)
            ? newData.bathrooms
            : [newData.bathrooms];
    }

    if (newData.condition || newData.condition?.length) {
        $session.data.buildingConditions = Array.isArray(newData.condition)
            ? newData.condition
            : [newData.condition];
    }

    if (newData.electricity || newData.electricity?.length) {
        $session.data.electricity = Array.isArray(newData.electricity)
            ? newData.electricity
            : [newData.electricity];
    }

    if (newData.parking || newData.parking?.length) {
        $session.data.parking = Array.isArray(newData.parking)
            ? newData.parking
            : [newData.parking];
    }

    if (newData.propertyStatus || newData?.propertyStatus?.length) {
        $session.data.propertyStatus = Array.isArray(newData.propertyStatus)
            ? newData.propertyStatus
            : [newData.propertyStatus];
    }

    if (newData.petFriendly || newData.petFriendly?.length) {
        $session.data.petFriendly = Array.isArray(newData.petFriendly)
            ? newData.petFriendly
            : [newData.petFriendly];
    }

    if (
        !$session.location ||
        (!$session.data.districtId &&
            !$session.data.cityId &&
            !$session.data.countryId &&
            !newData.city &&
            !newData.country)
    ) {
        emptyParams.push("Location");
    }
    if (!$session.data.listingType) emptyParams.push("ListingTypes");
    if (!$session.data.propertyTypes?.length) emptyParams.push("PropertyTypes");
    if (
        !isNumber(`${$session.data.priceTo}`) &&
        !isNumber(`${$session.data.priceFrom}`)
    )
        emptyParams.push("Price");

    log({
        function: "processParams",
        input: { newData },
        output: { emptyParams, newParams },
    });

    return { emptyParams, newParams };
};

export const emptyParamsResult = async (params) => {
    const routes = {
        PropertyTypes: "/InputData/InputPropertyTypes",
        Location: "/InputData/InputLocation",
        ListingTypes: "/InputData/InputListingTypes",
        Price: "/InputData/InputPrice",
    };

    let route = "";

    for (const param of Object.keys(routes)) {
        if (params.includes(param)) {
            route = routes[param];
            break;
        }
    }

    if (params.length === 0) {
        route = "/DisplayResult";
    }

    log({
        function: "emptyParamsResult",
        input: { params },
        output: { route },
    });

    $reactions.transition(route);
};

export const updSessionInfo = async (info, params) => {
    $session.data = { ...info, ...params };
};

export default {
    processParams,
    emptyParamsResult,
    updSessionInfo,
};
