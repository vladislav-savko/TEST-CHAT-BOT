import { findLastNonSwitchState, getListingById } from "../../../utilits.js";

export default async () => {
    const value = $request.query.replace("by ", "").split(".")[0];
    if (Number(value)) {
        const index = parseInt(value);
        await getListingById(index);
    } else if (value === "Seller Contacts") {
        $reactions.transition("/TelegramCallback/Seller");
    } else if (value.includes("Clear parament")) {
        const lastTransition = findLastNonSwitchState(
            $session.transitionsHistory
        );
        const { state: lastState } = lastTransition;
        if (lastState === "/DisplayResult/FiltersInfo") {
            await log($response);
        }
        $reactions.transition("/DisplayResult/FiltersInfo");
    }
};
