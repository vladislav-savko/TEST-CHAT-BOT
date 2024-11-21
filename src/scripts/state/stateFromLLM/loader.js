import response from "../../response.js";
import axios from "axios";
import { TG_TOKEN } from "../../config.js";

export default async () => {
    // response.channel("sendChatAction", { action: "typing" });
    log(context);
    const chat_id = $context.rawRequest.message.from.id;
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
    await $reactions.transition("/Preprocess");
};
