<!-- PIX modal -->
<div id="pix-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-claro dark:bg-gray-900 rounded-lg shadow">
            <button type="button" class="absolute top-3 right-2.5 text-danger hover:opacity-75 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="pix-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h2 class="mb-6 text-xl uppercase text-cor-70 dark:text-gray-200"><i fas fa-qrcode fa-lg></i> &nbsp; QRCODE PIX</h2>
                <div class="flex justify-center">
                    <div>
                        @if(Auth::user()->configuration->pix == null || Auth::user()->configuration->cpf == null || Auth::user()->configuration->city == null)
                        <h3>Configure seus dados de perfil!</h3>
                        @else
                        <h2 class="text-center text-cor-60">Cliente: {{$client->name}}</h2>
                        <h2 class="text-center text-cor-80 dark:text-gray-200 font-semibold text-lg">Valor: R$ {{number_format($pix,2,",",".")}}&nbsp;<button data-modal-hide="pix-modal" class="ml-2 cursor-pointer" type="button" title="{{ __('Change') }}" onclick="editValuePix({{$client->id}})"><i class="fas fa-edit hover:text-success"></i></button></h2><br>
                        <img src="https://gerarqrcodepix.com.br/api/v1?nome={{ Auth::user()->name }}&cidade=Colombo&chave={{ Auth::user()->configuration->pix }}&valor={{$pix}}&txid=CPF{{ Auth::user()->configuration->cpf }}&saida=qr&tamanho=256" alt="PIX">
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
