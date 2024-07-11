import { initSession, session } from "../utilits.js";
import local from "../local/local.js";
import response from "../response.js";

export default async () => {
    initSession();
    //$reactions.answer(JSON.stringify($session.data));
    //нужно удалить в проде (НАВЕРНОЕ, а может и так заебись)
    session();

    const { lang } = $session;
    response.randomText(local(lang).hello);
    response.text(local(lang).info.about);
};
