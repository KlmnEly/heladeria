<script>
    export let product;
</script>

<div class="bg-white rounded-lg shadow-md p-6 m-4 flex flex-col items-center text-center">
    <h3 class="text-xl font-bold text-gray-800">{product.name}</h3>
    <p class="mt-2 text-gray-600">{product.description}</p>
    <p class="mt-4 text-2xl font-semibold text-green-600">${product.price}</p>
    <button class="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        Añadir al carrito
    </button>
</div>