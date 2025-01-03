import local from "../../../../local/local.js";
import response from "../../../../response.js";

export default async () => {
    const { lang } = await $session;

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

    const value = await $request.query.split('GET_PROPERTY_')[1];

    const reply = {
        body: {
            text: `${$request.rawRequest.callback_query.message.text}\n\n✅ *${local(lang).getProperty.propertyTypes[value]}*`,
            parse_mode: "Markdown",
            message_id: $request.rawRequest.callback_query.message.message_id,
        },
        method: "editMessageText",
    };

    response.channel([reply]);

    switch (value) {
        case "APARTMENT":
            await applyType({ propertyType: TYPES.APARTMENT });
            break;
        case "HOUSE":
            await applyType({ propertyType: TYPES.HOUSE });
            break;
        case "PLOT":
            await applyType({ propertyType: TYPES.PLOT });
            break;
        case "COMMERCIAL":
            await applyType({ propertyType: TYPES.COMMERCIAL });
            break;
    }
};
