<?php
//including the database connection file
include_once("config.php");
include_once("ipgetter.php");
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:3000');
$data = json_decode(file_get_contents("php://input"), TRUE);
$result = array('result' => false);
if(isset($data['email'])) {	
	$firstname = mysqli_real_escape_string($mysqli, $data['firstname']);
	$age = mysqli_real_escape_string($mysqli, $data['age']);
	$email = mysqli_real_escape_string($mysqli, $data['email']);
    $passwd = mysqli_real_escape_string($mysqli, $data['passwd']);
	// checking empty fields
	if(empty($firstname) || empty($email) || empty($passwd)) {
        $result['error']="emptyfield";
        echo (json_encode($result));
	} else { 
        $result["status"]="check complete";	
        $ipaddress = get_client_ip();
        $pwhash = password_hash($passwd,PASSWORD_DEFAULT);
		$result['result'] = mysqli_query($mysqli, "INSERT INTO userdata(firstname,age,useremail,passwd,lastlogin) VALUES('$firstname','$age','$email','$pwhash','$ipaddress')");
		echo (json_encode($result));
	}
}
else{
    $result['error']="emailunset";
     echo (json_encode($result));
}
?>
