import response from "../../response.js";

export default async () => {
    response.channel("sendChatAction", { action: "typing" });
    $reactions.transition({ value: "/Preprocess", deferred: true });
};
