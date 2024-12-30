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

    const value = await $request.query;

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
