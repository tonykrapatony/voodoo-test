export default async function getProducts(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}
