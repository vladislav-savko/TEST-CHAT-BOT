import local from "../../../local/local.js";
import response from "../../../response.js";

export default async () => {
    const { lang } = await $session;
    response.text(local(lang).getProperty.propertyType);
    response.inlineCallback(
        local(lang).getProperty.propertyTypes.APARTMENT,
        "APARTMENT"
    );
    response.inlineCallback(
        local(lang).getProperty.propertyTypes.HOUSE,
        "HOUSE"
    );
    response.inlineCallback(
        local(lang).getProperty.propertyTypes.COMMERCE,
        "COMMERCE"
    );
    response.inlineCallback(local(lang).getProperty.propertyTypes.PLOT, "PLOT");
};
