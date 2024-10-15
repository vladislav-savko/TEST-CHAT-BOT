import local from "../../../local/local.js";
import response from "../../../response.js";
// import { updateSessionParamsAndTransition } from "../../../params.js";

export default async () => {
    if (!$parseTree.price) {
        const { lang } = $session;
        log($session);
        response.text(local(lang).getProperty.budget);
    } else {
        // await updateSessionParamsAndTransition();
    }
};
