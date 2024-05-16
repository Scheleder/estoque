<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Services\LogService;
use App\Services\CpfService;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Intervention\Image\Facades\Image;

class ProductController extends Controller
{
    public function __construct(LogService $logService, CpfService $cpfService)
    {
        $this->cpfService = $cpfService;
        $this->logService = $logService;
    }

    public function getOne($id): View
    {
        $product = Product::findOrFail($id);
        $categories = Category::where('user_id', auth()->user()->id)->orderBy('name')->get();

        return view('product.one', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function getAll(Request $request): View
    {
        $products = Product::where('user_id', $request->user()->id)->where('active', '1')->orderBy('description')->get();
        $categories = Category::where('user_id', $request->user()->id)->orderBy('name')->get();

        return view('product.all', [
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function getOrd($ordem): View
    {
        $products = Product::where('user_id', auth()->user()->id)->where('active', '1')->orderBy($ordem, 'ASC')->get();
        $categories = Category::where('user_id', auth()->user()->id)->orderBy('name')->get();

        return view('product.all', [
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function add(Request $request)
    {
        $value = preg_replace('/[^\d\.\,]/', '', $request->value);
        $amount = 0;
        if($request->amount){
            $amount = preg_replace('/[^\d]/', '', $request->amount);
        }
        $desc = substr($request->description, 0, 255);
        $category = $request->category_id ? $request->category_id : 1;

        try {
            $product = new Product;
            $product->user_id = $request->user()->id;
            $product->category_id = $category;
            $product->value = str_replace(',', '.', $value);
            $product->description = $desc;
            $product->amount = $amount;
            $product->save();
        } catch (\Throwable $th) {
            notify()->error('Ocorreu um erro a adicionar o produto!');
            info($th);
            return redirect(url()->previous());
        }

        $this->logService->addLog(auth()->user()->id, auth()->user()->name.' adicionou  o produto id: '.$product->id);
        notify()->success('Produto adicionado!');
        return redirect(url()->previous());
    }

    public function remove($id){
        $product = Product::findOrFail($id);
        if($product->sales->count() > 0){
            $product->active = '0';
            $product->save();
        }else{
            $product->delete();
        }
        $this->logService->addLog(auth()->user()->id, auth()->user()->name.' removeu o produto '.$product->description);
        notify()->success('Produto removido!');
        return redirect('/products');
    }

    public function update (Request $request) {
        $data = $request->all();
        if($request->cost){
            $cost = preg_replace('/[^\d\.\,]/', '', $request->cost);
            $data['cost'] = str_replace(',', '.', $cost);
        }
        if($request->value){
            $value = preg_replace('/[^\d\.\,]/', '', $request->value);
            $data['value'] = str_replace(',', '.', $value);
        }
        $product = Product::findOrFail($request->id);

        // Image Upload
        if($request->hasFile('image') && $request->file('image')->isValid()) {
            if($product->image != 'product.png'){
                unlink(public_path('img/products/').$product->image);
                }
            $requestImage = $request->image;
            $extension = $requestImage->extension();
            $imageName = md5($requestImage->getClientOriginalName() . strtotime("now")) . "." . $extension;
            $data['image'] = $imageName;
            Image::make($requestImage)->resize(400, 200)->save(public_path('img/products/').$imageName, 60, 'jpg');
            $product->update($data);
            $this->logService->addLog(auth()->user()->id, auth()->user()->name.' atualizou a imagem do produto id: '.$product->id);
            notify()->success('Imagem atualizada!');
            return redirect(url()->previous());
        }

        $product->update($data);
        $this->logService->addLog(auth()->user()->id, auth()->user()->name.' editou os dados do produto id: '.$product->id);
        notify()->success('Dados atualizados!');
        return redirect(url()->previous());
    }
}
