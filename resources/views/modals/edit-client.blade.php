<!-- Edit Client modal -->
<div id="edit-client-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-claro dark:bg-gray-900 rounded-lg shadow">
            <button type="button" class="absolute top-3 right-2.5 text-danger hover:opacity-75 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="edit-client-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h2 class="mb-6 text-xl uppercase text-cor-70 dark:text-gray-200 font-bold"><i class="fas fa-user-edit fa-lg">&nbsp;</i>&nbsp; {{ __('Edit Client')}}</h2>
                <form class="space-y-6" action="/client/update" method="POST">
                    @csrf
                    @method('POST')

                    <div>
                        <input type="hidden" name="id" id="id" value="{{$client->id}}">
                        <label for="name" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="far fa-user">&nbsp; </i> &nbsp;{{ __('Name')}}</label>
                        <input type="text" name="name" id="name" value="{{$client->name}}" class="mb-3 bg-bege border border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                        placeholder="{{ __('Name') }}" required>
                        <label for="whatsapp" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fab fa-whatsapp">&nbsp; </i>&nbsp; {{ __('WhatsApp')}}</label>
                        <input type="text" name="whatsapp" id="whatsapp" onkeyup="handlePhone(event)" value="{{'('.substr($client->whatsapp, 0, 2).') '.substr($client->whatsapp, 2, 5).' '.substr($client->whatsapp, 7, 4)}}" placeholder="{{ __('WhatsApp') }}" maxlength="15"
                        class="mb-3 bg-bege border border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5" required>
                        <label for="adress" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-map-marker-alt">&nbsp;</i>&nbsp; {{ __('Adress')}}</label>
                        <input type="text" name="adress" id="adress" value="{{$client->adress}}" class="mb-3 bg-bege border border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                        placeholder="{{ __('Adress') }}" >
                    </div>

                    <div class="row flex">
                        <button type="button" data-modal-hide="edit-client-modal" title="{{ __('Remove Client') }}" onclick="deleteClient({{$client->id}})"
                        class="mr-4 h-12 w-1/6 text-claro bg-danger hover:bg-danger/75 focus:ring-4 focus:outline-none focus:ring-danger font-medium rounded-lg text-sm px-5 py-2.5 text-center"><i class="fa fa-trash fa-lg"></i></button>
                        <button type="submit" class="w-5/6 uppercase text-white bg-cor-80 hover:bg-cor-80/75 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {{ __('Update Data') }}</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
