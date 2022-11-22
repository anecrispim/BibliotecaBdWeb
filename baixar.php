<?php
$sCaminho = 'temp/json.json';
if(isset($sCaminho) && file_exists($sCaminho)){
    // faz o teste se a variavel não esta vazia e se o arquivo realmente existe
    header('Content-Type: application/json; charset=utf-8');
    // informa o tipo do arquivo ao navegador
    header("Content-Length: ".filesize($sCaminho));
    // informa o tamanho do arquivo ao navegador
    header("Content-Disposition: attachment; filename=".basename($sCaminho));
    // informa ao navegador que é tipo anexo e faz abrir a janela de download,
    //tambem informa o nome do arquivo
    $bool = readfile($sCaminho); // lê o arquivo
    exit; // aborta pós-ações
}