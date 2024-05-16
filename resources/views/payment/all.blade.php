
<x-app-layout>

    <article class="mx-4 mt-12 sm:mt-1 p-2 rounded-xl bg-claro dark:bg-gray-300 shadow-lg hover:shadow-xl">
        <div class="overflow-x-auto shadow-md rounded-lg">
            <table class="w-full text-sm text-left text-cor-80 rounded-lg">
                <thead class="text-xs text-claro uppercase border-b-2 border-claro bg-gradient-to-r from-cor-70 to-cor-50">
                    <tr>
                        <th scope="col" class="px-3 py-3 max-sm:hidden">
                            <a href="/payments/ord/{{'date'}}" title="Ordenar por data">Data</a>
                        </th>
                        <th scope="col" class="px-3 py-3">
                            <a href="/payments/ord/{{'client_id'}}" title="Agrupar por Cliente">Cliente</a>
                        </th>
                        <th class="px-3 py-3 max-sm:hidden">
                            <a href="/payments/ord/{{'description'}}" title="Agrupar pela forma de pagamento">Forma de pagamento</a>
                        </th>
                        <th scope="col" class="px-3 py-3 text-right">
                            <a href="/payments/ord/{{'value'}}" title="Ordenar pelo valor">Valor</a>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($payments as $pay)
                    <tr class="even:bg-cinza-claro  odd:bg-bege hover:bg-cor-50 text-cor-80 h-6">
                            <td class="px-3 py-1 max-sm:hidden">{{date('d/m/Y - H:i', strtotime($pay->date))}}</td>
                            <td class="px-3 py-1"><a href="/client/{{ $pay->client->id }}">{{ $pay->client->name }}</a></td>
                            <td class="max-sm:hidden">{{$pay->description}}</td>
                            <td class="text-right px-3 py-1">R$ {{ $pay->value }}</td>
                            <td class="text-center px-2">
                                <i class="fas fa-edit hover:text-warning ml-2 cursor-pointer" title="{{ __('Edit') }}" onclick="editValuePayment({{$pay->id}})"></i>
                                <i class="fas fa-trash hover:text-danger ml-2 cursor-pointer" title="{{ __('Delete') }}" onclick="deletePayment({{$pay->id}})"></i>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </article>

</x-app-layout>
