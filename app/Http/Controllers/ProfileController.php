<?php

namespace App\Http\Controllers;

use App\Services\LogService;
use App\Services\CpfService;
use App\Models\Configuration;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Intervention\Image\Facades\Image;
use DB;

class ProfileController extends Controller
{
    public function __construct(LogService $logService, CpfService $cpfService)
    {
        $this->cpfService = $cpfService;
        $this->logService = $logService;
    }

    public function dashboard()
    {
        $user_id = auth()->user()->id;

        $sales = DB::table('sales')->select([
            DB::raw("COUNT(*) as qtde"),
            DB::raw("MONTH(updated_at) as mês")])
            ->where('user_id',$user_id)
            ->groupBy("mês")
            ->orderBy('mês','ASC')
            ->pluck('qtde', 'mês');

        $invoicing = DB::table('sales')->select([
            DB::raw("sum(value) as value"),
            DB::raw("MONTH(updated_at) as mês")])
            ->where('user_id',$user_id)
            ->groupBy("mês")
            ->orderBy('mês','ASC')
            ->pluck('value', 'mês');

        $allSales = DB::table('items')
            ->join('sales', 'items.sale_id', '=', 'sales.id')
            ->join('products', 'items.product_id', '=', 'products.id')
            ->select([
                DB::raw("sum(qtty) as qtty"),
                DB::raw("products.description as product")
            ])
            ->where('sales.user_id', $user_id)
            ->groupBy("products.description")
            ->orderBy('qtty','DESC')
            ->pluck('qtty', 'product');

        $bestSellers = $allSales->take(9);

        if(count($allSales)>9){
            $others = $allSales->skip(9);
            $othersSum = (string)$others->values()->sum();
            $bestSellers->put("Outros", $othersSum);
        }

        $labels = $sales->keys();
        $data = $sales->values();
        $values = $invoicing->values();

        foreach($labels as $i=>$label){
            if ($label == 1)$labels[$i]='Janeiro';
            if ($label == 2)$labels[$i]='Fevereiro';
            if ($label == 3)$labels[$i]='Março';
            if ($label == 4)$labels[$i]='Abril';
            if ($label == 5)$labels[$i]='Maio';
            if ($label == 6)$labels[$i]='Junho';
            if ($label == 7)$labels[$i]='Julho';
            if ($label == 8)$labels[$i]='Agosto';
            if ($label == 9)$labels[$i]='Setembro';
            if ($label == 10)$labels[$i]='Outubro';
            if ($label == 11)$labels[$i]='Novembro';
            if ($label == 12)$labels[$i]='Dezembro';
        }

        return view('dashboard', ['values' => $values, 'data' => $data,'labels' => $labels, 'bestSellers' => $bestSellers]);
    }

    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        if($request->cpf || $request->pix){
            if(!$this->cpfService->validate($request->cpf) )
            {
                notify()->warning('CPF inválido!');
                return redirect(url()->previous());
            }
            $configuration = Configuration::firstOrCreate(['user_id' => $request->user()->id]);
            $configuration->cpf = preg_replace('/[^0-9]/is', '', $request->cpf);
            $configuration->pix = $request->pix;
            $configuration->city = $request->city;
            $configuration->save();
        }

        if($request->theme){
            $configuration = Configuration::firstOrCreate(['user_id' => $request->user()->id]);
            if($request->theme == 'dark')$request->dark = '1';
            if($request->theme == 'light')$request->dark = '0';
            $configuration->dark = $request->dark;
            $configuration->save();
        }

        if($request->options){
            $configuration = Configuration::firstOrCreate(['user_id' => $request->user()->id]);
            if($request->options == '1'){$configuration->product = 0; $configuration->stock = 0;}
            if($request->options == '2'){$configuration->product = 1; $configuration->stock = 0;}
            if($request->options == '3'){$configuration->product = 1; $configuration->stock = 1;}
            $configuration->save();
        }

        // Image Upload and resize
        if($request->hasFile('image') && $request->file('image')->isValid()) {
            $configuration = Configuration::firstOrCreate(['user_id' => $request->user()->id]);
            if($configuration->image != 'foto.png'){
                unlink(public_path('img/users/').$configuration->image);
                }
            $requestImage = $request->image;
            $extension = $requestImage->extension();
            $imageName = md5($requestImage->getClientOriginalName() . strtotime("now")) . "." . $extension;
            $configuration->image = $imageName;
            Image::make($requestImage)->resize(200, 200)->save(public_path('img/users/').$imageName, 60, 'jpg');
            $configuration->save();
        }

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();
        notify()->success('Salvo!');
        $this->logService->addLog($request->user()->id, $request->user()->name.' atualizou suas informações de perfil');

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        notify()->success('Usuário excluído!');
        $this->logService->addLog(auth()->user()->id, auth()->user()->name.' foi removido');

        return Redirect::to('/');
    }

    public function logs(){

        $file = storage_path() . "/logs/laravel.log";
        $arquivo = fopen($file, "r") or die("Unable to open file!");
        $logs = fread($arquivo,filesize($file));
        fclose($arquivo);

        return view('profile.logs', [
            'user' => auth()->user(),
            'logs' => $logs
        ]);
    }

    public function colors(){
        return view('profile.colors', [
            'user' => auth()->user()
        ]);
    }

    public function notepad(){
        return view('profile.notepad', [
            'user' => auth()->user()
        ]);
    }

    public function notesUpdate(Request $request)
    {
        $configuration = Configuration::firstOrCreate(['user_id' => $request->user()->id]);
        $configuration->notes = $request->notes;
        $configuration->save();
        notify()->info('Salvo!');
        return redirect()->back();
    }

}
