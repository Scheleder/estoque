<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Sale;
use App\Models\Client;
use App\Models\Product;
use App\Models\Payment;
use PDF;
use DB;

class PDFController extends Controller
{
    public function generatePDF()
    {
        $user = auth()->user()->id;
        $sales = Sale::where('user_id', $user)->orderBy('updated_at')->get();
        $clients = Client::where('user_id', $user)->where('active', '1')->orderBy('name')->get();
        $products = Product::where('user_id', $user)->where('active', '1')->orderBy('description')->get();
        $payments = Payment::where('user_id', $user)->orderBy('updated_at')->get();

        $bestSellers = DB::table('items')
        ->join('sales', 'items.sale_id', '=', 'sales.id')
        ->join('products', 'items.product_id', '=', 'products.id')
        ->select([
            DB::raw("sum(qtty) as qtty"),
            DB::raw("products.description as product")
        ])
        ->where('sales.user_id', $user)
        ->groupBy("products.description")
        ->orderBy('qtty','DESC')
        ->limit(10)
        ->get();

        $data = [
            'title' => 'RELATÓRIO',
            'date' => now()->format('d/m/Y H:i:s'),
            'user' => $user,
            'sales' => $sales,
            'clients' => $clients,
            'products' => $products,
            'payments' => $payments,
            'bestSellers' => $bestSellers
        ];

        info($bestSellers);
        $pdf = PDF::loadView('pdf.myPDF', $data);

        //$pdf = PDF::loadView('shop.coupon', ['sale' => $sale, 'setting' => $setting]);
        //$pdf->setPaper('A7', 'portrait');
        $pdf->setPaper('A4', 'portrait');
        //$pdf->setPaper([0, 0, 807.874, 221.102], 'landscape');
        //return $pdf->download('template.pdf');
        return $pdf->stream('relatorio.pdf');

    }
}
