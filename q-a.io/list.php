<?php
  // DATABASE
  $db_name = "qaio_qa";

  $bd = mysql_connect('localhost', 'qaio_qa', 'qaio_qa');
  mysql_select_db($db_name, $bd);
  $result = mysql_query('SELECT * FROM answers ORDER BY QNumber ASC');
  if (!$result) {
    die('Invalid query: ' . mysql_error());
  }
?> 
<!DOCTYPE html>
  <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
  <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
  <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
  <!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>QA</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/background.css">

    <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    <script></script>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.1.min.js"><\/script>')</script>

    <script src="js/auxiliar.js"></script>
  </head>
  <body id="list">
    <!--[if lt IE 7]>
        <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <header id="header" class="navbar-fixed-top">
      <div class="container">
        <div class="row">
          <div id="left" class="col-xs-3 col-md-5"><a id="nextOne" href="/index.php?q=1">Q&A</a></div>
          <div id="right" class="col-xs-3 col-md-5"><a id="nextOne" href="/index.php?q=2">Ask another!</a></div>
        </div>
      </div>
    </header>
    <article>
      <div id="all_answers" class="block">
        <div class="container inner boh">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID Q</th>
                <th>Q Group</th>
                <th>TIME</th>
                <th>TEXT</th>
              </tr>
            </thead>
            <tbody>
            <?php 
              $counter =0;
              while($row = mysql_fetch_array($result)){
                echo '<tr>
                <td>'.$row["ID"].'</td>
                <td>'.$row["QNumber"].'</td>
                <td>'.$row["TIME"].'</td>
                <td>'.$row["TEXT"].'</td>
                </tr><br/>';
              }
                mysqli_close($bd);
            ?>
            </tbody>
          </table>
        </div>
      </div><!-- !all answers-->
    </article>
  
    <script src="js/vendor/bootstrap.min.js"></script>
  </body>
</html>
