export default async function delay(time: number) {
    await new Promise((resolve, _) => {
        setInterval(resolve, time);
    });
}