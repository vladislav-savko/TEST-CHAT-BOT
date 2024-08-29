const log = (text) => {
    $reactions.answer(toPrettyString(text));
};

const text = (text, markup = "markdown") => {
    $response.replies.push({
        type: "text",
        markup,
        text,
    });
};

const randomText = (textArray, markup = "markdown") => {
    const randomIndex = Math.floor(Math.random() * textArray.length);
    const text = textArray[randomIndex];

    $response.replies.push({
        type: "text",
        markup,
        text,
    });
};

const buttons = (textArray) => {
    const buttons = textArray.map((text) => {
        return {
            text,
        };
    });

    $response.replies.push({
        type: "buttons",
        buttons,
    });
};

const inlineURL = (text, url) => {
    $reactions.inlineButtons({
        text,
        url,
    });
};

const inlineCallback = (text, callback_data) => {
    $reactions.inlineButtons({
        text,
        callback_data,
    });
};

const image = (imageUrl) => {
    $response.replies.push({
        type: "image",
        imageUrl,
    });
};

const imagesTG = (imageUrlArray) => {
    if (imageUrlArray.length < 2) {
        image(imageUrlArray[0]);
        return;
    }

    const chunkSize = 10;
    const allImages = [];

    for (let i = 0; i < imageUrlArray.length; i += chunkSize) {
        const chunk = imageUrlArray.slice(i, i + chunkSize).map((imageUrl) => ({
            type: "photo",
            media: imageUrl,
        }));

        allImages.push({
            type: "raw",
            body: {
                media: chunk,
            },
            method: "sendMediaGroup",
        });
    }

    $response.replies.push(...allImages);
};

const images = (imageUrlArray) => {
    const images = imageUrlArray.map((image) => {
        return {
            type: "image",
            imageUrl: image,
        };
    });

    $response.replies.push(...images);
};

export default {
    log,
    text,
    randomText,
    buttons,
    inlineURL,
    inlineCallback,
    image,
    images,
    imagesTG,
};
