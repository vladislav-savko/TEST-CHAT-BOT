import { switchLanguage } from "../utilits.js";
import local, { available } from "../local/local.js";
import response from "../response.js";

export default async () => {
    const { lang } = $session;
    if (!$parseTree._language) {
        response.text(local(lang).getProperty.language);
    } else {
        /** @type {{ _language: Language }} */
        const { _language: lngObj } = $parseTree;
        if (available.includes(lngObj.code)) {
            await switchLanguage(lngObj.code);
        } else {
            //интерфейса с таким языком не предусмотрено, выберите из существующих
        }
    }
};
