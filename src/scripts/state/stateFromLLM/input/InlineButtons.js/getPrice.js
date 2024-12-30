export default async () => {
    const applyType = async (value) => {
        $session.lastData = value;
        $reactions.transition("/InputData");
    };

    const value = await $request.query;

    const parsedRange = value.split("-").map(Number);

    if (parsedRange?.length) {
        applyType({
            priceFrom: parsedRange[0],
            priceTo: parsedRange[1],
        });
    }
};
