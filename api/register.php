<?php
    $username = $_POST['username'];
    $password = $_POST['password'];
    // $username="静静";
    // $password="123456";
    $con=mysqli_connect('localhost','root','111111','goods');

    /*
    获取到用户名和密码之后 先去数据库中判断这个用户名是否存在
    如果用户名存在，直接返回 用户名已经存在
    如果用户名不存在，把这个用户名和密码 插入数据库
    */ 
    $sql = "SELECT * FROM `stu1` WHERE `username` = '$username'";//连接数据库的内容匹配
    
    // $sql="INSERT INTO `stu` (`id`, `username`,  `password`) VALUES (null, '$username', '$password');";
    $res=mysqli_query($con,$sql);
    if(!$res){
        die('报错'.mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    // print_r($row);
    if($row){
        //如果能够进入这条数据，说明数据库中已经存在该用户
        print_r("用户名存在");
    }else{
        $sqll="INSERT INTO `stu1` ( `id`,`username`,  `password`) VALUES (null,  '$username', '$password');";
        $res1=mysqli_query($con,$sqll);
        if($res1){
            print_r("注册成功");
        }
    }
?>