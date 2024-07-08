import axios from "axios";

import { API__LINK } from "./config.js";

const ENDPOINT = {
  get__cities: "cities/search",
  //https://anisad.com/api/cities/search?take=10&pattern=nicosia
  post__listing: "listing/search",
  //https://anisad.com/api/listing/search
  get__listing_by_id: "listing",
  //https://anisad.com/api/listing/6255
  get__seller_by_id: "user/by-listing",
  //https://anisad.com/api/user/by-listing/6255
};

export const instance = axios.create({
  baseURL: `${API__LINK}/api/`,
  timeout: 1000,
  "Cache-Control": "no-cache",
  "Content-type": "application/json",
});

const getCitiesInfo = async (city, country) => {
  const take = 1;
  const patt = `${country},${city}`; // Concatenate country and city with a comma
  const { data } = await instance.get(ENDPOINT.get__cities, {
    params: {
      take: take,
      pattern: patt,
    },
  });
  if (data.data.length > 1) {
      data.data = [data.data[0]];
  }
  return data;
};

const getListing = async (info) => {
    //$reactions.answer(JSON.stringify(info));
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

export default {
  getCitiesInfo,
  getListing,
  getListingById,
  getSellerById,
};
