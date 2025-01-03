import local from "../../../../local/local.js";
import response from "../../../../response.js";

export default async () => {
    const TYPES = {
        RENT: "RENT",
        SHORT_RENT: "SHORT_RENT",
        SALE: "SALE",
    };

    const applyType = async (value) => {
        $session.lastData = value;
        $reactions.transition("/InputData");
    };

    const value = await $request.query.split('GET_LISTING_')[1];

    const reply = {
        body: {
            text: `${$request.rawRequest.callback_query.message.text}\n\n✅ *${local(lang).getProperty.listingType[value]}*`,
            parse_mode: "Markdown",
            message_id: $request.rawRequest.callback_query.message.message_id,
        },
        method: "editMessageText",
    };

    response.channel([reply]);

    switch (value) {
        case "RENT":
            await applyType({ listingType: TYPES.RENT });
            break;
        case "SHORT_RENT":
            await applyType({ listingType: TYPES.SHORT_RENT });
            break;
        case "SALE":
            await applyType({ listingType: TYPES.SALE });
            break;
    }
};
