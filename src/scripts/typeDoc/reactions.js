/**
 * @typedef {Object} Button
 * @property {string} text - Текст кнопки.
 * @property {any} payload - Данные, отправляемые при нажатии на кнопку.
 */

/**
 * @typedef {Object} InlineButton
 * @property {string} text - Текст инлайн-кнопки.
 * @property {any} payload - Данные, отправляемые при нажатии на кнопку.
 */

/**
 * @typedef {Object.<string, string>} Variables - Объект переменных для синтеза речи.
 */

/**
 * Встроенный сервис ответов (документация не точная)
 * @type {{
 *   answer: (text: string) => void,
 *   audio: (audioUrl: string) => void,
 *   buttons: (buttons: Button[]) => void,
 *   getClientTimezone: () => string,
 *   inlineButtons: (inlineButtons: InlineButton[]) => void,
 *   location: (latitude: number, longitude: number) => void,
 *   random: (min: number, max: number) => number,
 *   setClientTimezone: (timezone: string) => void,
 *   timeout: (timeout: number, nextState: string) => void,
 *   transition: (state: State) => void,
 *   ttsWithVariables: (text: string, variables: Variables) => void,
 *   video: (videoUrl: string) => void
 * }}
 */
var $reactions;