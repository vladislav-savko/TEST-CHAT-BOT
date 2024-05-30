import axios from "axios";

import { API__LINK } from "./config.js";

const ENDPOINT = {
  get__cities: "cities/search",
  //https://anisad.com/api/cities/search?take=10&pattern=nicosia
  post__listing: "listing/search",
  //https://anisad.com/api/listing/search
};

export const instance = axios.create({
  baseURL: `${API__LINK}/api/`,
  timeout: 1000,
  "Cache-Control": "no-cache",
  "Content-type": "application/json",
});

const getCitiesInfo = async (city) => {
  const take = 1;

  const { data } = await instance.get(ENDPOINT.get__cities, {
    params: {
      take: take,
      pattern: city,
    },
  });
  return data;
};

const getListing = async (info) => {
  const { data } = await instance.post(
    ENDPOINT.post__listing,
    info
  );
  return data;
};

export default {
  getCitiesInfo,
  getListing,
};