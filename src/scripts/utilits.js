import api from "./api.js";
import { API__LINK, VERSION } from "./config.js";

function session() {
  $session.data = {
    skip: 0,
    take: 3,
    propertyTypes: [""],
    listingType: "",
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
    cityId: null,
  };

  $session.info = {
    city: null,
    country: null,
    property: null,
  };
  
  $session.params = {};
  $session.state = null;
  $session.seller = null;
  $session.ids = [];
  
  $session.lastParams = {};

  $session.version = VERSION;
}

const initSession = () => {
  if (!$session.data || $session.version !== VERSION) {
    session();
  }
};

const getCityInfo = async (city, country) => {
  try {
    const resC = await api.getCitiesInfo(city);
    if (resC) {
      const filteredCities = resC.data.filter(
        (city) => city.countryNameEn.toLowerCase() === country.toLowerCase()
      );
      if (filteredCities.length > 0) {
          if (filteredCities[0].districtName == filteredCities[0].cityName) {
            $session.data.districtId = filteredCities[0].districtId;
            delete $session.data.cityId
          } else {
              $session.data.cityId = filteredCities[0].cityId;
              delete $session.data.districtId
          }
        return filteredCities[0];
      } else {
        $reactions.answer(
          `Sorry, no cities found in ${country}. Please try again.`
        );
        return false;
      }
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

const getListingData = (listing) => {
  if (listing.apartmentSell) return listing.apartmentSell;
  else if (listing.apartmentRent) return listing.apartmentRent;
  else if (listing.houseSell) return listing.houseSell;
  else if (listing.houseRent) return listing.houseRent;
  else if (listing.commerceSell) return listing.commerceSell;
  else if (listing.commerceRent) return listing.commerceRent;
  else if (listing.plotSell) return listing.plotSell;
  else if (listing.plotRent) return listing.plotRent;
};

const postJSON = (object) => {
  $reactions.answer(JSON.stringify(object));
};

function getIdsFromListings(res) {
    if (res && res.data && Array.isArray(res.data.listings)) {
        return res.data.listings.map(listing => listing.id);
    } else {
        return [];
    }
}

const getListings = async (sessionData) => {
  try {
    sessionData.take = 3;
    const res = await api.getListing(sessionData);
    if (res && res.data.listings.length > 0) {
      $session.ids = getIdsFromListings(res);
      res.data.listings.map((listing) => {
        const listingData = getListingData(listing);

        const propertyDetails = `
${listing.listingType !== null ? `${listing.listingType}` : ''} ${listing.price !== null ? `*${listing.price} €*` : ''}
${listing.location !== null && listing.location.city !== null && listing.location.city.name !== null ? `${listing.location.city.name}` : ''}
${listingData.floorArea !== null ? `- Property area: *${listingData.floorArea}m²*` : ''}
${listingData.bedrooms !== null ? `- Bedrooms: ${listingData.bedrooms}` : ''}
${(listingData.furnishing !== null && $session.data.furnishing.length) ? `- Furnishing: *${listingData.furnishing}*` : ''}
${(listingData.balcony !== null && $session.data.balcony.length) ? `- Balcony: ${listingData.balcony ? "+" : "-"}` : ''}
${(listingData.bathrooms !== null && false) ? `- Bathrooms: ${listingData.bathrooms}` : ''}
${(listingData.parking !== null && $session.data.parking.length) ? `- Parking: ${listingData.parking ? "+" : "-"}` : ''}
${(listingData.electricity !== null && $session.data.electricity.length) ? `- Electricity: ${listingData.electricity ? "+" : "-"}` : ''}
${(listingData.television !== null && $session.data.television.length) ? `- Television: ${listingData.television ? "+" : "-"}` : ''}
${(listingData.alarmSystem !== null && $session.data.alarmSystem.length) ? `- Alarm system: ${listingData.alarmSystem ? "+" : "-"}` : ''}
${(listingData.gas !== null && $session.data.gas.length) ? `- Gas: ${listingData.gas ? "+" : "-"}` : ''}
${(listingData.heating !== null && $session.data.heating.length) ? `- Heating: ${listingData.heating}` : ''}
${(listingData.waterHeating !== null && $session.data.waterHeating.length) ? `- Water heating: ${listingData.waterHeating}` : ''}
${(listingData.internet !== null && $session.data.internet.length) ? `- Internet: ${listingData.internet}` : ''}
${(listingData.airConditioning !== null && $session.data.airConditioning.length) ? `- Air conditioning: *${listingData.airConditioning}*` : ''}
${listingData.infrastructureAmenity !== null ? `- Infrastructure amenities: ${listingData.infrastructureAmenity.map(v => v.toLowerCase().replace(/_/g, ' ')).join(', ')}` : ''}
${(listingData.repairAmenity !== null && $session.data.repair.length) ? `- Repair amenities: ${listingData.repairAmenity}` : ''}
`
        .split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');
        
        const image = listing.photos.length !== 0 ? {
            type: "image",
            imageUrl: listing.photos[0],
          } : {
              type: "image",
              imageUrl: "https://dummyimage.com/600x400/000/ffffff&text=without+photo"
          };
        
        $response.replies.push(
          image,
          {
            type: "text",
            text: `**${listing.title.trim()}**
**ID: ${listing.id}**
${propertyDetails}
[Show in browser](${linkToBrowserPage(listing)})`,
          }
        );
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    $reactions.answer(
      "*Listings* Something's broken, please try again later. Sorry"
    );
    return false;
  }
};

const printPost = (listing) => {
  const listingData = getListingData(listing);

  const images = listing.photos.map((image) => {
    return {
      type: "image",
      imageUrl: image,
    };
  });

  $response.replies.push(...images, {
    type: "text",
    text: `**${listing.title.trim()}**
**€${listing.price}**
${listing.description}

[Show in browser](${linkToBrowserPage(listing)})
`,
  });
  
    $response.replies.push({
        type: "buttons",
        buttons: [
            {text: "Seller Contacts"},
        ]
    });
};

const printSellerInfo = (seller) => {
    $response.replies.push({
        type: "text",
        text: `${seller.firstName} ${seller.lastName}
${seller.email}
${seller.phoneNumber}
    `,
    });
};

const getListingById = async (id) => {
    try {
        const listing = await api.getListingById(id);
    
        if (listing) {
            printPost(listing.data);
            $session.seller = id;
        }
    } catch (error) {
        $reactions.answer("Something's broken, please try again later. Sorry");
        return false;
    }
};

const getSeller = async () => {
    try {
        const seller = await api.getSellerById($session.seller);
    
        if (seller) {
            printSellerInfo(seller.data);
        }
    } catch (error) {
        $reactions.answer("Sorry, I can't get seller information.");
        return false;
    }
} 

const confirmAction = (listingType, estateType) => {
  const action = listingType.toLowerCase() === "sale" ? "buy" : listingType;
  $reactions.answer(`You chose to ${action} ${estateType}. Is that correct?`);
};

const confirmSearch = (listingType, estateType, city, country) => {
  const action = listingType === "SALE" ? "buy" : listingType;
  $reactions.answer(
    `You chose to ${action} a ${estateType} in ${city}, ${country}. Is that correct?`
  );
};

function containsBedroomAndOthers(arr) {
  const bedroomWords = [
    "bed",
    "room",
    "furniture",
    "sleep",
    "rest",
    "bedroom",
    "bedrooms",
    "beds",
    "rooms",
  ];

  const words = arr.toString().toLowerCase().split(/\W+/);

  const containsOtherWords = words.some((word) => bedroomWords.includes(word));

  return containsOtherWords;
}

function bedroomAndOthers(arr) {
  const bedroomWords = [
    "bed",
    "room",
    "furniture",
    "sleep",
    "rest",
    "bedroom",
    "bedrooms",
    "beds",
    "rooms",
  ];

  const words = arr.toString().toLowerCase().split(/\W+/);

  const otherWord = words.find((word) => bedroomWords.includes(word));

  return otherWord;
}

function ucFirst(str) {
  if (!str) return str;

  return str[0] + str.slice(1);
}

function arrayСomparison(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every(value => arr2.includes(value));
}

function copyObjectWithoutFields(source, fieldsToExclude) {
    const result = {};
    for (let key in source) {
        if (!fieldsToExclude.includes(key)) {
            result[key] = source[key];
        }
    }
    return result;
}

export default {
  session,
  initSession,
  getCityInfo,
  getListings,
  confirmAction,
  confirmSearch,
  containsBedroomAndOthers,
  bedroomAndOthers,
  getListingById,
  getSeller,
  arrayСomparison,
  copyObjectWithoutFields
};
