<?php
	date_default_timezone_set("Europe/London");

	$text = ($_POST['t']); 
  	$q = intval($_POST['q']); 
	
	$time = date ('c');
  
  
  	//$update = "update notes set director_name1='$name', director_photo1='$photo1', director_photo2='$photo2', director_photo3='$photo3', lang='$lang' where code='$code'";// Do Your Insert Query
	//$insert = "INSERT INTO dpenuela_qa (TIME, TEXT, QNumber) VALUES ('$time','$text','$q')";// Do Your Insert Query
  
 	//save text in an array the current text to save. 
 	//first time, then question number associated, then the text
  	$jsArray = array ('time'=>$time, 'qnumber'=> '$q', 'text'=> '$text');
  	$jsonArray = json_encode($jsArray,JSON_UNESCAPED_UNICODE);
  	/*$jsArray = array ('answer'=> array (
  										'time'=>$time, 
  										'q'=> q, 
  										'text'=> text);
  										)
  					);
  	*/
	date_default_timezone_set("Europe/London");
	// DATABASE
	$db_name = "qaio_qa";
	$bd = mysql_connect('localhost', 'qaio_qa', 'qaio_qa');
	mysql_select_db($db_name, $bd);

	$insert = "INSERT INTO answers (TIME, TEXT, QNumber) VALUES ('$time','$text','$q')";// Do Your Insert Query
  
	$Recordset = mysql_query($insert, $bd) or die(mysql_error());

?>