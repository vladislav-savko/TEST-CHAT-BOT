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

const getCityInfo = async (city) => {
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
  getCityInfo,
  getListing,
};

export function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  var keys1 = Object.keys(obj1);
  var keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (var i = 0; i < keys1.length; i++) {
    var key = keys1[i];
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}
