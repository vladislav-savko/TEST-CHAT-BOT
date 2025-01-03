//@ts-check
import axios from "axios";
import { API__LINK } from "../config.js";
import response from "../response.js";

const ENDPOINT = {
    get__cities: "city/search-into-database",
    post__listing: "elastic-search/search-extended",
    get__listing_by_id: "listing",
    get__seller_by_id: "user/by-listing",
    get__translate_listing_by_id: "listing",
    post__history: (userId) => `bot/users/${userId}/history`,
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

    log({
        function: "getCitiesInfo_API",
        input: { city, country },
        output: { data },
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

    log({ function: "getCountriesInfo", input: { country }, output: { data } });

    return data.data.length > 1 ? [data.data[0]] : data.data;
};

const getListing = async (filters) => {
    const { data } = await instance.post(ENDPOINT.post__listing, filters);

    log({ function: "getListings_API", input: { filters }, output: { data } });

    return data;
};

const getListingById = async (id) => {
    const URL = `${ENDPOINT.get__listing_by_id}/${id}`;
    const { data } = await instance.get(URL);

    log({ function: "getListingById_API", input: { id }, output: { data } });

    return data;
};

/**
 *
 * @param {number} id
 * @returns
 */
const getSellerById = async (id) => {
    const URL = `${ENDPOINT.get__seller_by_id}/${id}`;
    const { data } = await instance.get(URL);

    log({ function: "getSellerById_API", input: { id }, output: { data } });

    return data;
};

/**
 * @typedef {Object} ListingTranslate
 * @property {string} title - Заголовок записи.
 * @property {string} description - Описание записи.
 * @property {string} updatedAt - Дата последнего обновления записи.
 */

/**
 * Получает перевод записи по её ID и языковому коду.
 *
 * @param {string} id - Уникальный идентификатор записи.
 * @param {string} lang - Код языка перевода (например, "en", "pl", ).
 * @returns {Promise<ListingTranslate>} Промис, который разрешается в объект перевода записи.
 *
 */
const getTranslateListing = async (id, lang) => {
    const URL = `${ENDPOINT.get__translate_listing_by_id}/${id}/${lang}`;
    /** @type {Axios.AxiosXHR<{data: ListingTranslate}>} */
    const { data } = await instance.get(URL);

    log({
        function: "getTranslateListing_API",
        input: { id, lang },
        output: { data },
    });

    return data.data;
};

/**
 * Постит историю пользователя.
 *
 * @param {string} userId - Уникальный идентификатор пользователя.
 * @param {Object} body - Тело запроса.
 * @param {string} body.type - Тип записи в истории.
 * @param {string} body.value - ListingId или massage
 * @param {Object} body.filters - Фильтра для поиска
 * @returns {Promise<void>} - Промис, который выполняется, когда запрос завершён.
 */
const postHistory = async (userId, body) => {
    const URL = ENDPOINT.post__history(userId);

    try {
        await instance
            .post(URL, body)
            .then((response) => log(response))
            .catch((error) => log(error));
    } catch (error) {
        log(error);
    }
};

export default {
    getCitiesInfo,
    getCountriesInfo,
    getListing,
    getListingById,
    getSellerById,
    getTranslateListing,
    postHistory,
};
