import { getListingById } from "../utilits.js";

export default async () => {
    const value = $request.query.replace("by ", '');
    if (Number(value)) {
        const index = parseInt(value);
        await getListingById(index);
    } else if (value === "Seller Contacts") {
        $reactions.transition("/TelegramCallback/Seller");
    }
};
