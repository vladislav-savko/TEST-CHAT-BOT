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

export default {
    text,
    randomText,
    buttons,
    inlineURL,
    inlineCallback,
    image,
};
