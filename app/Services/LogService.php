<?php
namespace App\Services;

use App\Models\Log;

class LogService
{
    public function addLog($user_id, $msg)
    {
        $log = new Log;
        $log->user_id = $user_id;
        $log->description = $msg;
        $log->save();
        return;
    }
}
