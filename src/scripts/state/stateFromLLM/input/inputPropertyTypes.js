import local from "../../../local/local.js";
import response from "../../../response.js";

export default async () => {
    const { lang } = await $session;
    response.text(local(lang).getProperty.propertyType);
    response.inlineCallback(
        local(lang).getProperty.propertyTypes.APARTMENT,
        "GET_PROPERTY_APARTMENT"
    );
    response.inlineCallback(
        local(lang).getProperty.propertyTypes.HOUSE,
        "GET_PROPERTY_HOUSE"
    );
    response.inlineCallback(
        local(lang).getProperty.propertyTypes.COMMERCE,
        "GET_PROPERTY_COMMERCE"
    );
    response.inlineCallback(local(lang).getProperty.propertyTypes.PLOT, "GET_PROPERTY_PLOT");
};
