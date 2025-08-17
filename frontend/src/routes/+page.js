export async function load({ fetch }) {
    const res = await fetch('http://localhost:3001/api/v1/products');
    const products = await res.json();

    return {
        products
    };
}