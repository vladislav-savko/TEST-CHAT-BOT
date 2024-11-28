import { getFiltersInfo } from "../utilits.js";

export default async () => {
    log(await $session);
    await getFiltersInfo();
};
