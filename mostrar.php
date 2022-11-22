<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>JSON</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel = "shortcut icon" href = "img/logo-json.png"/> 
  <script src="https://kit.fontawesome.com/7ade279155.js" crossorigin="anonymous"></script>
</head>
<body>
<!-- partial:index.partial.html -->
<!-- multistep form -->
<form id="msform">
  <!-- fieldsets -->
  <fieldset>
    <h2 class="fs-title">JSON Gerado</h2>
    <pre style="text-align: initial;">
        <?php
        print(file_get_contents('temp/json.json'));
        ?>
    </pre>
  </fieldset>
</form>
<!-- partial -->
<script src='//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js'></script><script  src="js/script.js"></script>
</body>
</html>
