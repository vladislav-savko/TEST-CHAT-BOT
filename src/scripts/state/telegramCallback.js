import { getListingById } from "../utilits.js";

export default async () => {
    $request.query = $request.query.replace("by ", '');
    if (Number($request.query)) {
        const index = parseInt($request.query);
        await getListingById(index);
    } else if ($request.query === "Seller Contacts") {
        $reactions.transition("/TelegramCallback/Seller");
    }
};
