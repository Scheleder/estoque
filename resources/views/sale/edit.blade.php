<x-app-layout>

    <article class="mx-4 mt-12 sm:mt-1 p-2 rounded-xl bg-claro dark:bg-gray-800 shadow-lg hover:shadow-xl">

            <div class="px-4 py-6 lg:px-8">
                <h2 class="mb-6 text-xl uppercase text-cor-70 dark:text-gray-200 font-bold"><i class="fas fa-shopping-cart fa-lg">&nbsp;</i>&nbsp;{{ __('Edit Sale')}} #{{$sale->id}}</h2>
                <form class="space-y-6" action="/sale/items/update/{{$sale->id}}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('POST')

                    <div class="items">
                        <input type="hidden" name="client_id" id="client_id" value="{{$client->id}}">
                        <input type="hidden" name="qtty" id="qtty" value="1">
                        <input type="hidden" id="allItems" name="allItems" value="${allItems}">
                        <label for="products" class="block mb-1 text-sm font-bold text-gray-600 dark:text-white"><i class="fas fa-shopping-cart">&nbsp;</i>&nbsp;{{ __('Products')}}</label>
                        <div class="row" id="search-div">
                            <select id="js-example-basic-multiple" value="${product_item}" multiple="multiple" class="w-full cursor-zoom-in dark:bg-gray-200">
                                @foreach ($categories as $category)
                                    <optgroup label="{{ $category->name }}">
                                        @foreach ($products as $product)
                                            @if ($product->category_id == $category->id)
                                                <option value="{{ $product->id }}">{{ $product->description }} - R$ {{ $product->value }}
                                                    @if (Auth::user()->configuration->stock && $product->amount == 0)
                                                        - <span class="text-red-800">SEM ESTOQUE</span>
                                                    @endif
                                                    @if (Auth::user()->configuration->stock && $product->amount == 1)
                                                        - <span class="text-orange-500">ÚLTIMA UNIDADE</span>
                                                    @endif
                                                    @if (Auth::user()->configuration->stock && $product->amount > 1)
                                                        - <span class="text-orange-500">estoque: {{$product->amount}} un</span>
                                                    @endif
                                                </option>
                                            @endif
                                        @endforeach
                                    <optgroup>
                                @endforeach
                            </select>
                        </div>
                        <div id="barcode-div" style="display:none"><input class="w-full h-20 mb-2 border-pink-300 rounded-lg focus:ring-pink-500" id="barcode-input" type="text" placeholder="Utilize o leitor de códigos de barras"></div>

                            <div class="mt-2 mb-8 relative overflow-x-auto shadow-md rounded-lg">
                                <table class="w-full text-sm text-left text-gray-500">
                                    <thead class="text-xs text-claro uppercase border-b-2 border-claro bg-gradient-to-r from-cor-70 to-cor-50">
                                        <tr>
                                            <th scope="col" class="px-2 py-3 text-center"></th>
                                            <th scope="col" class="px-2 py-3 text-center">Qtde</th>
                                            <th scope="col" class="px-2 py-3 text-left">Item</th>
                                            <th scope="col" class="px-2 py-3 text-right max-sm:hidden">Valor Unitário</th>
                                            <th scope="col" class="px-2 py-3 text-right">Total do Item</th>
                                            <th scope="col" class="px-2 py-3 text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="containerItems">

                                    </tbody>
                                </table>
                            </div>

                        <div class="row md:flex">
                            <div class="col w-full md:w-1/3 md:pr-6">
                                <label for="discount" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-tags">&nbsp;</i>&nbsp;{{ __('Discount')}}</label>
                                <input type="text" name="discount" id="discount" onfocus="this.value='';" value="R$ {{$sale->discount}}"  onblur="carregarItems()"
                                class="mb-3 bg-bege dark:bg-gray-200 border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                                placeholder="R$ 0,00" >
                            </div>
                            <div class="col w-full md:w-1/3">
                                <label for="delivery" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-truck">&nbsp;</i>&nbsp;{{ __('Delivery')}}</label>
                                <input type="text" name="delivery" id="delivery" onfocus="this.value='';" value="R$ {{$sale->delivery}}"  onblur="carregarItems()"
                                class="mb-3 bg-bege dark:bg-gray-200 border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                                placeholder="R$ 0,00" >
                            </div>
                            <div class="col w-full md:w-1/3 md:pl-6">
                                <label for="value" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-money-bill-wave">&nbsp;</i>&nbsp;{{ __('Total Value')}}</label>
                                <input type="text" name="value" id="value" readonly
                                class="mb-3 bg-bege dark:bg-gray-200 border-cinza-claro text-cor-70 text-sm rounded-lg focus:ring-cor-70 focus:border-cor-70 block w-full p-2.5"
                                placeholder="R$ 0,00" >
                            </div>
                        </div>
                        <label for="description" class="block mb-1 text-sm font-bold text-cor-80 dark:text-gray-200"><i class="fas fa-info-circle">&nbsp;</i>&nbsp;{{ __('Observations')}}</label>
                        <textarea type="text" name="description" id="description" rows="2"
                        class="cursor-text block py-2.5 px-3 mb-3 w-full text-cor-70 bg-bege dark:bg-gray-200 border-cinza-claro rounded-lg appearance-none focus:outline-none  focus:ring-cor-70 focus:border-cor-70"
                        placeholder="Observações... (Não obrigatório!)" >{{$sale->description}}</textarea>
                    </div>
                    <button type="button" onclick="history.back();" title="{{ __('Cancel') }}"
                        class="fixed z-90 bottom-7 right-8 bg-secondary w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-secondary/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
                        <i class="fas fa-times"></i>
                    </button>
                    <button type="submit" title="{{ __('Save Changes') }}"
                        class="fixed z-90 bottom-7 right-32 bg-primary w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-primary/75 hover:drop-shadow-2xl hover:animate-bounce duration-300">
                        <i class="fas fa-save"></i>
                    </button>
                </form>
            </div>

    </article>


    <script type="text/javascript">

        $(document).ready(function() {
            $("#js-example-basic-multiple").attr("data-placeholder"," Pesquisar...");
            $('#js-example-basic-multiple').select2();
            products =  {{ Js::from($products) }};
            items =  {{ Js::from($sale->items) }};
            cart =[];
            items.forEach( item=>{
                cart.push(item.product.id);
                item.id = item.product.id;
                item.value = item.product.value;
            });
            console.log(cart)
            $("#js-example-basic-multiple").val(cart).trigger('change');
            carregarItems();
            alert("Atenção! Os preços foram atualizados!")
        });

        var bar = false;

        document.addEventListener("keydown", function(e) {
            if(e.keyCode === 13) {//ENTER
                e.preventDefault();
            }

            if(e.keyCode === 17){//CTRL
                if(!bar){
                    document.getElementById("barcode-div").style.display = "block";
                    document.getElementById("search-div").style.display = "none";
                    document.getElementById("barcode-input").focus();
                    bar = true;
                }else{
                    document.getElementById("barcode-div").style.display = "none";
                    document.getElementById("search-div").style.display = "block";
                    document.getElementById("barcode-input").blur();
                    bar = false;
                }
            }

        });

        var items = [];
        var products = [];
        var item = {};
        var data = document.getElementById("allItems");

        $('#js-example-basic-multiple').on('select2:select', function (e) {
            console.log('Adicionou: '+ e.params.data.id +' - '+ e.params.data.text);
            product = products.filter(a => a.id == e.params.data.id)[0];
            item.product = product;
            item.id = e.params.data.id;
            item.qtty = 1;
            item.value = product.value;
            items.push(item);
            carregarItems();
        });

        $('#js-example-basic-multiple').on('select2:unselect', function (e) {
            console.log('Removeu: '+ e.params.data.id +' - '+ e.params.data.text);
            if(items.length>0){
                var index = items.findIndex(a => a.id == e.params.data.id);
                items.splice(index, 1);
                carregarItems();
            }
        });

        var carregarItems = function(){
            data.value = JSON.stringify(items, undefined, 4);
            console.log(items);
            let dados_container = document.querySelector("#containerItems");
            let campo_total = document.querySelector("#value");
            let campo_desconto = document.querySelector("#discount");
            let campo_entrega = document.querySelector("#delivery");
            let soma_total = 0;
                dados_container.innerHTML = ""
                    items.forEach((el) => {
                    let index = items.indexOf(el);
                    let total_item = (el.qtty * el.product.value).toFixed(2);
                    soma_total += (el.qtty * el.product.value);
                    if(el){
                        let dado_container = `<tr class="even:bg-cinza-claro  odd:bg-bege hover:bg-cor-50 text-cor-80 h-6"><td class='text-center'><i class='fas fa-edit hover:text-warning ml-2 cursor-pointer' title='{{ __('Update Amount') }}' onclick='alteraQuantidade(${index}, ${el.qtty}, ${el.product.amount})'></i></td><td class='px-2 py-1 text-center'>${ el.qtty }</td><td class='px-2 py-1'>${ el.product.description }</td><td class='px-2 py-1 text-right max-sm:hidden'>R$ ${ el.product.value}</td><td class='px-2 py-1 text-right'>R$ ${ total_item }</td><td class='px-2 py-1 text-center'><i class='fas fa-trash hover:text-danger ml-2 cursor-pointer' title='{{ __('Remove Item') }}' onclick='removeItem(${el.id})'></i></td></tr>`;
                        dados_container.innerHTML += dado_container;
                    }
                });

                campo_desconto.value != "" ? campo_desconto.value : 0;
                campo_entrega.value != "" ? campo_entrega.value : 0;
                var desconto = Number(campo_desconto.value.toString().replace("R$ ", "").replace(",", "."));
                if(isNaN(desconto)){
                    alert('CARACTERE INVÁLIDO!');
                    desconto=0;
                }
                var entrega = Number(campo_entrega.value.toString().replace("R$ ", "").replace(",", "."));
                if(isNaN(entrega)){
                    alert('CARACTERE INVÁLIDO!');
                    entrega=0;
                }
                soma_total = soma_total + entrega - desconto;
                campo_total.value = 'R$ '+soma_total.toFixed(2);
                campo_desconto.value ='R$ '+desconto.toFixed(2);
                campo_entrega.value ='R$ '+entrega.toFixed(2);
                if(soma_total<0){
                    campo_desconto.value ='R$ 0.00';
                    campo_entrega.value ='R$ 0.00';
                    carregarItems();
                }
        }

        function removeItem(id){
            var values =  $('#js-example-basic-multiple').val();
            if (values) {
                values.splice(values.indexOf(id), 1);
                $("#js-example-basic-multiple").val(values).trigger('change');
                var index = items.findIndex(a => a.id == id);
                items.splice(index, 1);
                carregarItems();
            }
        }

        function alteraQuantidade(index, atual, estoque) {
            let novo = Number(prompt("Alterar a quantidade: ("+estoque+" unidades disponíveis)", atual));
            if (novo > 0 && novo <= estoque) {
                //novo = novo - atual;
                items[index].qtty = novo;
                carregarItems();
            } else if(novo > estoque){
                alert('Estoque indisponível!');
            }else {
                alert('Valor inválido!');
            }
        }

    </script>

</x-app-layout>
