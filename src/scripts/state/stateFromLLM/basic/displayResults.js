import { getListings } from "../../../utilits.js";
import response from "../../../response.js";
import local from "../../../local/local.js";

export default async () => {
    if ($session.state !== "Show more") {
        $session.data.skip = 0;
    }

    const getListingSuccessfully = await getListings($session.data);
    
    // if (getListingSuccessfully) {
    //     $session.lastParams = $session.lastData;
    // } else {
    //     const { lang } = $session;
    //     response.text(local(lang).fetchErrors.noMoreListing);
    // }

    $session.state = "Display";
};
