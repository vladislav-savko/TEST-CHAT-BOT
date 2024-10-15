export default async () => {
    $session.data.skip += 3;
    $session.state = "Show more";
    $reactions.transition("/DisplayResult");
};
