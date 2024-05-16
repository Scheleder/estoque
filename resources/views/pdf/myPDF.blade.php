<!DOCTYPE html>
<html>

<head>
    <title>Relatório Pindura</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">    <style type="text/css">
        tr:nth-child(even) {
            background: #FAFAFA;
        }

        tr:nth-child(odd) {
            background: #EFEFEF;
        }
    </style>
</head>

<body>

    <header>
        <table class="table table-borderless">
            <tr class="bg-white text-dark w-full">
                <td class="align-middle">
                    <img src="{{ asset('/img/logo.png') }}" alt="Pindura" style="margin-right:20px">
                </td>
                <td class="align-bottom">
                    <h4 class="text-gray">{{ $title }}</h4>
                </td>
            </tr>
        </table>
    </header>
    <hr>
    <h6>Clientes</h6>
    <table class="table table-sm">
        <thead>
            <tr class="text-uppercase" style="background-color: #777;color:white;line-height:6px;font-weight:bold;font-size:10px;">
                <th>Nome</th>
                <th>Endereço</th>
                <th>Whatsapp</th>
                <th>Compras</th>
                <th>Cadastro</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($clients as $client)
                <tr style="font-size:10px;line-height:6px;">
                    <td>{{ $client->name }}</td>
                    <td>{{ $client->adress }}</td>
                    <td>{{ preg_replace('~.*(\d{2})[^\d]{0,7}(\d{5})[^\d]{0,7}(\d{4}).*~', '($1) $2 $3', $client->whatsapp) }}</td>
                    <td class="text-center">{{ count($client->sales) }}</td>
                    <td>{{ date('d/m/Y', strtotime($client->created_at)) }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr style="background-color: #aaa;color:white;font-weight:bold;line-height:6px;font-size:10px;">
                <td class="text-left">
                    {{ count($clients) }}
                @if (count($clients) > 1)
                    &nbsp;clientes
                @else
                    &nbsp;cliente
                @endif
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>


    <h6>Vendas</h6>
    <table class="table table-sm">
        <thead>
            <tr  class="text-uppercase" style="background-color: #777;color:white;font-weight:bold;line-height: 6px;font-size:10px;">
                <th>Venda</th>
                <th>Data</th>
                <th>Cliente</th>
                <th class="text-center">Valor</th>
            </tr>
        </thead>
        <tbody>
            @php($total = 0)
            @foreach ($sales as $sale)
                @php($total = $total + $sale->value)
                <tr style="line-height: 6px;font-size:10px;">
                    <td style="text-align:center;">#{{ $sale->id }}</td>
                    <td>{{ date('d/m/Y - H:i', strtotime($sale->updated_at)) }}</td>
                    <td>{{ $sale->client->name }}</td>
                    <td class="text-right">R$ {{ number_format($sale->value, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr style="background-color: #aaa;color:white;font-weight:bold;line-height: 6px;font-size:10px;">
                <td class="text-left">
                    {{ count($sales) }}
                @if (count($sales) > 1)
                    &nbsp;vendas
                @else
                    &nbsp;venda
                @endif
                </td>
                <td></td>
                <td></td>
                <td class="text-right">R$ {{ number_format($total, 2) }}</td>

            </tr>
        </tfoot>
    </table>


    <h6>Recebimentos</h6>
    <table class="table table-sm">
        <thead>
            <tr class="text-uppercase" style="background-color: #777;color:white;font-weight:bold;line-height: 6px;font-size:10px;">
                <th>Data</th>
                <th>Cliente</th>
                <th>Descrição</th>
                <th class="text-center">Valor</th>
            </tr>
        </thead>
        <tbody>
            @php($total = 0)
            @foreach ($payments as $pay)
                @php($total = $total + $pay->value)
                <tr style="line-height: 6px;font-size:10px;">
                    <td>{{ date('d/m/Y - H:i', strtotime($pay->updated_at)) }}</td>
                    <td>{{ $pay->description }}</td>
                    <td>{{ $pay->client->name }}</td>
                    <td class="text-right">R$ {{ number_format($pay->value, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr style="background-color: #aaa;color:white;font-weight:bold;line-height: 6px;font-size:10px;">
                <td class="text-left">
                    {{ count($payments) }}
                @if (count($payments) > 1)
                    &nbsp;recebimentos
                @else
                    &nbsp;recebimento
                @endif
                </td>
                <td></td>
                <td></td>
                <td class="text-right">R$ {{ number_format($total, 2) }}</td>
            </tr>
        </tfoot>
    </table>


    <h6>Produtos</h6>
    <table class="table table-sm">
        <thead>
            <tr class="text-uppercase" style="background-color: #777;color:white;font-weight:bold;line-height: 6px;font-size:10px;">
                <th>ID</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Estoque</th>
                <th class="text-center">Valor</th>
            </tr>
        </thead>
        <tbody>

            @foreach ($products as $product)

                <tr style="line-height: 6px;font-size:10px;">
                    <td class="text-center">#{{$product->id }}</td>
                    <td>{{ $product->category->name }}</td>
                    <td>{{ $product->description }}</td>
                    <td>{{ $product->amount }} un</td>
                    <td class="text-right">R$ {{ number_format($product->value, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr style="background-color: #aaa;color:white;font-weight:bold;line-height: 6px;font-size:10px;">
                <td class="text-left">
                    {{ count($products) }}
                @if (count($products) > 1)
                    &nbsp;produtos
                @else
                    &nbsp;produto
                @endif
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>

    <h6>Mais vendidos</h6>
    <table class="table table-sm">
        <thead>
            <tr class="text-uppercase" style="background-color: #777;color:white;font-weight:bold;line-height: 6px;font-size:10px;">
                <th></th>
                <th>Descrição</th>
                <th>Quantidade</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($bestSellers as $best)
                <tr style="line-height: 6px;font-size:10px;">
                    <td class="text-center">{{ $loop->index+1 }}º</td>
                    <td>{{ $best->product }}</td>
                    <td>{{ $best->qtty }} un</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="text-right">
        <small class="text-gray">{{ auth()->user()->name }}</small><br>
        <small class="text-gray">{{ $date }}</small>
    </div>
</body>

</html>
