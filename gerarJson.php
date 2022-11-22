<?php

$aBdArrays = [];

$aBdArrays['connection'] = [
      'url' => $_POST['url']
    , 'port' => $_POST['port']
    , 'user' => $_POST['user']
    , 'password' => $_POST['password']
];

$aTables['tables'] = [];

foreach ($_POST['columns'] as $sTable => $aColuna) {
    $aColumns= [];
    foreach ($aColuna as $sColuna) {
        $aColumns[] = [
            "name" => $sColuna
            , "type" => $_POST['types'][$sColuna]
        ];
    }
    foreach ($_POST['tables'] as $sTb) {
        if ($sTable == $sTb) {
            $aTables['tables'][] = [
                "name" => $sTb
                , "columns" => $aColumns
            ];
        } else {
            continue;
        }
    }
}

$aBdArrays['bd'] = [
    'sgbd' => $_POST['tipoBD']
    , 'dataBaseName' => $_POST['nameBD']
    , 'tables' => $aTables['tables']
];

$sArquivo = 'json.json';
$json = json_encode($aBdArrays, JSON_PRETTY_PRINT);
$file = fopen('temp/'. $sArquivo,'w');
fwrite($file, $json);
fclose($file);
?>