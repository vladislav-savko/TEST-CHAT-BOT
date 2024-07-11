import en from "./en.js";
import pl from "./pl.js";
import ru from "./ru.js";
import gr from "./gr.js";
import uk from "./uk.js";

const local = {
    en,
    ru,
    pl,
    gr,
    uk,
    available: ["en, ru, pl, gr, uk"],
};

export default (lang = "en") => {
    return local[lang] || local["en"];
};
