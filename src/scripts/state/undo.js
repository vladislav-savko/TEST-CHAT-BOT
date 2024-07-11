export default async () => {
    $session.params = $session.lastParams;
    $reactions.transition("/Search/SwitchParams");
};
