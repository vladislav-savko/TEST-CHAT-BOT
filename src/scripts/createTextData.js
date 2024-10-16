import { API__LINK } from "./config.js";
import local from "./local/local.js";

export const getPropertyDetails = (listing, listingData) => {
    const lang = $session.lang;

    const details = [
        listing.price ? `*${listing.price} €*` : "",
        // getLocationProperty(listing.location),
        listingData.floorArea || listingData.plotArea
            ? `- ${local(lang).property.area}: *${
                  listingData.floorArea || listingData.plotArea
              } m²*`
            : "",
        listingData.bedrooms != null
            ? `- 🛏 ${local(lang).property.bathrooms}: ${listingData.bedrooms}`
            : "",
        listingData.furnishing != null && $session.data.furnishing.length
            ? `- 🛋 ${local(lang).property.furnishing}: *${
                  listingData.furnishing
              }*`
            : "",
        listingData.balcony != null
            ? `- ${local(lang).property.balcony}: ${
                  listingData.balcony ? "+" : "-"
              }`
            : "",
        listingData.bathrooms != null
            ? `- 🛁 ${local(lang).property.bathrooms}: ${listingData.bathrooms}`
            : "",
        listingData.parking != null && $session.data.parking.length
            ? `- 🅿️ ${local(lang).property.parking}: ${
                  listingData.parking ? "+" : "-"
              }`
            : "",
        listingData.electricity != null && $session.data.electricity
            ? `- ⚡️ ${local(lang).property.electricity}: ${
                  listingData.electricity ? "+" : "-"
              }`
            : "",
        listingData.television != null
            ? `- 📺 ${local(lang).property.television}: ${
                  listingData.television ? "+" : "-"
              }`
            : "",
        listingData.alarmSystem != null && $session.data.alarmSystem.length
            ? `- 🚨 ${local(lang).property.alarmSystem}: ${
                  listingData.alarmSystem ? "+" : "-"
              }`
            : "",
        listingData.gas != null
            ? `- ${local(lang).property.gas}: ${listingData.gas ? "+" : "-"}`
            : "",
        listingData.heating != null && $session.data.heating
            ? `- 🔥 ${local(lang).property.heating}: ${listingData.heating}`
            : "",
        listingData.waterHeating != null && $session.data.water.length
            ? `- ${local(lang).property.waterHeating}: ${
                  listingData.waterHeating
              }`
            : "",
        listingData.internet != null && $session.data.internet.length
            ? `- 🌐 ${local(lang).property.internet}: ${listingData.internet}`
            : "",
        listingData.airConditioning != null &&
        $session.data.airConditioning.length
            ? `- ${local(lang).property.airConditioning}: *${
                  listingData.airConditioning
              }*`
            : "",
        listingData.infrastructureAmenity != null
            ? `- ${
                  local(lang).property.infrastructureAmenities
              }: ${listingData.infrastructureAmenity
                  .map((v) => v.toLowerCase().replace(/_/g, " "))
                  .join(", ")}`
            : "",
        listingData.repairAmenity != null
            ? `- ${
                  local(lang).property.repairAmenities
              }: ${listingData.repairAmenity
                  .map((v) => v.toLowerCase().replace(/_/g, " "))
                  .join(", ")}`
            : "",
        listingData.locationFeatures != null
            ? `- ${
                  local(lang).property.locationFeatures
              }: ${listingData.locationFeatures
                  .map((v) => v.toLowerCase().replace(/_/g, " "))
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
            : $session.lang || 'en';

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
    return `${API__LINK}/${data.seo.listingType}/${data.seo.countryName}/${data.seo.cityName}/${data.seo.category}/${data.seo.propertyType}/${data.id}`;
};

export const getLinkToMap = (data) => {
    return `https://www.google.com/maps?q=${data.location?.latitude},${data.location?.longitude}`;
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
