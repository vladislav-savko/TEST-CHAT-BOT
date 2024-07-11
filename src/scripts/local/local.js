import en from "./en.js";
import pl from "./pl.js";
import ru from "./ru.js";
import gr from "./gr.js";
import uk from "./uk.js";

import "./types.js";

/** @type {{ [key: string]: Translation }} */
const local = {
    en,
    ru,
    pl,
    gr,
    uk,
};

export const available = ["en", "ru", "pl", "gr", "uk"];

/** @type {{(lang: string) => Translation}} */
export default (lang = "en") => {
    return local[lang] || local["en"];
};
