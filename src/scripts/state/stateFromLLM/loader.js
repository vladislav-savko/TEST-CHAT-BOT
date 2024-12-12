import response from "../../response.js";
import axios from "axios";
import { TG_TOKEN } from "../../config.js";

export default async () => {
    const isTelegram = await $request.channelType === "telegram";

    if (isTelegram) {
        try {
            const chat_id = await $request.rawRequest.message.from.id;
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
        } catch {}
    }

    await $reactions.transition("/Preprocess");
};
