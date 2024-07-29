import { copyObjectWithoutFields } from "../utilits.js";
import { processParams, updSessionInfo, emptyParamsResult } from "../params.js";

export default async () => {
    $session.state = "SwitchSearch";

    const { emptyParams, newParams } = await processParams();
    const params = await copyObjectWithoutFields($session.params, [
        "location",
        "listingType",
        "propertyTypes",
        "infAmenity",
        "locAmenity",
        "priceFrom",
        "priceTo",
        "areaFrom",
        "areaTo",
    ]);
    const data = $session.data;
    await updSessionInfo(data, params);
    // $reactions.answer(JSON.stringify($session.data));
    await emptyParamsResult(emptyParams);
};
