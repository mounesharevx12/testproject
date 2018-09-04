<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<?php
include('db.php');
  header('Content-Type: text/html; charset=ISO-8859-1');
$sql = "SELECT * FROM testhere";
$result = $conn->query($sql);
while($row = $result->fetch_assoc()) {
print_r($row);
    }
?>
