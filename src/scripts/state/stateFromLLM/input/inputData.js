import { copyObjectWithoutFields } from "../../../utilits.js";
import {
    processParams,
    updSessionInfo,
    emptyParamsResult,
} from "../../../params.js";

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
        "floorArea",
        "bathrooms",
        "furnishing",
        "condition",
        "electricity",
        "parking",
        "floorArea",
        "residentialFloors",
        "yearOfConstruction",
        "propertyStatus",
        ""
    ]);
    const data = $session.data;
    await updSessionInfo(data, params);
    await emptyParamsResult(emptyParams);
};
