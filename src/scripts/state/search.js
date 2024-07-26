import {
    checkChangePropertyType,
    updateSessionParamsAndTransition,
} from "../params.js";

export default async () => {
    // $reactions.answer(JSON.stringify($parseTree));
    if ($parseTree.propertyTypes) {
        await checkChangePropertyType($session.data, $parseTree);
    }
    //$reactions.answer(JSON.stringify($session.data));
    await updateSessionParamsAndTransition();
    $session.state = "Search";
};
