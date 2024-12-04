//@ts-check
import axios from "axios";
import { API__LINK } from "./config.js";

const ENDPOINT = {
    get__cities: "city/search-into-database",
    post__listing: "elastic-search/search-extended",
    get__listing_by_id: "listing",
    get__seller_by_id: "user/by-listing",
    get__translate_listing_by_id: "listing",
};

export const instance = axios.create({
    baseURL: `${API__LINK}/api/v1/`,
    timeout: 10000,
    headers: {
        "Cache-Control": "no-cache",
        "Content-type": "application/json",
    },
});

const getCitiesInfo = async (city, country) => {
    const patt = city && country ? `${city}, ${country}` : city || country;
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
            pattern: country,
            take: 1,
        },
    });

    return data.data.length > 1 ? [data.data[0]] : data.data;
};

const getListing = async (info) => {
    const { data } = await instance.post(ENDPOINT.post__listing, info);
    return data;
};

const getListingById = async (id) => {
    const URL = `${ENDPOINT.get__listing_by_id}/${id}`;
    const { data } = await instance.get(URL);
    return data;
};

const getSellerById = async (id) => {
    const URL = `${ENDPOINT.get__seller_by_id}/${id}`;
    const { data } = await instance.get(URL);
    return data;
};

/**
 * @typedef {Object} TranslateListing
 * @property {string} title - Заголовок записи.
 * @property {string} description - Описание записи.
 * @property {string} updatedAt - Дата последнего обновления записи.
 */

/**
 * Получает перевод записи по её ID и языковому коду.
 *
 * @param {string} id - Уникальный идентификатор записи.
 * @param {string} lang - Код языка перевода (например, "en", "pl", ).
 * @returns {Promise<TranslateListing>} Промис, который разрешается в объект перевода записи.
 *
 */
const getTranslateListing = async (id, lang) => {
    const URL = `${ENDPOINT.get__translate_listing_by_id}/${id}/${lang}`;
    /** @type {Axios.AxiosXHR<{data: TranslateListing}>} */
    const { data } = await instance.get(URL);
    return data.data;
};

export default {
    getCitiesInfo,
    getCountriesInfo,
    getListing,
    getListingById,
    getSellerById,
    getTranslateListing,
};
