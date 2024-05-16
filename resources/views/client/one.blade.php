<x-app-layout>

    <div class="justify-center mt-8 sm:mt-1 p-4 gap-4 md:flex">
        <article class="text-center rounded-lg bg-cinza-claro p-1 mb-4 md:mb-0 md:w-screen shadow-lg">
            <span class="ml-2 float-left cursor-pointer text-cor-70 hover:text-cor-80 font-semibold"><a data-modal-target="edit-client-modal" data-modal-toggle="edit-client-modal" title="{{ __('Edit Data') }}">{{$client->name}}</a></span>
            <br>
            <span class="cursor-pointer text-cor-50 font-thin hover:text-cor-60"><a href="https://www.google.com.br/maps/place/{{$client->adress}}" target="_blank" title="{{ __('View Map') }}"><i class="fas fa-map-signs"></i>&nbsp;{{$client->adress}}</a></span>
            <br>
            <span class="mr-2 float-right cursor-pointer" onclick="openWhats({{$client->whatsapp}})" title="Abrir WhastApp"><i id="whats" class="fab fa-whatsapp text-success font-normal hover:font-bold"><script>formatPhone({{$client->whatsapp}}, "whats")</script></i></span><br>
        </article>
        @if($client->saldo > 0)
        <article class="text-center rounded-lg bg-success/75 py-6 md:w-screen shadow-lg">
            <p class="text-white text-2xl">CRÉDITO: R$ {{number_format(($client->saldo),2,",",".")}}</p>
        </article>
        @elseif($client->saldo < 0)
        <article class="text-center rounded-lg bg-danger/75 hover:bg-danger/50 py-6 md:w-screen shadow-lg">
            <a id="btnPix" data-modal-target="pix-modal" data-modal-toggle="pix-modal" title="{{ __('QR Code') }}">
                <p class="text-claro text-2xl cursor-pointer">DÉBITO: R$ {{number_format(($client->saldo*(-1)),2,",",".")}}</p>
            </a>
        </article>
        @elseif($client->saldo == 0)
        <article class="text-center rounded-lg bg-primary/75 py-6 md:w-screen shadow-lg">
            <p class="text-claro text-2xl">SEM DÉBITOS!</p>
        </article>
        @endif
    </div>

    <article class="mx-4 p-2 rounded-xl bg-claro dark:bg-gray-300 shadow-lg hover:shadow-xl">
        <div class="overflow-x-auto shadow-md rounded-lg">
            <table class="w-full text-sm text-left text-cor-80 rounded-lg">
                <thead class="text-xs text-claro uppercase border-b-2 border-claro bg-gradient-to-r from-cor-70 to-cor-50">
                    <tr>
                        <th scope="col" class="px-3 py-3 max-sm:hidden">
                            <a href="/shop/stock/category" title="Ordenar por data">Data</a>
                        </th>
                        <th scope="col" class="px-3 py-3 max-sm:hidden">
                            <a href="/shop/stock/description" title="Ordenar alfabeticamente">Tipo</a>
                        </th>
                        <th scope="col" class="px-3 py-3 text-right">
                            <a href="/shop/stock/cost" title="Ordenar por preço">Pagamento</a>
                            <th scope="col" class="px-3 py-3 text-right">
                                <a href="/shop/stock/cost" title="Ordenar por preço">Compra</a>
                            </th>
                            <th scope="col" class="px-3 py-3 text-right">
                                <a href="/shop/stock/cost" title="Ordenar por preço">Saldo</a>
                            </th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    @php($saldo = $client->saldo)
                    @foreach($extracts as $extract)
                    <tr class="even:bg-cinza-claro  odd:bg-bege hover:bg-cor-50 h-6">
                        <td class="px-3 py-1 max-sm:hidden">{{date('d/m/Y - H:i', strtotime($extract->date))}}</td>
                        <td class="px-3 py-1 max-sm:hidden">
                            @if($extract->type == 0)
                                <a href="/sale/{{$extract->id}}">{{ $extract->description }}</a>
                            @else
                                {{ $extract->description }}
                            @endif
                        </td>
                        <td class="text-right px-3 py-1">{{$extract->type == 1 ? 'R$ '.$extract->value : ''}}</td>
                        <td class="text-right px-3 py-1"><a href="/sale/{{$extract->id}}">{{$extract->type == 0 ? 'R$ '.$extract->value : ''}}</a></td>
                        <td class="text-right px-3 py-1"><span class={{$saldo > 0 ? 'text-green-600' : 'text-red-600'}}> R$ {{number_format(($saldo),2,",",".")}} </span></td>
                    </tr>
                    @php($extract->type==1? $saldo = $saldo - $extract->value : $saldo =  $extract->value + $saldo)
                    @endforeach
                </tbody>
            </table>
        </div>
    </article>

    @if(Auth::user()->configuration->product)
        <button type="button" onclick="tipoVenda( {{ Auth::user()->configuration->product }}, {{ $client->id }} )" title="{{ __('Add Sale') }}"
        class="fixed bottom-7 right-32 bg-success w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-success/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
        <i class="fas fa-cart-plus"></i>
        </button>
    @else
        <button type="button" data-modal-target="add-sale-modal" data-modal-toggle="add-sale-modal" title="{{ __('Add Sale') }}"
        class="fixed bottom-7 right-32 bg-success w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-success/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
        <i class="fas fa-cart-plus"></i>
        </button>
    @endif

    <button type="button" data-modal-target="add-pay-modal" data-modal-toggle="add-pay-modal" title="{{ __('Add Payment') }}"
    class="fixed z-99 bottom-7 right-8 bg-warning w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-warning/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
    <i class="fas fa-cash-register"></i>
    </button>

@if( $pix != $client->saldo*(-1))
    <script type="text/javascript">
        $(document).ready(function(){
            var btnPix = document.getElementById('btnPix');
            setTimeout(function(){
                btnPix.click();
            }, 500);
        });
    </script>
@endif

@include('modals.edit-client')
@include('modals.pix')
@include('modals.add-sale')
@include('modals.add-payment')

</x-app-layout>
