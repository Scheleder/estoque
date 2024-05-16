<!-- Product image modal -->
<div id="image-product-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-gray-100 dark:bg-gray-900 rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-danger hover:opacity-75 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="image-product-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h2 class="mb-6 text-xl uppercase text-cor-70 dark:text-gray-200 font-bold"><i class="fas fa-box fa-lg"></i>&nbsp;</i>&nbsp; {{ __('Change Product Image')}}</h2>
                <form class="space-y-6" action="/product/update" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('POST')

                    <div>
                        <input type="hidden" name="id" id="id" value="{{$product->id}}">
                        <label for="image" class="block mb-1 text-sm font-bold text-cor-60"><i class="fas fa-camera">&nbsp; </i>&nbsp; {{ __('Actual Image')}}</label>
                        <div class="mb-2">
                            <div class="p-8">
                                <img class="w-full rounded-md" src="/img/products/{{ $product->image }}" alt="Imagem" />
                            </div>
                            <x-file-input id="image" name="image" type="file" />
                        </div>
                    </div>
                    <button type="submit" class="mt-4 w-full uppercase text-claro bg-cor-80 hover:opacity-75 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        {{ __('Update Image') }}</button>
                </form>
            </div>
        </div>
    </div>
</div>
