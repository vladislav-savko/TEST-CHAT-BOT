import local from "../../../local/local.js";
import response from "../../../response.js";

export default async () => {
    const { lang } = await $session;
    response.text(local(lang).getProperty.listingType);

    response.inlineCallback(local(lang).property.listingType.RENT, "GET_LISTING_RENT");
    response.inlineCallback(local(lang).property.listingType.SALE, "GET_LISTING_SALE");
    response.inlineCallback(
        local(lang).property.listingType.SHORT_RENT,
        "GET_LISTING_SHORT_RENT"
    );
};
