import response from "../../response.js";
import axios from "axios";
import { TG_TOKEN } from "../../config.js";

export default async () => {
    const isTelegram = $request.channelType === "telegram";

    if (isTelegram) {
        const chat_id = $request.rawRequest.message.from.id;
        await axios.post(
            `https://api.telegram.org/bot${TG_TOKEN}/sendChatAction`,
            {
                chat_id,
                action: "typing",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    await $reactions.transition("/Preprocess");
};
