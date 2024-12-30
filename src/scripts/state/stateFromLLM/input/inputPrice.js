import local from "../../../local/local.js";
import response from "../../../response.js";

export default async () => {
    const { lang } = await $session;
    const { propertyTypes, listingType } = await $session.data;

    const PRICE = {
        APARTMENT: {
            SALE: {
                lowCost: [0, 50000],
                midRange: [50000, 150000],
                premium: [150000, 300000],
                luxury: [300000, null],
            },
            RENT: {
                lowCost: [0, 500],
                midRange: [500, 1500],
                premium: [1500, 3000],
                luxury: [3000, null],
            },
        },
        HOUSE: {
            SALE: {
                lowCost: [0, 100000],
                midRange: [100000, 300000],
                premium: [300000, 600000],
                luxury: [600000, null],
            },
            RENT: {
                lowCost: [0, 1000],
                midRange: [1000, 3000],
                premium: [3000, 6000],
                luxury: [6000, null],
            },
        },
        COMMERCE: {
            SALE: {
                lowCost: [0, 50000],
                midRange: [50000, 250000],
                premium: [250000, 500000],
                luxury: [500000, null],
            },
            RENT: {
                lowCost: [0, 1000],
                midRange: [1000, 5000],
                premium: [5000, 10000],
                luxury: [10000, null],
            },
        },
        PLOT: {
            SALE: {
                lowCost: [0, 10000],
                midRange: [10000, 50000],
                premium: [50000, 200000],
                luxury: [200000, null],
            },
            RENT: {
                lowCost: [0, 100],
                midRange: [100, 500],
                premium: [500, 2000],
                luxury: [2000, null],
            },
        },
    };

    const getProperty = (propertyTypes) => {
        const propertyMapping = {
            APARTMENT: ["APARTMENT"],
            HOUSE: ["VILLA", "DETACHED_HOUSE", "SEMIDETACHED_HOUSE"],
            COMMERCE: [
                "OFFICE",
                "HOTEL",
                "MANUFACTURING",
                "RETAIL_SPACE",
                "PUBLIC_CATERING_FACILITY",
                "WAREHOUSE",
                "CAR_PARKING",
                "SHOP",
                "RESTAURANT",
                "OTHER_COMMERCIAL",
            ],
            PLOT: ["COMMERCIAL_PLOT", "RESIDENTIAL_PLOT", "AGRICULTURE_PLOT"],
        };

        for (const [key, values] of Object.entries(propertyMapping)) {
            if (propertyTypes.some((value) => values.includes(value))) {
                return PRICE[key];
            }
        }
    };

    const getPrice = (listingType) => {
        const property = getProperty(propertyTypes);
        return ["RENT", "SHORT_RENT"].includes(listingType)
            ? property.RENT
            : property.SALE;
    };

    _price = getPrice(listingType);

    response.text(local(lang).getProperty.budget);
    response.inlineCallback(
        `<=${_price.lowCost[1]}€`,
        _price.lowCost.join("-")
    );
    response.inlineCallback(
        `${_price.midRange[0]}-${_price.midRange[1]}€`,
        _price.midRange.join("-")
    );
    response.inlineCallback(
        `${_price.premium[0]}-${_price.premium[1]}€`,
        _price.premium.join("-")
    );
    response.inlineCallback(`=>${_price.luxury[0]}€`, _price.luxury.join("-"));
};
