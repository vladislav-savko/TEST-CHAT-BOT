import local from "../../../local/local.js";
import response from "../../../response.js";

export default async () => {
    const { lang } = await $session;
    response.text(local(lang).getProperty.listingType);

    response.inlineCallback(local(lang).property.listingType.RENT, "RENT");
    response.inlineCallback(local(lang).property.listingType.SALE, "SALE");
    response.inlineCallback(
        local(lang).property.listingType.SHORT_RENT,
        "SHORT_RENT"
    );
};
