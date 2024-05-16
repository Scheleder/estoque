<x-app-layout>

    <div class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <article class="bg-claro dark:bg-gray-300 shadow-sm rounded-lg hover:shadow-xl mt-8 sm:mt-1">
                <div class="w-full m-0 p-2 rounded-t-lg bg-cor-70 text-claro text-center text-4xl">PINDURA</div>
                <div class="p-8 w-full text-cor-60 font-semibold md:flex">
                    <div class="md:w-1/3">
                        <div class="my-2 mx-8 bg-cinza rounded-md shadow-sm text-sm text-claro">
                            <h3>&nbsp;</h3>
                            <h3 class="ml-6"><i class="fas fa-users fa-fw text-cor-80"></i>&nbsp; {{ Auth::user()->clients->count() }} clientes cadastrados</h3>
                            <h3 class="ml-6"><i class="fas fa-tags fa-fw text-cor-80"></i>&nbsp; {{ Auth::user()->sales->count() }} vendas realizadas</h3>
                            <h3 class="ml-6"><i class="fas fa-coins fa-fw text-cor-80"></i>&nbsp; Faturamento: R$
                                {{ number_format(Auth::user()->sales->sum('value'), 2, ',', '.') }}</h3>
                            <h3 class="ml-6"><i class="fas fa-wallet fa-fw text-cor-80"></i>&nbsp; Total recebido: R$
                                {{ number_format(Auth::user()->payments->sum('value'), 2, ',', '.') }}</h3>
                            <h3 class="ml-6"><i class="fas fa-chart-line fa-fw text-cor-80"></i>&nbsp; Total à receber: R$
                                {{ number_format(Auth::user()->sales->sum('value') - Auth::user()->payments->sum('value'), 2, ',', '.') }}</h3>
                            @if (Auth::user()->configuration->stock)
                                <h3 class="ml-6"> <i class="fas fa-cubes fa-fw text-cor-80"></i>&nbsp;
                                    {{ Auth::user()->products->sum('amount') }}
                                    produtos no estoque</h3>
                            @endif
                            <h3>&nbsp;</h3>
                        </div>
                        <div>
                            <canvas id="myChart2" class="mt-4 mb-2"></canvas>
                        </div>
                    </div>
                    <div class="md:w-2/3 flex flex-col justify-end">
                        <h3 class="mx-4 mb-4 text-cinza dark:text-gray-500 font-extralight text-justify">
                            &nbsp;Simplifique sua operação comercial, tenha total controle
                            sobre suas vendas e recebimentos, gerencie seu estoque de forma eficaz e visualize
                            instantaneamente sua margem de lucro. Mantenha um banco de dados detalhado de seus clientes
                            e comunique-se com eles sem esforço. Envie listas de preços, gere códigos PIX para
                            pagamentos instantâneos e muito mais!
                            <br> Tudo em um só lugar, de qualquer dispositivo, com mobilidade e intuitividade.
                            <br> Impulsione seus negócios, aumente sua eficiência e eleve seus lucros!
                        </h3>
                        <canvas id="myChart" class="p-2 m-2 bg-bege dark:bg-gray-400 rounded-xl"></canvas>

                    </div>
                </div>
                <a type="button" title="Testar" href='/generate-pdf' target='_blank'
                    class="p-1 m-0 w-full text-claro text-center bg-cinza dark:bg-gray-200 hover:bg-danger/75 text-sm border-danger/25 rounded-b-lg">
                    <i class="far fa-file-pdf"></i>&nbsp; GERAR RELATÓRIO EM PDF</a>
            </article>
        </div>
    </div>

    <script src="{{ asset('/js/chart.js') }}"></script>

    <script type="text/javascript">
        var labels = {{ Js::from($labels) }};
        var sales = {{ Js::from($data) }};
        var values = {{ Js::from($values) }};

        const data = {
            labels: labels,
            datasets: [{
                    label: 'Vendas',
                    backgroundColor: 'rgba(166,48,220,0.4)',
                    borderColor: 'rgb(166,48,220)',
                    borderWidth: '1',
                    fill: true,
                    data: sales,
                    yAxisID: 'y',
                },
                {
                    label: 'Faturamento R$',
                    backgroundColor: 'rgba(58,83,155,0.4)',
                    borderColor: 'rgb(58,83,155)',
                    borderWidth: '1',
                    fill: true,
                    data: values,
                    yAxisID: 'y1',
                }
            ]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#134e4a',
                            font: {
                                size: 14,
                            }
                        }
                    }
                }

            }
        };


        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );

         const bestSellers = {{ Js::from($bestSellers) }};
         const produtos = Object.keys(bestSellers);
         const quantidade = Object.values(bestSellers);

        const data2 = {
            labels: produtos,
            datasets: [{
                label: 'Vendas',
                data: quantidade,
                backgroundColor: [
                    "rgba(128, 0, 128, 0.4)",   // Roxo
                    "rgba(255, 0, 255, 0.4)",   // Rosa
                    "rgba(255, 0, 0, 0.4)",     // vermelho
                    "rgba(255, 128, 0, 0.4)",   // Laranja
                    "rgba(255, 255, 0, 0.4)",   // Amarelo
                    "rgba(128, 255, 0, 0.4)",   // Verde Limão
                    "rgba(0, 255, 0, 0.4)",     // verde
                    "rgba(0, 255, 255, 0.4)",   // Ciano
                    "rgba(0, 0, 255, 0.4)",     // Azul
                    "rgba(128, 128, 128, 0.4)", // cinza
                    ],
                    borderWidth: 1,
                hoverOffset: 4
            }]
        };
        const config2 = {
            type: 'doughnut',
            data: data2,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels:{
                            boxWidth:20,
                            font:{
                                size:10
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Produtos mais vendidos',
                        color: '#613B7D',
                        font: {
                            size: 18
                        }
                    }
                }
            },
        };

        const myChart2 = new Chart(
            document.getElementById('myChart2'),
            config2
        );
    </script>
</x-app-layout>
