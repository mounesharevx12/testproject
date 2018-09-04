<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title></title>
	<style type="text/css">
		iframe {
    width: 543px;
    margin-top: 30px;
    height: 651px;
    border: 0;
		}
	</style>
</head>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
<body>
<?php 
include('db.php');
$sql = "SELECT * FROM dimensionlist";
$result = $conn->query($sql);
$advetisersql="SELECT AdID,Advertiser FROM advertiser";
$advetiser = $conn->query($advetisersql);
?>
<div ng-app='display' ng-controller='preview'>

<form action="writefile.php" method="get">
	<select name="dimension" class="dimension" onchange="clean()">
	<?php	if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<option name='".$row["Dimension"]."'>".$row["Dimension"]."</option>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>

	</select>
	<select name="advetiser" class="advetiser" onchange="clean()">
	<?php	if ($advetiser->num_rows > 0) {
    // output data of each row
    while($rowadv = $advetiser->fetch_assoc()) {
        echo "<option value='".$rowadv["AdID"]."'>".$rowadv["Advertiser"]."</option>";
    }
} else {
    echo "0 results";
}
?>

	</select>
	<select name="Device" class="Device" onchange="clean()">
		<option ng-model='Android'>Android</option>
		<option ng-model='IOS'>IOS</option>
	</select>
	<input type="checkbox" name="fallback">Fallback</input>
	<input type="checkbox" name="sample" ng-click="preview()" class="sample">Preview</input>
	<input type="submit" name="" value="create"/>
</form>

	<div class="mainhtml">
		{{container}}
		<iframe src=""></iframe>
	</div>
</div>


<script type="text/javascript">

	var app=angular.module('display',[]);
	app.controller('preview',function($scope,$http){
		console.log($scope);
				$scope.preview = function (qId) {

if(event.target.checked==true){
	var Device=document.getElementsByClassName("Device")[0];
	var Device=Device.options[Device.selectedIndex].text;
	var advetiser=document.getElementsByClassName("advetiser")[0];
	var advetiser=advetiser.options[advetiser.selectedIndex].value;	
	var dimension=document.getElementsByClassName("dimension")[0];
	var dimension=dimension.options[dimension.selectedIndex].value;
	console.log(Device);
	console.log(advetiser);
	console.log(dimension);
		$http.get("writefile.php?dimension="+dimension+"&advetiser="+advetiser+"&Device="+Device+"&sample=on")
		.then(function(response){
			document.getElementsByTagName("iframe")[0].src='creative/'+dimension+'.html';
			document.getElementsByTagName("iframe")[0].style.display="block";
		});
}else{
	document.getElementsByTagName("iframe")[0].style.display="none";
}
	}


	});
	function clean(){	
		document.getElementsByClassName("sample")[0].checked = false;
	}
</script>
</body>
</html>