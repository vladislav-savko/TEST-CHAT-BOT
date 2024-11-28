import { getListingById } from "../../../utilits.js";

export default async () => {
    const value = $request.query.replace("by ", "").split(".")[0];
    if (Number(value)) {
        const index = parseInt(value);
        await getListingById(index);
    } else if (value === "Seller Contacts") {
        $reactions.transition("/TelegramCallback/Seller");
    } else if (value.includes("Clear parament")) {
        log($request.rawRequest.callback_query.message);
        const messageId = await $request.rawRequest.callback_query.message.message_id;
        $session.filters.messageId = messageId;
        // $reactions.transition("/DisplayResult/FiltersInfo");
    }
};
