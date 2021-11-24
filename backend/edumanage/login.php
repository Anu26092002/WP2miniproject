<?php
//including the database connection file
include_once("config.php");
include_once("ipgetter.php");
include_once("access.php");
require_once 'jwt/BeforeValidException.php';
require_once 'jwt/ExpiredException.php';
require_once 'jwt/SignatureInvalidException.php';
require_once 'jwt/JWT.php';
use \Firebase\JWT\JWT;

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
			$res2 = mysqli_query($mysqli, "UPDATE userdata SET lastlogin = '$ipaddress' WHERE useremail = '$email'");
			$result["result"] = true;
			$curTime = time();
			$token = array("sub" => $sqlresult['userid'],"iat" => $curTime,"exp" => $curTime + 2592000,"admin"=>false);
    		$result['jwt'] = JWT::encode($token, $privateKey, 'RS256');
			$result['name'] = $sqlresult['firstname']; 
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