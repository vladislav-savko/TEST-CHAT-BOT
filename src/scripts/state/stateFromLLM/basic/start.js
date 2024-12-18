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
        if ($request.channelType !== "yandex") {
            response.randomText(local(lang).hello);
            response.text(local(lang).info.about);
        } else {
            $reactions.answer(local(lang).hello[0]);
            $reactions.answer(local(lang).info.about);
        }

        if ($request.channelType === "telegram") {
            response.buttons(["/info"]);
        }
    }
};
