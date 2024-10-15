import { copyObjectWithoutFields } from "../../../utilits.js";
import { processParams, updSessionInfo, emptyParamsResult } from "../../../params.js";

export default async () => {
    $session.state = "SwitchSearch";

    const { emptyParams, newParams } = await processParams();
    const params = await copyObjectWithoutFields($session.lastData, [
        "city",
        "country",
        "listingType",
        "propertyType",
        "priceFrom",
        "priceTo",
    ]);
    const data = $session.data;
    await updSessionInfo(data, params);
    // // $reactions.answer(JSON.stringify($session.data));
    await emptyParamsResult(emptyParams);
};
