import local from "../../local/local.js";
import response from "../../response.js";
import { updateSessionParamsAndTransition } from "../../params.js";

export default async () => {
    if (!$parseTree._propertyTypes) {
        const { lang } = $session;
        response.text(local(lang).getProperty.propertyType);
    } else {
        await updateSessionParamsAndTransition();
    }
};
