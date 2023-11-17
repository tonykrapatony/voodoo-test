export default async function getProductRecomend(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}
