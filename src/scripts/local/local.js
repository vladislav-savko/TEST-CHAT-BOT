import en from "./en.js";
import pl from "./pl.js";
import ru from "./ru.js";

const local = {
    en,
    ru,
    pl,
    available: ["en, ru, pl"],
};

export default (lang = "en") => {
    return local[lang] || local["en"];
};
