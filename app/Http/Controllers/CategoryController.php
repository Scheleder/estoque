<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Services\LogService;
use App\Services\CpfService;
use App\Models\User;
use App\Models\Category;

class CategoryController extends Controller
{
    public function __construct(LogService $logService, CpfService $cpfService)
    {
        $this->cpfService = $cpfService;
        $this->logService = $logService;
    }

    public function getOne($id): View
    {
        $category = Category::findOrFail($id);

        return view('category.one', [
            'category' => $category
        ]);
    }

    public function getAll(Request $request): View
    {
        $categories = Category::where('user_id', $request->user()->id)->orderBy('name')->get();

        return view('category.all', [
            'categories' => $categories
        ]);
    }

    public function add(Request $request)
    {
        $name = substr($request->name, 0, 255);

        try {
            $category = new Category;
            $category->user_id = $request->user()->id;
            $category->name = $name;
            $category->type = 'Produtos';
            $category->save();
        } catch (\Throwable $th) {
            notify()->error('Ocorreu um erro a adicionar a categoria!');
            info($th);
            return redirect(url()->previous());
        }

        $this->logService->addLog(auth()->user()->id, auth()->user()->name.' adicionou  a categoria '.$category->name);
        notify()->success('Categoria adicionada!');
        return redirect(url()->previous());
    }

    public function remove($id){
        $category = category::findOrFail($id);
        $category->delete();
        $this->logService->addLog(auth()->user()->id, auth()->user()->name.' removeu uma categoria.');
        notify()->success('Categoria removida!');
        return redirect('/categories');
    }

    public function update (Request $request) {
        $data = $request->all();
        if($request->name){
            $name = substr($request->name, 0, 255);
            $data['name'] = $name;
        }
        $category = Category::findOrFail($request->id);
        $category->update($data);
        $this->logService->addLog(auth()->user()->id, auth()->user()->name.' editou os dados da categoria id: '.$category->id);
        notify()->success('Dados atualizados!');
        return redirect(url()->previous());
    }
}
