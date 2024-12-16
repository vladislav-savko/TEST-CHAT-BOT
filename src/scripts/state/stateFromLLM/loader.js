import response from "../../response.js";
import axios from "axios";

export default async () => {
    const chanel = await $request.channelType;
    const isTelegram = chanel === "telegram";

    if (isTelegram) {
        try {
            const TG_TOKEN = $env.get("TG_TOKEN", "ERROR");
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
