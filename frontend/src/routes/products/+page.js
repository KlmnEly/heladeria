// @ts-nocheck
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
    try {
        const res = await fetch('http://localhost:3001/api/v1/products');

        const products = await res.json();
        
        return { products };
    } catch (err) {
        throw error(500, 'Error del servidor: No se pudo conectar a la API.');
    }
}