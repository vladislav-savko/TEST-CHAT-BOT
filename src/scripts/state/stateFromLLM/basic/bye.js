import local from "../../../local/local.js";
import response from "../../../response.js";

export default async () => {
    const { lang } = await $session;
    response.randomText(local(lang).bye);
};
