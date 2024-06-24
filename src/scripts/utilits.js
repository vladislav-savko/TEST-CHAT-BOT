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
          if (filteredCities[0].districtId == filteredCities[0].cityId) {
            $session.data.districtId = filteredCities[0].districtId;
            delete $session.data.cityId
          } else {
              $session.data.cityId = filteredCities[0].cityId
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

// function formatListing(listingData) {
//   const parameters = [
//     { key: 'floorArea', label: 'Floor area', unit: 'm²', format: (value) => `*${value}m²*` },
//     { key: 'bedrooms', label: 'Bedrooms' },
//     { key: 'furnishing', label: 'Furnishings', format: (value) => `*${value.toLowerCase()}*` },
//     { key: 'balcony', label: 'Balcony', format: (value) => (value ? "+" : "-") },
//     { key: 'bathrooms', label: 'Bathrooms' }
//   ];

//   let result = parameters.reduce((acc, param) => {
//     if (listingData[param.key] !== null && listingData[param.key] !== undefined) {
//       const formattedValue = param.format ? param.format(listingData[param.key]) : listingData[param.key];
//       return acc + `- ${param.label}: ${formattedValue}\n`;
//     }
//     return acc;
//   }, '');
//   return result;
// }

// function formatListingI(listingData) {
//   const parameters = [
//     { key: 'floorArea', label: 'Floor area', format: (value) => `*${value}m²*` },
//     { key: 'floorNumber', label: 'Floor number' },
//     { key: 'residentialFloors', label: 'Residential floors' },
//     { key: 'bedrooms', label: 'Bedrooms' },
//     { key: 'sleepingPlaces', label: 'Sleeping places' },
//     { key: 'beds', label: 'Beds' },
//     { key: 'furnishing', label: 'Furnishings', format: (value) => `*${value.toLowerCase()}*` },
//     { key: 'alarmSystem', label: 'Alarm system', format: (value) => (value ? "+" : "-") },
//     { key: 'condition', label: 'Condition', format: (value) => value.toLowerCase().replace(/_/g, ' ')},
//     { key: 'bathrooms', label: 'Bathrooms' },
//     { key: 'kitchen', label: 'Kitchen', format: (value) => (value ? "+" : "-") },
//     { key: 'balcony', label: 'Balcony', format: (value) => (value ? "+" : "-") },
//     { key: 'parking', label: 'Parking', format: (value) => (value ? "+" : "-") },
//     { key: 'electricity', label: 'Electricity', format: (value) => (value ? "+" : "-") },
//     { key: 'gas', label: 'Gas', format: (value) => (value ? "+" : "-") },
//     { key: 'airConditioning', label: 'Air conditioning', format: (value) => value.toLowerCase().replace(/_/g, ' ') },
//     { key: 'heating', label: 'Heating', format: (value) => value.map(v => v.toLowerCase().replace(/_/g, ' ')).join(', ') },
//     { key: 'waterHeating', label: 'Water heating',format: (value) => value.map(v => v.toLowerCase().replace(/_/g, ' ')).join(', ') },
//     { key: 'television', label: 'Television' },
//     { key: 'internet', label: 'Internet', format: (value) => value.map(v => v.toLowerCase().replace(/_/g, ' ')).join(', ') },
//     { key: 'infrastructureAmenity', label: 'Infrastructure amenity', format: (value) => value.map(v => v.toLowerCase().replace(/_/g, ' ')).join(', ') },
//     { key: 'repairAmenity', label: 'Repair amenity', format: (value) => value.map(v => v.toLowerCase().replace(/_/g, ' ')).join(', ') },
//     { key: 'additionalAmenity', label: 'Additional amenity', format: (value) => value.toLowerCase().replace(/_/g, ' ') }
//   ];

//   let result = parameters.reduce((acc, param) => {
//     if (listingData[param.key] !== null && listingData[param.key] !== undefined) {
//       const formattedValue = param.format ? param.format(listingData[param.key]) : listingData[param.key];
//       return acc + `- ${param.label}: ${formattedValue}\n`;
//     }
//     return acc;
//   }, '');

//   return result;
// }

const getListings = async (sessionData) => {
  try {
    sessionData.take = 3;
    const res = await api.getListing(sessionData);
    if (res && res.data.listings.length > 0) {
      res.data.listings.map((listing) => {
        const listingData = getListingData(listing);
        
        const propertyDetails = `
${listingData.floorArea !== null ? `- Property area: *${listingData.floorArea}m²*` : ''}
${listingData.bedrooms !== null ? `- Bedrooms: ${listingData.bedrooms}` : ''}
${listingData.furnishing !== null ? `- Furnishing: *${listingData.furnishing}*` : ''}
${listingData.balcony !== null ? `- Balcony: ${listingData.balcony ? "+" : "-"}` : ''}
${listingData.bathrooms !== null ? `- Bathrooms: ${listingData.bathrooms}` : ''}
        `
        .split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');
        
        $response.replies.push(
          {
            type: "image",
            imageUrl: listing.photos[0],
          },
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
