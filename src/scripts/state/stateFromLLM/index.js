import start from "./basic/start.js";
import switchLanguage from "./basic/switchLanguage.js";
import noMatch from "./basic/noMatch.js";
import displayResults from "./basic/displayResults.js";
import restart from "./basic/restart.js";
import showByIndex from "./basic/showByIndex.js";
import seller from "./basic/seller.js";
import help from "./basic/help.js";
import showMore from "./basic/showMore.js";
import bye from "./basic/bye.js";
import filtersInfo from "./basic/filtersInfo.js";

import getLanguage from "./input/getLanguage.js";
import inputData from "./input/inputData.js";
import inputLocation from "./input/inputLocation.js";
import inputBedrooms from "./input/inputBedrooms.js";
import inputListingTypes from "./input/inputListingTypes.js";
import inputPropertyTypes from "./input/inputPropertyTypes.js";
import inputPrice from "./input/inputPrice.js";

import telegramCallback from "./basic/telegramCallback.js";

import preprocess from "./preprocess.js";
import loader from "./loader.js";

import newNotification from "../notification/newNotification.js";

import getPropertyTypes from "./input/InlineButtons/getPropertyTypes.js";
import getListingTypes from "./input/InlineButtons/getListingTypes.js";
import getPrice from "./input/InlineButtons/getPrice.js";

export default {
    preprocess,
    loader,

    start,
    switchLanguage,
    getLanguage,
    noMatch,
    displayResults,
    restart,
    showByIndex,
    seller,
    help,
    showMore,
    bye,
    filtersInfo,

    inputData,
    inputBedrooms,
    inputListingTypes,
    inputLocation,
    inputPrice,
    inputPropertyTypes,

    telegramCallback,

    newNotification,

    getPropertyTypes,
    getListingTypes,
    getPrice,
};
