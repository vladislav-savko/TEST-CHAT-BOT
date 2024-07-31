import { initSession, session } from "../utilits.js";
import local from "../local/local.js";
import response from "../response.js";

export default async () => {
    initSession();
    session();

    const { lang } = $session;

    $reactions.answer(toPrettyString($session));

    response.randomText(local(lang).hello);
    response.text(local(lang).info.about);
};
