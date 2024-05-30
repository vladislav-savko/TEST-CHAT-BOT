import api from "./api.js";
import { API__LINK } from "./config.js";

function session() {
  $session.data = {
    skip: 0,
    take: 3,
    propertyTypes: ["APARTMENT"],
    listingType: "RENT",
    sort: "NEWEST",
    rooms: [],
    priceFrom: null,
    priceTo: null,
    plotAreaTo: null,
    plotAreaFrom: null,
    bedroomsFrom: null,
    bedroomsTo: null,
    densityFrom: null,
    densityTo: null,
    coverageRatioTo: null,
    coverageRatioFrom: null,
    residentialFloorsTo: null,
    residentialFloorsFrom: null,
    yearOfConstructionFrom: null,
    yearOfConstructionTo: null,
    floorAreaFrom: null,
    floorAreaTo: null,
    water: [],
    sewageSystemBoolean: [],
    bathroomBoolean: [],
    buildingConditions: [],
    furnishing: [],
    repair: [],
    alarmSystem: [],
    condition: [],
    parking: [],
    electricity: [],
    gas: [],
    airConditioning: [],
    heating: [],
    waterHeating: [],
    kitchen: [],
    balcony: [],
    television: [],
    internet: [],
    infrastructureApartmentAmenity: [],
    infrastructurePlotAmenity: [],
    infrastructureCommerceAmenity: [],
    withoutSold: true,
    cityId: 1,
  };
}

const initSession = () => {
  if (!$session.data) {
    session();
  }
};

const getCityInfo = async (city) => {
  $session.data.skip;
  try {
    const resC = await api.getCitiesInfo(city);
    if (resC) {
      $session.data.cityId = resC.data[0].cityId;
      return true;
    }
  } catch (error) {
    $reactions.answer(
      "*City* Something's broken, please try again later. Sorry"
    );
    return false;
  }
};

const linkToBrowserPage = (data) => {
  return `${API__LINK}/${data.seo.listingType}/${data.seo.countryName}/${data.seo.cityName}/${data.seo.category}/${data.seo.propertyType}/${data.id}`;
};

const getListings = async (sessionData) => {
  try {
    sessionData.take = 3;
    const res = await api.getListing(sessionData);
    if (res && res.data.listings.length > 0) {
      res.data.listings.map((listing) => {
        const listingData =
          listing.listingType === "SALE"
            ? listing.apartmentSale
            : listing.apartmentRent;
        $response.replies.push(
          {
            type: "image",
            imageUrl: listing.photos[0],
          },
          {
            type: "text",
            text: `**${listing.title}**
- Floor area: *${listingData.floorArea}m²*
- Bedrooms: ${listingData.bedrooms}
- Furnishings: *${listingData.furnishing}*
- Balcony: ${listingData.balcony ? "+" : "-"}
- Bathrooms: ${listingData.bathrooms}
[Show in browser](${linkToBrowserPage(listing)})`,
          }
        );
      });
      return true;
    } else {
      $reactions.answer(
        "There are no listings for your request. Would you like to try a different city?"
      );
      return false;
    }
  } catch (error) {
    $reactions.answer(
      "*Listings* Something's broken, please try again later. Sorry"
    );
    return false;
  }
};

const confirmAction = (listingType, estateType) => {
  const action =
    listingType.toLowerCase() === "sale" ? "buy" : listingType.toLowerCase();
  $reactions.answer(
    `You chose to ${action} ${estateType.toLowerCase()}. Is that correct?`
  );
};

export default {
  initSession,
  getCityInfo,
  getListings,
  confirmAction,
};
