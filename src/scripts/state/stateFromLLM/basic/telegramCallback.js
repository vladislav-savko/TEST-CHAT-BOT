import { getListingById } from "../../../utilits.js";

export default async () => {
    const value = await $request.query.replace("by ", "").split(".")[0];
    if (value.includes("Show details for")) {
        let id = null;
        const match = value.match(/\d+/);
        if (match) {
            id = parseInt(match[0], 10);
        }
        await getListingById(id);
    } else if (value.includes("Seller Contacts")) {
        let id = null;
        const match = value.match(/\d+/);
        if (match) {
            id = parseInt(match[0], 10);
            $session.seller = id;
        }
        $reactions.transition("/ShowByIndex/Seller");
    } else if (value.includes("Clear parament")) {
        const messageId = await $request.rawRequest.callback_query.message
            .message_id;
        $session.filters.messageId = messageId;
        $session.filters.param = value.split("Clear parament ")[1];
        $reactions.transition("/DisplayResult/FiltersInfo");
    }
};
