<?php
namespace App\Services;

class CpfService
{
    public function validate($cpf)
    {
        // Remove os caracteres que não são números
        $cpf = preg_replace('/[^0-9]/is', '', $cpf);

        // Verifica se o CPF possui 11 dígitos
        if (strlen($cpf) != 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        $soma = 0;
        for ($i = 0; $i < 9; $i++) {
            $soma += ($cpf[$i] * (10 - $i));
        }
        $digito1 = 11 - ($soma % 11);
        if ($digito1 > 9) {
            $digito1 = 0;
        }

        // Calcula o segundo dígito verificador
        $soma = 0;
        for ($i = 0; $i < 10; $i++) {
            $soma += ($cpf[$i] * (11 - $i));
        }
        $digito2 = 11 - ($soma % 11);
        if ($digito2 > 9) {
            $digito2 = 0;
        }

        // Verifica se os dígitos verificadores estão corretos
        if (($cpf[9] != $digito1) || ($cpf[10] != $digito2)) {
            return false;
        }

        return true;

    }
}
