<?php 

 header("Content-Type:text/html;charset=utf-8"); 

 session_start(); 


 if(isset($_SESSION['islogin'])) 

 { 
  $username=$_SESSION['username']; 
 } 

 else

 { //为登录 

  header('Location: /welcome.html');
  exit;
 } 

?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>北邮课程小助手-<?php echo $username; ?></title>
        <style type="text/css">
 body {scrolling:no;
}
 iframe {position:absolute;
 z-index:1;
 top:0px;
 left:0px;
}
</style>
    </head>
  
<body>
 <iframe src="http://127.0.0.1:<?php if($username[0]=='t')echo '8888'; else echo'8887'; ?>" height="100%" width="100%" frameborder="0"></iframe>
</body>   
</html>