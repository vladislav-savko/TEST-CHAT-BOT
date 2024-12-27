import response from "../../response.js";

const printFiltersNotification = async () => {

}

const printIdsNotification = async () => {

}

const printPostNotification = async (data, lang) => {
    const {image, text} = data;

    if (image) response.image(data?.image);
    if (text) response.text(text[lang]);
}

export default async () => {
    const { lang } = await $session;

    //button: {text: {ru, en...} callback_data}
    //tag: string// default: notification
    //type
    //  по фильтру
    //  по ids
    //  post
    //  по фильтру : object: Filter
    //  по ids : [123,123,123]
    //  post : image, text

    const data = await $request?.rawRequest?.eventData;

    if (data) {
        const TYPE = {
            FILTERS: "FILTERS",
            IDS: "IDS",
            POST: "POST",
        };

        switch (data.type) {
            case TYPE.FILTERS:
                printFiltersNotification(data, lang);
                break;
            case TYPE.IDS:
                printIdsNotification(data, lang);
                break;
            case TYPE.POST:
                printPostNotification(data, lang);
                break;
        }
    }
};
