export default async () => {
    const applyType = async (value) => {
        $session.lastData = value;
        $reactions.transition("/InputData");
    };

    const value = await $request.query.split('GET_PRICE_')[1];

    const parsedRange = value.split("-").map(Number);

    if (parsedRange?.length) {
        applyType({
            priceFrom: parsedRange[0],
            priceTo: parsedRange[1],
        });
    }
};
