import local from "../../local/local.js";
import response from "../../response.js";
import { updateSessionParamsAndTransition } from "../../params.js";

export default async () => {
    if (!$parseTree.density) {
        const { lang } = $session;
        response.text(local(lang).getProperty.density);
    } else {
        await updateSessionParamsAndTransition();
    }
};
