import api from "./api.js";
import TurndownService from "turndown";
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
    // $reactions.answer(
    //   "*City* Something's broken, please try again later. Sorry"
    // );
    return false;
  }
};

const linkToBrowserPage = (data) => {
  return `${API__LINK}/${data.seo.listingType}/${data.seo.countryName}/${data.seo.cityName}/${data.seo.category}/${data.seo.propertyType}/${data.id}`;
};

const linkToMap = (data) => {
  return `https://www.google.com/maps?q=${data.location?.latitude},${data.location?.longitude}`;
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

const hasNextPage = (total, take, skip) => {
    const displayed = skip + take;
    return displayed < total;
}

const printShowMore = (total, take, skip) => {
    const hastNext = hasNextPage(total, take, skip);
    if ($request.channelType === "telegram") {
        const buttons = hastNext ? [{text: "Show more"}, {text: "Сlear filters"}] : [{text: "Сlear filters"}];
        $response.replies.push({
            type: "buttons",
            buttons
        });
    } else if (hastNext) {
        $response.replies.push({
            type: "text",
            markup: 'markdown',
            text: `To see more results, just say \*Show more\*`,
        });
    } else {
        $response.replies.push({
            type: "text",
            markup: 'markdown',
            text: `There are no more results, you can clear the filters with the **Reset** command`,
        });
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
                const propertyDetails = 
                    `${listing.listingType !== null ? `${listing.listingType}` : ''} ${listing.price !== null ? `\*${listing.price} €\* \n` : ''}` +
                    `${listing.location !== null && listing.location.city !== null && listing.location.city.name !== null ? `${listing.location.city.name} \n` : ''}` +
                    `${listingData.floorArea !== null ? `- Property area: \*${listingData.floorArea}m²\* \n` : ''}` +
                    `${listingData.bedrooms !== null ? `- Bedrooms: ${listingData.bedrooms} \n` : ''}` +
                    `${(listingData.furnishing !== null && $session.data.furnishing.length) ? `- Furnishing: \*${listingData.furnishing}\* \n` : ''}` +
                    `${(listingData.balcony !== null && $session.data.balcony.length) ? `- Balcony: ${listingData.balcony ? "+" : "-"} \n` : ''}` +
                    `${(listingData.bathrooms !== null && false) ? `- Bathrooms: ${listingData.bathrooms} \n` : ''}` +
                    `${(listingData.parking !== null && $session.data.parking.length) ? `- Parking: ${listingData.parking ? "+" : "-"} \n` : ''}` +
                    `${(listingData.electricity !== null && $session.data.electricity.length) ? `- Electricity: ${listingData.electricity ? "+" : "-"} \n` : ''}` +
                    `${(listingData.television !== null && $session.data.television.length) ? `- Television: ${listingData.television ? "+" : "-"} \n` : ''}` +
                    `${(listingData.alarmSystem !== null && $session.data.alarmSystem.length) ? `- Alarm system: ${listingData.alarmSystem ? "+" : "-"} \n` : ''}` +
                    `${(listingData.gas !== null && $session.data.gas.length) ? `- Gas: ${listingData.gas ? "+" : "-"} \n` : ''}` +
                    `${(listingData.heating !== null && $session.data.heating.length) ? `- Heating: ${listingData.heating} \n` : ''}` +
                    `${(listingData.waterHeating !== null && $session.data.waterHeating.length) ? `- Water heating: ${listingData.waterHeating} \n` : ''}` +
                    `${(listingData.internet !== null && $session.data.internet.length) ? `- Internet: ${listingData.internet} \n` : ''}` +
                    `${(listingData.airConditioning !== null && $session.data.airConditioning.length) ? `- Air conditioning: \*${listingData.airConditioning}\* \n` : ''}` +
                    `${listingData.infrastructureAmenity !== null ? `- Infrastructure amenities: ${listingData.infrastructureAmenity.map(v => v.toLowerCase().replace(/_/g, ' ')).join(', ')} \n` : ''}` +
                    `${(listingData.repairAmenity !== null && $session.data.repair.length) ? `- Repair amenities: ${listingData.repairAmenity}` : ''}`
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
                        markup: 'markdown',
                        text: `\*${listing.title.trim()}\* \n` +
                            `\*ID: ${listing.id}\* \n` +
                            `${propertyDetails} \n` +
                            `[Show in browser](${linkToBrowserPage(listing)})`,
                    }
                );
            });
            printShowMore(res.data.total, 3, sessionData.skip);
            return true;
        } else {
            printShowMore(res.data.total, 3, sessionData.skip);
            return false;
        }
    } catch (error) {
        $reactions.answer(
            "Something's broken, please try again later. Sorry"
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
    
    let turndownService = new TurndownService();
    const description = turndownService.turndown(listing.description).replaceAll('-','-');

    $response.replies.push(...images, {
        type: "text",
        markup: 'markdown',
        text: `\*${listing.title.trim()}\*\n\*€${listing.price}\*`,
    });
  
    $response.replies.push({
        type: "text",
        markup: 'html',
        text: `${description}`,
    });
  
    $response.replies.push({
        type: "text",
        markup: 'markdown',
        text: `[Show in browser](${linkToBrowserPage(listing)})
[Show on map](${linkToMap(listing)})`,
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
        markup: 'markdown',
        text: `\*${seller.firstName} ${seller.lastName}\*
${seller.email}
${seller.phoneNumber}`,
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

const printHelpText = () => {
    const texts = [
        'To start the search, you need to state the location, property type(house, villa, apartment, commerce, plot), listing type (rent or buy) and budget. For example, \*I want to buy a house in Limassol with the budget above 10k$\*',
        "Here is the list of benefits you can type: \n - Alarm system \n - Air conditioning \*(Everywhere, Only bedrooms, No)\* \n - Balcony \n - Building condition \*(Ready To move in , Under construction)\* \n - Condition \*(New , Well maintaned, Needs renovation)\* \n - Kitchen \n - Parking \n - Natural gas \n - Electricity \n - Internet \*(No, Wi-Fi, Cable, Mobile)\* \n - Heating \*(No, Central, Gas, Elctric, Liquid fuel)\* \n - Water heating \*(No, Central, Boiler, Solar system, Photovoltaic system)\* \n - Amenities \*(Near the school, Near the park, Calm district, In the center, Parking place, Beautiful view, Sauna, Sea view, Security, Storage, Near the subway, Near the kindergarten, Near the sea, Near the lake, With garden, With garage)\*",
        "If, when adding parameters to a query, at some point you encounter a lack of search results, you can cancel the last entered value using the \*Undo\* command.",
        "To get more details on a specific property, enter \"\*show by\* \_id property\_\". You can also use the \"\*details for\* \_first|last\_ \*one\*\" commands after the listing is displayed.",
        "If you would like to restart the conversation and clear all previous information, simply say \*Reset\*"
    ]
    
    texts.map((text) =>
    {
        $response.replies.push({
            type: "text",
            markup: 'markdown',
            text,
        });
    });
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
  copyObjectWithoutFields,
  printHelpText
};
