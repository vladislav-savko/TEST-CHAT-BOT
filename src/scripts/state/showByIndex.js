import { getListingById } from "../utilits.js";
import local from "../local/local.js";
import response from "../response.js";

export default async () => {
    if (!$parseTree._index) {
        const { lang } = $session;
        response.text(local(lang).getProperty.id);
    } else {
       // const index = $parseTree.index[0].value;
        const index = $parseTree._index;
        await getListingById(index);
    }
};
