<?php

$file = $_GET['file'];
header('Content-type: image/png');
header("Content-disposition: attachment; filename=image.png");
readfile($file);
?>
