import { switchLanguage, findLastNonSwitchState } from "../../../utilits.js";
import local, { available } from "../../../local/local.js";
import response from "../../../response.js";

export default async () => {
    const { lang } = $session;

    const lngCode = $session.lastData?.language;
    
    if (!lngCode) {
        response.text(local(lang).getProperty.language);
        response.text(local(lang).info.language);

        if ($request.channelType === "telegram") {
            response.buttons(['/en', '/el', '/ru', '/pl', '/uk']);
        }
    } else {
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
            //интерфейса с таким языком не предусмотрено, выберите из существующих
        }
    }
};
