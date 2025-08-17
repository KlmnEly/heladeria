<script>
    import ProductCard from '$lib/ProductCard.svelte';
    
    // "data" contiene lo que "load" retornó.
    export let data; 
</script>

<div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">Nuestros Deliciosos Productos</h1>
    
    {#if data.products && data.products.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {#each data.products as product (product.id_product)}
                <ProductCard {product} />
            {/each}
        </div>
    {:else}
        <p class="text-center text-gray-500">No hay productos disponibles en este momento.</p>
    {/if}
</div>