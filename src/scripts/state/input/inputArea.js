import local from "../../local/local.js";
import response from "../../response.js";
import { updateSessionParamsAndTransition } from "../../params.js";

export default async () => {
    if (!$parseTree.area) {
        const { lang } = $session;
        response.text(local(lang).getProperty.area);
    } else {
        await updateSessionParamsAndTransition();
    }
};
