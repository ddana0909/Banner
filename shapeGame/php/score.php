<?php
$connect_error = "Sorry, we're experiencing connection problems.";
mysql_connect('localhost', 'root', '') or die($connect_error);
mysql_select_db('smartfun_db') or die($connect_error);

$score = mysql_real_escape_string($_POST['score']);

$updateScore = "UPDATE users SET score = score+$score WHERE user_id = 1";
mysql_query($updateScore) or die(mysql_error());


mysql_close();

?>