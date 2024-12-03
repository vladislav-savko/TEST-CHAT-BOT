import axios from "axios";

import { API__LINK } from "./config.js";

const ENDPOINT = {
    // get__cities: "cities/search",
    get__cities: "city/search-into-database",
    //https://anisad.com/api/cities/search?take=10&pattern=nicosia
    //https://anisad.com/api/city/search-into-database?take=10&pattern=cyprus
    // post__listing: "listing/search",
    post__listing: "elastic-search/search-extended",
    // post__listing: "elastic-search/filter-by-elastic",
    //https://anisad.com/api/listing/search
    get__listing_by_id: "listing",
    //https://anisad.com/api/listing/6255
    get__seller_by_id: "user/by-listing",
    //https://anisad.com/api/user/by-listing/6255
};

export const instance = axios.create({
    baseURL: `${API__LINK}/api/v1/`,
    timeout: 10000,
    "Cache-Control": "no-cache",
    "Content-type": "application/json",
});

const getCitiesInfo = async (city, country) => {
    const patt = city && country ? `${city}, ${country}` : city || country;
    log(patt);
    const { data } = await instance.get(ENDPOINT.get__cities, {
        params: {
            pattern: patt,
            take: 1,
        },
    });

    return data.data.length > 1 ? [data.data[0]] : data.data;
};

const getCountriesInfo = async (country) => {
    const { data } = await instance.get(ENDPOINT.get__cities, {
        params: {
            pattern: country, // Use country directly
            take: 1,
        },
    });

    return data.data.length > 1 ? [data.data[0]] : data.data;
};

const getListing = async (info) => {
    // $reactions.answer(JSON.stringify(info));
    const { data } = await instance.post(ENDPOINT.post__listing, info);
    // $reactions.answer(JSON.stringify(data));
    return data;
};

const getListingById = async (id) => {
    // $reactions.answer(JSON.stringify(id));
    const URL = `${ENDPOINT.get__listing_by_id}/${id}`;
    const { data } = await instance.get(URL);
    // log(data.data);
    return data;
};

const getSellerById = async (id) => {
    const URL = `${ENDPOINT.get__seller_by_id}/${id}`;
    const { data } = await instance.get(URL);
    return data;
};

export const translate = async (text, sourceLang) => {
    const lang = $session.lang === "gr" ? "el" : $session.lang;

    const response = await axios.get(
        `https://suapi.net/api/text/translate?to=${lang}&text[]="${text}"`,
        {
            timeout: 25000,
        }
    );

    log(response);

    if (response && response.code === 200) {
        return response;
    } else {
        const fallbackResponse = await axios.get(
            `https://translate.cloudflare.jaxing.cc/?text=${text}&source_lang=${sourceLang}&target_lang=${lang}`,
            {
                timeout: 25000,
            }
        );
        return fallbackResponse;
    }
};

export default {
    getCitiesInfo,
    getCountriesInfo,
    getListing,
    getListingById,
    getSellerById,
};
