<!-- Payment modal -->
<div id="add-pay-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-claro dark:bg-gray-900 rounded-lg shadow">
            <button type="button" class="absolute top-3 right-2.5 text-danger hover:opacity-75 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="add-pay-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h2 class="mb-6 text-xl uppercase text-cor-70 dark:text-gray-200 font-bold"><i class="fas fa-cash-register fa-lg">&nbsp;</i>&nbsp;{{ __('New Payment')}}</h2>
                <form class="space-y-6" action="/payment/add" method="POST">
                    @csrf
                    @method('POST')

                    <div>
                        <input type="hidden" name="client_id" id="client_id" value="{{$client->id}}">
                        <label for="value" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="far fa-money-bill-alt">&nbsp;</i>&nbsp;{{ __('Value')}}</label>
                        <input type="text" name="value" id="value"
                        class="mb-3 bg-bege border border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                        placeholder="R$ 0,00" >
                        <label for="description" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-money-check">&nbsp;</i>&nbsp;{{ __('Paymode')}}</label>
                        <select name="description" id="description"
                        class="block py-2.5 px-3 mb-3 w-full text-cor-70 bg-bege border-cinza-claro rounded-lg appearance-none focus:outline-none  focus:ring-cor-70 focus:border-cor-70 peer">
                            <option value="PIX">PIX</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Cheque">Cheque</option>
                        </select>
                    </div>

                    <button type="submit" class="w-full uppercase text-white bg-cor-80 hover:opacity-75 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        {{ __('Add Payment') }}</button>
                </form>
            </div>
        </div>
    </div>
</div>
