import { MAIN__LINK } from "./config.js";
import local from "./local/local.js";

export const getPropertyDetails = (listing, listingData) => {
    const lang = $session.lang;

    log($session.data);

    const details = [
        listing.price ? `*${listing.price} €*` : "",
        listingData.floorArea || listingData.plotArea
            ? `⛶ ${local(lang).property.area}: *${
                  listingData.floorArea || listingData.plotArea
              } m²*`
            : "",
        listingData.bedrooms != null
            ? `🛏 ${local(lang).property.bedrooms}: ${listingData.bedrooms}`
            : "",
        listingData.furnishing != null && $session.data.furnishing
            ? `🛋 ${local(lang).property.furnishing.value}: *${
                  local(lang).property.furnishing[listingData.furnishing]
              }*`
            : "",
        listingData.balcony != null
            ? `${local(lang).property.balcony}: ${
                  listingData.balcony ? "+" : "-"
              }`
            : "",
        listingData.bathrooms != null
            ? `🛁 ${local(lang).property.bathrooms}: ${listingData.bathrooms}`
            : "",
        listingData.parking != null && $session.data.parking
            ? `🅿️ ${local(lang).property.parking}: ${
                  listingData.parking ? "+" : "-"
              }`
            : "",
        listingData.electricity != null && $session.data.electricity
            ? `⚡️ ${local(lang).property.electricity}: ${
                  listingData.electricity ? "+" : "-"
              }`
            : "",
        listingData.television != null
            ? `📺 ${local(lang).property.television}: ${
                  listingData.television ? "+" : "-"
              }`
            : "",
        listingData.alarmSystem != null && $session.data.alarmSystem
            ? `🚨 ${local(lang).property.alarmSystem}: ${
                  listingData.alarmSystem ? "+" : "-"
              }`
            : "",
        listingData.swimmingPool != null
            ? `🏊‍♂️ ${local(lang).property.swimmingPool}: ${
                  listingData.swimmingPool ? "+" : "-"
              }`
            : "",
        listingData.gas != null
            ? `${local(lang).property.gas}: ${listingData.gas ? "+" : "-"}`
            : "",
        listingData.heating != null && $session.data.heating
            ? `🔥 ${local(lang).property.heating.value}: ${listingData.heating
                  .map((value) => local(lang).property.heating[value])
                  .filter(Boolean)
                  .join(", ")}`
            : "",
        listingData.waterHeating != null && $session.data.water
            ? `🚿 ${
                  local(lang).property.waterHeating.value
              }: ${listingData.waterHeating
                  .map((value) => local(lang).property.waterHeating[value])
                  .filter(Boolean)
                  .join(", ")}`
            : "",
        listingData.internet != null && $session.data.internet.length
            ? `🌐 ${local(lang).property.internet.value}: ${listingData.internet
                  .map((value) => local(lang).property.internet[value])
                  .filter(Boolean)
                  .join(", ")}`
            : "",
        listingData.airConditioning != null &&
        $session.data.airConditioning.length
            ? `${local(lang).property.airConditioning.value}: *${
                  local(lang).property.airConditioning[
                      listingData.airConditioning
                  ]
              }*`
            : "",
        listingData.infrastructureAmenity != null &&
        listingData.infrastructureAmenity.length
            ? `*${
                  local(lang).property.infrastructureAmenities.value
              }*: ${listingData.infrastructureAmenity
                  .map(
                      (value) =>
                          local(lang).property.infrastructureAmenities[value]
                  )
                  .filter(Boolean)
                  .join(", ")}`
            : "",
        listingData.repairAmenity != null && listingData.repairAmenity.length
            ? `*${
                  local(lang).property.repairAmenities.value
              }*: ${listingData.repairAmenity
                  .map((value) => local(lang).property.repairAmenities[value])
                  .filter(Boolean)
                  .join(", ")}`
            : "",
        listingData.locationFeatures != null &&
        listingData.locationFeatures.length
            ? `*${
                  local(lang).property.locationFeatures.value
              }*: ${listingData.locationFeatures
                  .map((value) => local(lang).property.locationFeatures[value])
                  .filter(Boolean)
                  .join(", ")}`
            : "",
    ];

    return details.filter((line) => line.trim() !== "").join("\n");
};

export const getPreviewImage = (listing) => {
    const defaultImage =
        "https://dummyimage.com/600x400/000/ffffff&text=without+photo";
    return listing.photos?.[0] ?? defaultImage;
};

export const getDescription = (listing, propertyDetails, lang) => {
    const title_lang =
        $session.lang === "el"
            ? "cy"
            : $session.lang === "uk"
            ? "ua"
            : $session.lang || "en";

    const openInBrowserButton =
        $request.channelType !== "telegram"
            ? ` [${local(lang).buttons.openInBrowser}](${getLinkToBrowserPage(
                  listing
              )})`
            : "";

    return (
        `*${listing.title[title_lang]}* \n` +
        `*ID: ${listing.id}* \n` +
        `${propertyDetails} \n` +
        `${openInBrowserButton}`
    );
};

export const getLinkToBrowserPage = (data) => {
    return `${MAIN__LINK}/${data.seo.listingType}/${data.seo.countryName}/${data.seo.cityName}/${data.seo.category}/${data.seo.propertyType}/${data.id}`;
};

export const getLinkToMap = (data) => {
    const { lang } = $session;
    const locale = lang === "uk" ? "ua" : lang === "el" ? "cy" : lang;
    return `${MAIN__LINK}/webview/map-single?lat=${data.location?.latitude}&lng=${data.location?.longitude}&zoom=14&locale=${locale}&radius=${data.location?.radius}&price=${data.price}&mode=compact`;
};

export const getLocationProperty = (listingLocation) => {
    if (!listingLocation) return "";

    const { city } = listingLocation;
    const { district, country } = city;

    const location =
        city.name === district.name
            ? city.name
            : `${city.name}, ${district.name}`;

    return `${location}, ${country.name}\n`;
};
