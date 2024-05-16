
<x-app-layout>
    <article class="mx-4 mt-12 sm:mt-1 p-2 rounded-xl bg-claro dark:bg-gray-800 shadow-lg hover:shadow-xl">

        <div class="px-4 py-4 lg:px-8">
            <h2 class="mb-6 text-xl uppercase text-cor-70 dark:text-gray-200 font-bold"><i class="fas fa-box fa-lg"></i>&nbsp;</i>&nbsp;&nbsp;{{$product->category->type}} > {{$product->category->name}} > {{ $product->description}}</h2>
                <div class="md:flex justify-center md:columns-2">
                    <div class="text-center">
                        <button type="button" data-modal-target="image-product-modal" data-modal-toggle="image-product-modal" title="{{ __('Update Image') }}" class="md:pr-8">
                            <img class="rounded-lg" src="/img/products/{{ $product->image }}" alt="foto" />
                        </button>
                    </div>
                    @php( $product->cost == 0 ? $margem = 0 : $margem = (($product->value / $product->cost) *100)-100 )
                    <div class="place-items-center p-4">
                            <p class="text-cor-80 dark:text-gray-200 font-bold">Descrição: {{$product->description}}</p>
                            <p class="text-cor-60 dark:text-gray-300 font-semibold">Fabricante: {{$product->brand}}</p>
                            <p class="text-cor-50 dark:text-gray-300 font-medium">Preço de custo: R$ {{number_format($product->cost, 2, ',', '.')}}</p>
                            <p class="text-cor-80 dark:text-gray-200 font-medium">Preço de venda: R$ {{number_format($product->value, 2, ',', '.')}}</p>
                            <p class="text-cor-50 dark:text-gray-300 font-light">Margem de lucro: {{number_format($margem, 2, ',', '.')}}%</p>
                            @if(Auth::user()->configuration->stock)
                                <p class="text-cor-70 dark:text-gray-300 font-light">Quantidade em estoque: {{$product->amount}}</p>
                            @endif
                    </div>
                </div>

        </div>
    </article>

    <button type="button" onclick="deleteProduct({{$product->id}})" title="{{ __('Remove Product') }}"
    class="fixed z-90 bottom-7 right-8 bg-danger w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-danger/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
    <i class="fas fa-trash"></i>
    </button>
    <button type="button" data-modal-target="edit-product-modal" data-modal-toggle="edit-product-modal" title="{{ __('Edit Product') }}"
    class="fixed z-90 bottom-7 right-32 bg-warning w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-warning/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
    <i class="fas fa-edit"></i>
    </button>

    @include('modals.edit-product')
    @include('modals.image-product')
    @include('modals.add-category')
</x-app-layout>
