export default async () => {
    const TYPES = {
        APARTMENT: ["APARTMENT"],
        HOUSE: ["VILLA", "DETACHED_HOUSE", "SEMIDETACHED_HOUSE"],
        PLOT: ["COMMERCIAL_PLOT", "RESIDENTIAL_PLOT", "AGRICULTURE_PLOT"],
        COMMERCIAL: [
            "OFFICE",
            "HOTEL",
            "MANUFACTURING",
            "RETAIL_SPACE",
            "PUBLIC_CATERING_FACILITY",
            "WAREHOUSE",
            "CAR_PARKING",
            "SHOP",
            "RESTAURANT",
            "OTHER_COMMERCIAL",
        ],
    };

    const applyType = async (value) => {
        $session.lastData = value;
        $reactions.transition("/InputData");
    };

    const value = await $request.query;

    switch (value) {
        case "APARTMENT":
            await applyType({ propertyTypes: TYPES.APARTMENT });
            break;
        case "HOUSE":
            await applyType({ propertyTypes: TYPES.HOUSE });
            break;
        case "PLOT":
            await applyType({ propertyTypes: TYPES.PLOT });
            break;
        case "COMMERCIAL":
            await applyType({ propertyTypes: TYPES.COMMERCIAL });
            break;
    }
};
