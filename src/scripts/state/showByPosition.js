import { getListingById } from "../utilits.js";
import local from "../local/local.js";
import response from "../response.js";

export default async () => {
    // $reactions.answer(JSON.stringify($parseTree));

    const position = $parseTree.details_for_position?.[0]?.value?.position;
    const hasSessionIds = $session.ids.length > 0;

    const getIndexByPosition = (position) => {
        if (position === "last") return $session.ids[$session.ids.length - 1];
        if (position === "first") return $session.ids[0];
        if (position === "second") return $session.ids[1];
        return null;
    };

    const handleReactions = async () => {
        const { lang } = $session;

        if (hasSessionIds) {
            const index = getIndexByPosition(position);
            if (index !== null) {
                await getListingById(index);
            } else {
                response.text(local(lang).fetchErrors.invalidPositionValue);
            }
        } else {
            response.text(local(lang).fetchErrors.noSearchRequest);
        }
    };

    await handleReactions();
};
