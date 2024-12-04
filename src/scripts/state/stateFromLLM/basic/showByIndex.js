import { getListingById } from "../../../utilits.js";
import local from "../../../local/local.js";
import response from "../../../response.js";

export default async () => {
    const index = await $session.lastData?.id;
    if (!index) {
        const { lang } = $session;
        response.text(local(lang).getProperty.id);
    } else {
        await getListingById(index);
    }
};
