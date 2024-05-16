
<x-app-layout>

    <article class="mx-4 mt-12 sm:mt-1 p-2 rounded-xl bg-claro dark:bg-gray-300 shadow-lg hover:shadow-xl">

        <div class="overflow-x-auto shadow-md rounded-lg">
            <table class="w-full text-sm text-left text-cor-80 rounded-lg ">
                <thead class="text-xs text-claro uppercase border-b-2 border-claro bg-gradient-to-r from-cor-70 to-cor-50">
                    <tr>
                        <th scope="col" class="px-3 py-3 text-center">
                            <a href="/sales" title="Ordenar por ID">ID</a>
                        </th>
                        <th scope="col" class="px-3 py-3 max-sm:hidden">
                            <a href="/sales/ord/{{'date'}}" title="Ordenar por data">Data</a>
                        </th>
                        <th scope="col" class="px-3 py-3">
                            <a href="/sales/ord/{{'client_id'}}" title="Agrupar por Cliente">Cliente</a>
                        </th>
                        <th class="px-3 py-3 max-md:hidden">
                            <a href="/sales/ord/{{'description'}}" title="Ordenar pela descrição">Descrição</a>
                        </th>
                        <th scope="col" class="px-3 py-3 text-right">
                            <a href="/sales/ord/{{'value'}}" title="Ordenar por preço">Valor</a>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($sales as $sale)
                        <tr class="even:bg-cinza-claro  odd:bg-bege hover:bg-cor-50 text-cor-80 h-6">
                            <td class="text-center px-3 py-1">#{{ $sale->id }}</td>
                            <td class="px-3 py-1 max-sm:hidden"> {{date('d/m/Y - H:i', strtotime($sale->date))}}</td>
                            <td class="px-3 py-1"><a href="/client/{{ $sale->client->id }}">{{ $sale->client->name }}</a></td>
                            <td class="px-3 py-1 w-2/5 max-md:hidden">{{strlen($sale->description) < 45 ? $sale->description : substr($sale->description, 0, 43)."..."}}</td>
                            <td class="text-right px-3 py-1">R$ {{ $sale->value }}</td>
                            <td class="text-center px-2">
                                @if(Auth::user()->configuration->product)
                                <i class="fas fa-eye hover:text-success ml-2 cursor-pointer" title="{{ __('View') }}" onclick="openSale({{$sale->id}})"></i>
                                @else
                                <i class="fas fa-edit hover:text-warning ml-2 cursor-pointer" title="{{ __('Edit') }}" onclick="editValueSale({{$sale->id}})"></i>
                                <i class="fas fa-trash hover:text-danger ml-2 cursor-pointer" title="{{ __('Remove') }}" onclick="deleteSale({{$sale->id}})"></i>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </article>

</x-app-layout>
