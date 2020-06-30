<?php 

 header("Content-Type:text/html;charset=utf-8"); 

 session_start(); 

 //清除session 

 $username=$_SESSION['username']; 
 echo $username."，您已经退出系统<br>"; 

 echo "将在两秒后返回主页面"; 
 echo "
                    <script>
                            setTimeout(function(){parent.window.location.href='index.php';},2000);
                    </script>

                ";

 $_SESSION=array(); 

 session_destroy(); 

 //清除cookie 

 setcookie("username",'',time()-1); 

 setcookie("code",'',time()-1); 

 

?>