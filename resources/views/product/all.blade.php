
<x-app-layout>
    <article class="mx-4 mt-12 sm:mt-1 p-2 rounded-xl bg-claro dark:bg-gray-300 shadow-lg hover:shadow-xl">
        <div class="overflow-x-auto shadow-md rounded-lg">
            <table class="w-full text-sm text-left text-cor-80 rounded-lg">
                <thead class="text-xs text-claro uppercase border-b-2 border-claro bg-gradient-to-r from-cor-70 to-cor-50">
                    <tr>
                        <th scope="col" class="px-3 py-3 max-sm:hidden"><a href="/products/ord/{{'category_id'}}" title="Agrupar por categoria">Categoria</a></th>
                        <th scope="col" class="px-3 py-3"><a href="/products/ord/{{'description'}}" title="Ordenar pela descrição">Descrição</a></th>
                        <th scope="col" class="px-3 py-3 text-right"><a href="/products/ord/{{'value'}}" title="Ordenar pelo valor">Valor</a></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($products as $product)
                        <tr class="even:bg-cinza-claro  odd:bg-bege hover:bg-cor-50 h-6">
                            <td class="px-3 py-1 text-cor-80 max-sm:hidden">{{$product->category->name}}</td>
                            <td class="flex px-3 py-1">
                                <a href="/product/{{$product->id}}">
                                    <img class="w-10 h-10 rounded-full" src="/img/products/{{$product->image}}" alt="Imagem do produto">
                                </a>
                                <div class="pl-3">
                                    <div class="font-semibold">{{$product->description}}</div>
                                    <div class="font-extralight text-cor-80">
                                        @if(Auth::user()->configuration->stock)
                                            @if($product->amount == 0)
                                                <span class="text-cor-70 font-semibold">Indisponível!</span>
                                            @elseif ($product->amount == 1)
                                                <span class="text-cor-70 font-semibold">Última unidade!</span>
                                            @else
                                            <span class="text-cor-60">Estoque: {{$product->amount}} un</span>
                                            @endif
                                        @else
                                            {{$product->brand}}
                                        @endif
                                    </div>
                                </div>
                            </td>
                            <td class="text-right text-cor-80 px-3 py-1">R$ {{ $product->value }}</td>
                            <td class="text-center px-2"><i class="fas fa-eye hover:text-success ml-2 cursor-pointer" title="{{ __('View') }}" onclick="view({{$product->id}})"></i></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </article>

    <button type="button" data-modal-target="add-product-modal" data-modal-toggle="add-product-modal" title="{{ __('Add Product') }}"
    class="fixed z-90 bottom-7 right-8 bg-primary w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-primary/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
    <i class="fas fa-box"></i>
    </button>

    @include('modals.add-product')
    @include('modals.add-category')
</x-app-layout>
