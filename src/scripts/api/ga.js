//@ts-check
import axios from "axios";

const ENDPOINT = {
    post__data: "collect",
};

const API_LINK = `https://www.google-analytics.com/mp/`;

export const instance = axios.create({
    baseURL: `${API_LINK}`,
    timeout: 10000,
    headers: {
        "Cache-Control": "no-cache",
        "Content-type": "application/json",
    },
});

/**
 * @param {string} client_id
 * @param {string} name
 * @param {Object} params
 */
const ga = async (client_id, name, params) => {
    const payload = {
        client_id,
        events: [
            {
                name,
                params,
            },
        ],
    };

    try {
        const response = await instance.post(ENDPOINT.post__data, payload, {
            params: {
                measurement_id: ``,
                api_secret: ``,
            },
        });

        log({
            function: "postGA",
            input: { client_id, name, params },
            output: { response },
        });
    } catch (error) {
        log({
            function: "postGA",
            input: { client_id, name, params },
            output: { error },
        });
    }
};

export default { ga };
