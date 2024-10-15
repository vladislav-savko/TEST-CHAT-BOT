import { initSession, session } from "../../../utilits.js";
import local from "../../../local/local.js";
import response from "../../../response.js";

export default async () => {
    initSession();
    session();

    const { lang } = $session;

    if (!lang) {
        $reactions.transition("/SwitchInterfaceLanguage");
    } else {
        response.randomText(local(lang).hello);
        response.text(local(lang).info.about);

        if ($request.channelType === "telegram") {
            response.buttons(['/info']);
        }
    }
};
