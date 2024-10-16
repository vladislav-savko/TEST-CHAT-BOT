const log = (text) => $reactions.answer(toPrettyString(text));

const text = (text, markup = "markdown") =>
    $response.replies.push({ type: "text", markup, text });

const randomText = (textArray, markup = "markdown") => {
    const text = textArray[Math.floor(Math.random() * textArray.length)];

    $response.replies.push({ type: "text", markup, text });
};

const buttons = (textArray) =>
    $response.replies.push({
        type: "buttons",
        buttons: textArray.map((text) => ({ text })),
    });

const inlineURL = (text, url) => $reactions.inlineButtons({ text, url });

const inlineCallback = (text, callback_data) =>
    $reactions.inlineButtons({ text, callback_data });

const image = (imageUrl) => $response.replies.push({ type: "image", imageUrl });

const imagesTG = (imageUrlArray) => {
    if (imageUrlArray.length < 2) {
        image(imageUrlArray[0]);
        return;
    }

    const chunkSize = 10;
    const allImages = [];

    for (let i = 0; i < imageUrlArray.length; i += chunkSize) {
        const chunk = imageUrlArray
            .slice(i, i + chunkSize)
            .map((media) => ({ type: "photo", media }));
        allImages.push({
            type: "raw",
            body: { media: chunk },
            method: "sendMediaGroup",
        });
    }

    $response.replies.push(...allImages);
};

const images = (imageUrlArray) => {
    $response.replies.push(
        ...imageUrlArray.map((image) => ({ type: "image", imageUrl: image }))
    );
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
