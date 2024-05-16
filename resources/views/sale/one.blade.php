
<x-app-layout>
    <article class="mx-4 mt-12 sm:mt-1 p-2 rounded-xl bg-claro dark:bg-gray-800 shadow-lg hover:shadow-xl">

            <div class="px-4 py-6 lg:px-8">
                <div class="mb-6 lg:text-xl uppercase text-cor-70 dark:text-gray-200 font-bold lg:flex">
                    <div class="text-left lg:w-1/3">
                        <span><i class="fas fa-user fa-fw">&nbsp;</i>&nbsp;Cliente: {{$sale->client->name}}</span>
                    </div>
                    <div class="lg:text-center lg:w-1/3">
                        <span><i class="fas fa-shopping-cart fa-fw">&nbsp;</i>&nbsp;Venda #{{$sale->id}}</span>
                    </div>
                    <div class="lg:text-right lg:w-1/3">
                        <span><i class="fas fa-calendar-alt fa-fw" title="Última atualização"></i>&nbsp; {{ date('d/m/Y - H:i', strtotime($sale->updated_at))}}</span>
                    </div>
                </div>
                <div class="columns-1">
                    <div class="items">
                            <div class="mt-0 mb-8 relative overflow-x-auto shadow-md rounded-lg">
                                <table class="w-full text-sm text-left text-cor-80 rounded-lg">
                                    <thead class="text-xs text-claro uppercase border-b-2 border-claro bg-gradient-to-r from-cor-70 to-cor-50">
                                        <tr>
                                            <th scope="col" class="px-2 py-3 max-sm:hidden text-center">Item</th>
                                            <th scope="col" class="px-2 py-3 text-center">Qtde</th>
                                            <th scope="col" class="px-2 py-3 text-left">Item</th>
                                            <th scope="col" class="px-2 py-3 text-right max-sm:hidden">Valor Unitário</th>
                                            <th scope="col" class="px-2 py-3 text-right">Total do Item</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($sale->items as $item)
                                            <tr class="even:bg-cinza-claro  odd:bg-bege hover:bg-cor-50 text-cor-80 h-6">
                                                <td class='px-2 py-1 max-sm:hidden text-center'>#{{ $loop->index + 1 }}</td>
                                                <td class='px-2 py-1 text-center'>{{$item->qtty}}</td>
                                                <td class='px-2 py-1'>{{$item->product->description}}</td>
                                                <td class='px-2 py-1 text-right max-sm:hidden'>R$ {{number_format(($item->total_item / $item->qtty), 2, ',','.')}}</td>
                                                <td class='px-2 py-1 text-right'>R$ {{ $item->total_item }}</td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>

                        <div class="row md:flex">
                            <div class="col w-full md:w-1/3 md:pr-6">
                                <label for="discount" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-tags">&nbsp;</i>&nbsp;{{ __('Discount')}}</label>
                                <input type="text" name="discount" id="discount" value="R$ {{$sale->discount}}" readonly
                                class="mb-3 bg-bege dark:bg-gray-200 border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                                placeholder="R$ 0,00" >
                            </div>
                            <div class="col w-full md:w-1/3">
                                <label for="delivery" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-truck">&nbsp;</i>&nbsp;{{ __('Delivery')}}</label>
                                <input type="text" name="delivery" id="delivery" value="R$ {{$sale->delivery}}" readonly
                                class="mb-3 bg-bege dark:bg-gray-200 border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                                placeholder="R$ 0,00" >
                            </div>
                            <div class="col w-full md:w-1/3 md:pl-6">
                                <label for="value" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-money-bill-wave">&nbsp;</i>&nbsp;{{ __('Total Value')}}</label>
                                <input type="text" name="value" id="value" value="R$ {{$sale->value}}" readonly
                                class="mb-3 bg-bege dark:bg-gray-200 border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                                placeholder="R$ 0,00" >
                            </div>
                        </div>
                        <label for="description" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-info-circle">&nbsp;</i>&nbsp;{{ __('Observations')}}</label>
                        <textarea type="text" name="description" id="description" rows="2" readonly
                        class="cursor-not-allowed block py-2.5 px-3 mb-3 w-full text-cor-70 bg-bege dark:bg-gray-200 border-cinza-claro rounded-lg appearance-none focus:outline-none  focus:ring-cor-70 focus:border-cor-70"
                        placeholder="Observações... (Não obrigatório!)" >{{$sale->description}}</textarea>
                    </div>
                </div>
            </div>

    </article>

    <button type="button" onclick="deleteSale({{$sale->id}})" title="{{ __('Remove Sale') }}"
    class="fixed z-90 bottom-7 right-8 bg-danger w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-danger/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
    <i class="fas fa-trash"></i>
    </button>
    <button type="button" onclick="editSale({{$sale->id}})" title="{{ __('Edit Sale') }}"
    class="fixed z-90 bottom-7 right-32 bg-warning w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-warning/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
    <i class="fas fa-edit"></i>
    </button>

</x-app-layout>
