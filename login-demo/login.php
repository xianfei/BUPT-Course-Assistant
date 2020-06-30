<?PHP
    header("Content-Type: text/html; charset=utf8");
    if(!isset($_POST["submit"])){
        exit("错误执行");
    }//检测是否有submit操作 
session_start(); 
    $name = $_POST['name'];//post获得用户名表单值
    $passowrd = $_POST['password'];//post获得用户密码单值

    if ($name && $passowrd){//如果用户名和密码都不为空
             if(1){//0 false 1 true
                 
	$_SESSION['username']=$name; 
   	$_SESSION['islogin']=1; 
   header('refresh:0;url=index.php'); 
                   exit;
             }else{
                echo "用户名或密码错误";
                echo "
                    <script>
                            setTimeout(function(){window.location.href='login.html';},10000);
                    </script>

                ";//如果错误使用js 1秒后跳转到登录页面重试;
             }
             

    }else{//如果用户名或密码有空
                echo "表单填写不完整";
                echo "
                      <script>
                            setTimeout(function(){window.location.href='login.html';},10000);
                      </script>";

                        //如果错误使用js 1秒后跳转到登录页面重试;
    }

    mysqli_close($con);//关闭数据库
?>