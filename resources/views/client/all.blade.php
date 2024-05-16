<x-app-layout>
    <div class="mt-12 mx-4 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <article class="w-72 p-1 text-sm bg-cinza-claro overflow-hidden shadow-lg rounded-lg mx-auto hover:shadow-xl">
            <div class="text-cor-70">
                <select id="js-example-basic-single" class="w-full" onchange="selecionarCliente(this.value)">
                    @foreach ($clients as $client)
                        <option value="{{$client->id}}">{{$client->name}}</option>
                    @endforeach
                  </select>
            </div>
        </article>
        @foreach ( $clients as $client)
            <article class="w-72 p-1 text-sm bg-cinza-claro overflow-hidden shadow-lg rounded-lg mx-auto hover:shadow-xl hover:transform hover:scale-105 duration-200">
                    <div class="">
                        <span class="float-left ml-1 cursor-pointer text-cor-70 hover:text-cor-70/75 font-semibold"><a href="/client/{{$client->id}}" title="Abrir ficha do Cliente">{{$client->name}}</a></span>
                        <br>
                        <span class="float-right mr-1 cursor-pointer" onclick="openWhats({{$client->whatsapp}})" title="Abrir WhastApp"><i id={{ $loop->index }} class="fab fa-whatsapp text-success font-light hover:font-bold hover:text-success/75"><script>formatPhone({{$client->whatsapp}}, {{ $loop->index }})</script></i></span>
                    </div>
            </article>
        @endforeach
    </div>
    <button type="button" data-modal-target="add-client-modal" data-modal-toggle="add-client-modal" title="{{ __('Add Client') }}"
    class="fixed z-90 bottom-7 right-8 bg-primary w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-primary/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
    <i class="fas fa-user-plus"></i>
    </button>
    @include('modals.add-client')
</x-app-layout>
