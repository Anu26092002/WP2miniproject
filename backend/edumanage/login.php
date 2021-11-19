<?php
//including the database connection file
include_once("config.php");
include_once("ipgetter.php");
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:3000');
$data = json_decode(file_get_contents("php://input"), TRUE);
$result = array('result' => false);
if(isset($data['email'])) {	
	$email = mysqli_real_escape_string($mysqli, $data['email']);
    $passwd = mysqli_real_escape_string($mysqli, $data['passwd']);
	// checking empty fields
	if(empty($email) || empty($passwd)) {
        $result['error']="emptyfield";
        echo (json_encode($result));
		
	} else { 	
        $ipaddress = get_client_ip();
		$res = mysqli_query($mysqli, "SELECT * FROM userdata WHERE useremail = '$email'");
		$sqlresult = mysqli_fetch_array($res);
		if(!$sqlresult)
		{
			$result["error"] = "incorrect";
		}
		if(password_verify($passwd,$sqlresult["passwd"])){
			$res = mysqli_query($mysqli, "UPDATE userdata SET lastlogin = '$ipaddress' WHERE useremail = '$email'");
			$result["result"] = true;
		}
		else{
			$result["error"] = "incorrect";
		}
		echo (json_encode($result));
	}
}
else{
    $result['error']="emailunset";
     echo (json_encode($result));
}
?>