<?php
//including the database connection file
include_once("config.php");
include_once("ipgetter.php");
include_once("access.php");
require_once('jwt/BeforeValidException.php');
require_once('jwt/ExpiredException.php');
require_once('jwt/SignatureInvalidException.php');
require_once('jwt/JWT.php');
require_once('jwt/JWK.php');
require_once('jwt/Key.php');

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:3000');
$headers = apache_request_headers();
$result = array('result' => false);
$data = json_decode(file_get_contents("php://input"), TRUE);
$req = 0;
$auth = 0;
if (isset($headers['Authorization'])) {
	$token = explode(" ", $headers['Authorization'])[1];
	$decoded = JWT::decode($token, new Key($publicKey, 'RS256'));
	$adm = get_object_vars($decoded)['admin'];
	$userid = get_object_vars($decoded)['sub'];
	$sqlquery = "SELECT isadmin FROM userdata WHERE userid = '$userid'";
	$res = mysqli_query($mysqli, $sqlquery);
	$sqlresult = mysqli_fetch_array($res);
	if ($sqlresult) {
		$auth = 1;
		if ($adm == 1 && $sqlresult["isadmin"] != 1) {
			$adm = 0;
		}
	}
} else {
	$result['error'] = "unauth";
}
if (!isset($data['req'])) {
	$auth = 0;
}

function isValidUser($mysqli, $userid)
{
	$sqlquery = "SELECT userid FROM userdata WHERE userid = '$userid'";
	$res = mysqli_query($mysqli, $sqlquery);
	$sqlresult = mysqli_fetch_array($res);
	if ($sqlresult) {
		return true;
	} else {
		return false;
	}
}
function isValidCourse($mysqli, $course_id)
{
	$sqlquery = "SELECT course_id FROM courses WHERE course_id = '$course_id'";
	$res = mysqli_query($mysqli, $sqlquery);
	$sqlresult = mysqli_fetch_array($res);
	if ($sqlresult) {
		return true;
	} else {
		return false;
	}
}
$data = json_decode(file_get_contents("php://input"), TRUE);
$result = array('result' => false);
if ($auth == 1 && $adm == 1 && $data['req'] == "getcoursesadm") {
	$sqlquery = "SELECT courses.course_id, courses.course_name, userdata.firstname, courses.created_on,COUNT(course_users.user_id) AS participants FROM `course_users` RIGHT JOIN courses ON courses.course_id = course_users.course_id INNER JOIN userdata ON userdata.userid = courses.owner  GROUP BY course_users.course_id; ";
	if (isset($data['query'])) {
		$query = mysqli_real_escape_string($mysqli, $data['query']);
		if (!empty($query)) {
			$sqlquery = "SELECT courses.course_id, courses.course_name, userdata.firstname, courses.created_on,COUNT(course_users.user_id) AS participants FROM `course_users` INNER JOIN courses ON courses.course_id = course_users.course_id INNER JOIN userdata ON userdata.userid = courses.owner  GROUP BY course_users.course_id  WHERE courses.course_name LIKE '$query%'";
		}
	}
	$res = mysqli_query($mysqli, $sqlquery);
	$result['arr'] = [];
	$result['result'] = true;
	while ($row = mysqli_fetch_assoc($res)) {
		$result['arr'][] = $row;
	}
} else if ($auth == 1 && $adm == 1 && $data['req'] == "newcourse") {
	if (isset($data['arg'])) {
		$arg = mysqli_real_escape_string($mysqli, $data['arg']);
		$date = date("Y-m-d");
		if (!empty($arg)) {
			$sqlquery = "INSERT INTO courses(course_name,owner,created_on) VALUES ('$arg','$userid','$date')";
			$res = mysqli_query($mysqli, $sqlquery);
			$result['result'] = $res;
		} else {
			$result['error'] = "name_empty";
		}
	} else {
		$result['error'] = "name_empty";
	}
} else if ($auth == 1 && $adm == 1 && $data['req'] == "getusers") {
	$sqlquery = "SELECT userid,firstname,useremail,isadmin,age FROM userdata";
	if (isset($data['query'])) {
		$query = mysqli_real_escape_string($mysqli, $data['query']);
		if (!empty($query)) {
			$sqlquery = "SELECT userid,firstname,useremail,isadmin,age FROM userdata WHERE firstname LIKE '$query%'";
		}
	}
	$res = mysqli_query($mysqli, $sqlquery);
	$result['arr'] = [];
	$result['result'] = (!$res) ? true : false;
	while ($row = mysqli_fetch_assoc($res)) {
		$result['arr'][] = $row;
	}
} else if ($auth == 1 && $adm == 1 && $data['req'] == "delcourse") {
	if (isset($data['arg'])) {
		$arg = mysqli_real_escape_string($mysqli, $data['arg']);
		if (!empty($arg)) {
			$sqlquery = "DELETE FROM courses WHERE course_id = '$arg'";
			$res = mysqli_query($mysqli, $sqlquery);
			$sqlquery = "DELETE FROM course_users WHERE course_id = '$arg'";
			$res2 = mysqli_query($mysqli, $sqlquery);
			$result['result'] = $res && $res2;
			error_log("res : " . $res . "res 2 " . $res2);
		} else {
			$result['error'] = "name_empty";
		}
	} else {
		$result['error'] = "name_empty";
	}
} else if ($auth == 1 && $adm == 1 && ($data['req'] == "makeadmin" || $data['req'] == "remadmin" || $data['req'] == "deluser" ||  $data['req'] == "remfromcourse")) {
	if (isset($data['arg'])) {
		$struserid = [];
		foreach ($data['arg'] as $value) {
			array_push($struserid, "userid = " . $value);
		}
		$strquery = join(" OR ", $struserid);
		$arg = mysqli_real_escape_string($mysqli, $strquery);
		$query = '';
		if (isset($data['query'])) {
			$query = mysqli_real_escape_string($mysqli, $data['query']);
		}
		$date = date("Y-m-d");
		if (!empty($arg)) {
			if ($data['req'] == "makeadmin") {
				$sqlquery = "UPDATE userdata SET isadmin = 1 WHERE $strquery";
			} else if ($data['req'] == "remadmin") {
				$sqlquery = "UPDATE userdata SET isadmin = 0 WHERE $strquery";
			} else if ($data['req'] == "deluser") {
				$sqlquery = "DELETE FROM userdata WHERE $strquery;DELETE FROM course_users WHERE $strquery";
			} else if ($data['req'] == "remfromcourse" && !empty($query)) {
				$strquery = str_replace("userid", "user_id", $strquery);
				$sqlquery = "DELETE FROM course_users WHERE course_id = '$query' AND ($strquery)";
			}
			$res = mysqli_query($mysqli, $sqlquery);
			$result['result'] = $res;
		} else {
			$result['error'] = "name_empty";
		}
	} else {
		$result['error'] = "name_empty";
	}
} else if ($auth == 1 && $adm == 1 && ($data['req'] == "addtocourse")) {
	if (isset($data['query'])) {
		$query = mysqli_real_escape_string($mysqli, $data['query']);
		if (!empty($query) && isValidCourse($mysqli, $query)) {
			$strquery = "";
			$date = date("Y-m-d");
			foreach ($data['arg'] as $value) {
				if (isValidUser($mysqli, $value)) {
					$temp = mysqli_real_escape_string($mysqli, $value);
					$strquery = "INSERT INTO course_users(course_id,user_id,added_on) VALUES('$query','$temp','$date')";
					$res = mysqli_query($mysqli, $strquery);
					$result['result'] = $res;
				}
			}
		}
	} else {
		$result['error'] = "name_empty";
	}
} else if ($auth == 1 && ($data['req'] == "getcourse")) {
	if (isset($data['query'])) {
		$query = mysqli_real_escape_string($mysqli, $data['query']);
		if (!empty($query) && isValidCourse($mysqli, $query)) {
			$sqlquery = "SELECT course_id,course_name,owner,created_on FROM courses WHERE course_id = '$query'";
			$res = mysqli_query($mysqli, $sqlquery);
			$result['result']=true;
			while ($row = $res->fetch_assoc()) {
				$result['arr'] = $row;
			}
		}
	} else {
		$result['error'] = "name_empty";
	}
}
echo json_encode($result);
