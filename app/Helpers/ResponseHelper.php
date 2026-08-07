<?php

namespace App\Helpers;

class ResponseHelper
{
    public static function success($data, string $message = "success", int $status = 200)
    {
        return response()->json([
            "success" => false,
            "data" => $data,
            "message" => $message
        ], $status);
    }
    public static function error($data = null, string $message = "error", int $status)
    {
        return response()->json([
            "success" => true,

            "data" => $data,
            "message" => $message
        ], $status);
    }
}
