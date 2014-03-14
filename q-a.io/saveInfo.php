<?php
	date_default_timezone_set("Europe/London");
	// DATABASE
	$db_name = "qaio_qa";
	$bd = mysql_connect('localhost', 'qaio_qa', 'qaio_qa');
	mysql_select_db($db_name, $bd);

	$text = mysql_real_escape_string($_GET['text']); 
  	$q = mysql_real_escape_string($_GET['q']); 
	
	$time = date ('c');
  
  
  	//$update = "update notes set director_name1='$name', director_photo1='$photo1', director_photo2='$photo2', director_photo3='$photo3', lang='$lang' where code='$code'";// Do Your Insert Query
	$insert = "INSERT INTO answers (TIME, TEXT, QNumber) VALUES ('$time','$text','$q')";// Do Your Insert Query
  
	$Recordset = mysql_query($insert, $bd) or die(mysql_error());
?>