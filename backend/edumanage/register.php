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
if (isset($data['email'])) {
	$firstname = mysqli_real_escape_string($mysqli, $data['firstname']);
	$age = mysqli_real_escape_string($mysqli, $data['age']);
	$email = mysqli_real_escape_string($mysqli, $data['email']);
	$passwd = mysqli_real_escape_string($mysqli, $data['passwd']);
	// checking empty fields
	if (empty($firstname) || empty($email) || empty($passwd)) {
		$result['error'] = "emptyfield";
		echo (json_encode($result));
	} else {
		$result["status"] = "check complete";
		$ipaddress = get_client_ip();
		$res = mysqli_query($mysqli, "SELECT * FROM userdata WHERE useremail = '$email'");
		$sqlresult = mysqli_fetch_array($res);
		if ($sqlresult) {
			$result['result']=false;
			$result['error']="already_exists";
			echo (json_encode($result));
		} else {
			$pwhash = password_hash($passwd, PASSWORD_DEFAULT);
			$result['result'] = mysqli_query($mysqli, "INSERT INTO userdata(firstname,age,useremail,passwd,lastlogin) VALUES('$firstname','$age','$email','$pwhash','$ipaddress')");
			$res = mysqli_query($mysqli, "SELECT * FROM userdata WHERE useremail = '$email'");
			$sqlresult = mysqli_fetch_array($res);
			$curTime = time();
			$token = array("sub" => $sqlresult['userid'],"iat" => $curTime,"exp" => $curTime + 2592000,"admin"=>false);
    		$result['jwt'] = JWT::encode($token, $privateKey, 'RS256');
			$result['name'] = $sqlresult['firstname']; 
			echo (json_encode($result));
		}
	}
} else {
	$result['error'] = "emailunset";
	echo (json_encode($result));
}
