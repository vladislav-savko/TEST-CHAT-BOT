import en from "./en.js";
import pl from "./pl.js";
import ru from "./ru.js";
import el from "./el.js";
import uk from "./uk.js";

import "../typeDoc/local.js";

/** @type {{ [key: string]: Translation }} */
const local = {
    en,
    ru,
    pl,
    el,
    uk,
};

export const available = ["en", "ru", "pl", "el", "uk"];

/** @type {{(lang: string) => Translation}} */
export default (lang = "en") => {
    return local[lang] || local["en"];
};
