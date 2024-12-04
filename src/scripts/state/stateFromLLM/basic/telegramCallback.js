import { getListingById } from "../../../utilits.js";

export default async () => {
    const value = await $request.query.replace("by ", "").split(".")[0];
    if (Number(value)) {
        const index = parseInt(value);
        await getListingById(index);
    } else if (value === "Seller Contacts") {
        $reactions.transition("/TelegramCallback/Seller");
    } else if (value.includes("Clear parament")) {
        const messageId = await $request.rawRequest.callback_query.message
            .message_id;
        $session.filters.messageId = messageId;
        $session.filters.param = value.split("Clear parament ")[1];
        $reactions.transition("/DisplayResult/FiltersInfo");
    } else if (value.includes("Show details for")) {
        const match = value.match(/\d+/);
        if (match) {
            const id = parseInt(match[0], 10);
            $session.lastData = { id };
        }

        $reactions.transition("/ShowByIndex");
    }
};
