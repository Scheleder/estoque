<!-- Product edit modal -->
<div id="edit-product-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-claro dark:bg-gray-900 rounded-lg shadow">
            <button type="button" class="absolute top-3 right-2.5 text-danger bg-transparent hover:opacity-75 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="edit-product-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h2 class="mb-6 text-xl uppercase text-cor-80 dark:text-gray-200 font-bold"><i class="fas fa-box fa-lg"></i>&nbsp;</i>&nbsp; {{ __('Edit Product')}}</h2>
                <form class="space-y-6" action="/product/update" method="POST">
                    @csrf
                    @method('POST')

                    <div>
                        <input type="hidden" name="id" id="id" value="{{$product->id}}">
                        <label for="category_id" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-sitemap">&nbsp;</i>&nbsp;{{ __('Category')}}</label>
                        <div class="row flex">
                            <select name="category_id" id="category_id"
                            class="block py-2.5 px-3 mb-3 h-12 w-5/6 text-sm text-cor-70 bg-bege border-cinza-claro rounded-lg appearance-none focus:outline-none  focus:ring-cor-70 focus:border-cor-70 peer">
                                <option selected>Selecione a categoria</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{$product->category->id == $category->id ? "selected='selected'" : ""}}>{{$category->name}}</option>
                                @endforeach
                            </select>
                            <button type="button" data-modal-target="add-category-modal" data-modal-toggle="add-category-modal" data-modal-hide="edit-product-modal" title="{{ __('Add Category') }}"
                            class="ml-4 h-12 w-1/6 text-claro bg-secondary hover:opacity-75 focus:ring-4 focus:outline-none focus:ring-cor-60 font-medium rounded-lg text-sm px-5 py-2.5 text-center"><i class="fa fa-plus"></i></button>
                        </div>
                        <label for="description" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-info">&nbsp; </i>&nbsp; {{ __('Description')}}</label>
                        <input type="text" name="description" id="description" value="{{$product->description}}" class="mb-3 bg-bege border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                            placeholder="{{ __('Description') }}" required>
                        <label for="brand" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-industry">&nbsp; </i>&nbsp; {{ __('Brand')}}</label>
                        <input type="text" name="brand" id="brand" value="{{$product->brand}}" class="mb-3 bg-bege border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                            placeholder="{{ __('Brand') }}" >
                        <label for="cost" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-coins">&nbsp; </i>&nbsp;{{ __('Cost')}}</label>
                        <input type="text" name="cost" id="cost" value="{{$product->cost}}" class="mb-3 bg-bege border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                            placeholder="{{ __('Cost') }}" >
                        <label for="value" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-dollar-sign">&nbsp; </i>&nbsp;{{ __('Value')}}</label>
                        <input type="text" name="value" id="value" value="{{$product->value}}"class="mb-3 bg-bege border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                            placeholder="{{ __('Value') }}" required>
                        @if(Auth::user()->configuration->stock)
                        <label for="amount" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fab fa-stack-overflow">&nbsp;</i>&nbsp;{{ __('Amount')}}</label>
                        <input type="text" name="amount" id="amount" value="{{$product->amount}}" class="mb-3 bg-bege border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                            placeholder="{{ __('Amount') }}" >
                        @endif
                    </div>
                    <button type="submit" class="w-full uppercase text-claro bg-cor-80 hover:opacity-75 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        {{ __('Update Data') }}</button>
                </form>
            </div>
        </div>
    </div>
</div>
