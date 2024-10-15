import { switchLanguage, findLastNonSwitchState } from "../../../utilits.js";
import local, { available } from "../../../local/local.js";
import response from "../../../response.js";

export default async () => {
    const lngCode = $parseTree.text.replace("/", "");

    if (available.includes(lngCode)) {
        await switchLanguage(lngCode);

        /** @type {{ state: State }} */
        const lastTransition = findLastNonSwitchState(
            $session.transitionsHistory
        );

        if (lastTransition) {
            const { state: lastState } = lastTransition;
            $reactions.transition(lastState);
        } else {
            $reactions.transition("/Start");
        }
    } else {
        // нет такого языка
    }
};
