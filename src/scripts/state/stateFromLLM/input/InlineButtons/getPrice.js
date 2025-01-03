import local from "../../../../local/local.js";
import response from "../../../../response.js";

export default async () => {
    const { lang } = await $session;
    
    const applyType = async (value, text) => {
        const reply = {
            body: {
                text: `${$request.rawRequest.callback_query.message.text}\n\n✅ *${text}*`,
                parse_mode: "Markdown",
                message_id:
                    $request.rawRequest.callback_query.message.message_id,
            },
            method: "editMessageText",
        };

        response.channel([reply]);

        $session.lastData = value;
        $reactions.transition("/InputData");
    };

    const value = await $request.query.split("GET_PRICE_")[1];

    let price = "";

    if (value !== "ANY") {
        const parsedRange = value.split("-").map(Number);
        price = parsedRange[1]
            ? `${local(lang).getProperty.price.from} ${parsedRange[0]} ${
                  local(lang).getProperty.price.to
              } ${parsedRange[1]}`
            : `${local(lang).getProperty.price.from} ${parsedRange[0]}`;

        if (parsedRange?.length) {
            applyType(
                {
                    priceFrom: parsedRange[0],
                    priceTo: parsedRange[1],
                },
                price
            );
        }
    } else {
        price = local(lang).getProperty.price[value];
        applyType(
            {
                priceFrom: 0,
                priceTo: null,
            },
            price
        );
    }
};
