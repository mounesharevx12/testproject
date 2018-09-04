<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<?php
include("db.php");

$my_file = 'creative/'.$_GET['dimension'].'.html';
$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
$sql = "SELECT * FROM global_code";
$result = $conn->query($sql);
    while($row = $result->fetch_assoc()) {
        $globalcss=$row['CSS'];
        $globalJS=$row['JS'];
        $globalHTML=$row['HTML'];
    }
$dimesnquery="SELECT * FROM dimensionlist where Dimension='".$_GET['dimension']."'";
$dimresult=   $conn->query($dimesnquery);
while($dimrow = $dimresult->fetch_assoc()) {

        $GLOBALS['dimcss']=$dimrow['CSS'];

        $GLOBALS['dimJS']=$dimrow['JS'];
    }

$advetiser="SELECT * FROM advertiser where AdID='".$_GET['advetiser']."'";
$advetiserresult=$conn->query($advetiser);
    while($rowad = $advetiserresult->fetch_assoc()) {
    	
        $advandstore=$rowad['Androidstore'];
        $adviosstore=$rowad['iosstore'];
        $advandmmp=$rowad['MMPAndr'];
        $adviosmmp=$rowad['MMPIOS'];
        $advJS=$rowad['JS'];
        $advfont=$rowad['Fontlink'];
        $advfallback=$rowad['Fallback'];
        $advsample=$rowad['Sample_Data'];
        $advCSS=$rowad['CSS'];
        $advadJS=$rowad['AddJS'];
       
    }
    print_r("<script>console.log('$advJS')</script>");
    if($_GET['Device']=='IOS'){
    	$homelink=$adviosstore;
    }else{
    	$homelink=$advandstore;
    }
    if(isset($_GET['fallback'])){

    }else{
    	$advfallback='';
    }

$store=str_replace('|AndrStore|',$advandstore,$globalJS);
$itune=str_replace('|IOSStore|',$adviosstore,$store);
$mmpAndr=str_replace('|mmpAndr|',$advandmmp,$itune);
$mmpios=str_replace('|mmpIOS|',$adviosmmp,$mmpAndr);
$Homestore=str_replace('|Homestore|',$homelink,$mmpios);
$dimesionchange=str_replace('|Dimensions|',$GLOBALS['dimJS'],$Homestore);
$StaticData=str_replace('|StaticData|',$advJS,$dimesionchange);
if(isset($_GET['sample'])){
$StaticData=str_replace('|DYNAMIC|NOENCODING|',$advsample,$StaticData);
}else{

}
$html='<!DOCTYPE html>
<html>
<head>
	<title></title>
'.$advfont.'
	<style type="text/css">
'.$globalcss.$GLOBALS["dimcss"].$advCSS.'
	</style>
	<script type="text/javascript">
	'.$StaticData.$advadJS.$advfallback.'
	</script>
</head>
<body>
'.$globalHTML.'
</body>
</html>';

//print_r(realpath($my_file));

fwrite($handle, $html);
?>
<a href="<?php echo $my_file ?>" download>Download Here</a>