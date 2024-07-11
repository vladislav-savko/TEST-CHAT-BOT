import { session } from "../utilits.js";

export default async () => {
    session();
    $reactions.transition("/Start");
};
