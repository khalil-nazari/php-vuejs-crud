<?php

    // connection 
    $conn = new mysqli('localhost', 'root', '', 'vuephp'); 
    if($conn->connect_error) {
        die("Connection Faild! ". $conn->connect_error);
    }
    // echo "Connected to DB"; 


    $result = array('error'=>false);
    $action='';
    
    if(isset($_GET['action'])) {
        $action = $_GET['action'];
    }

    // Fetch data from databse.
    if($action=='read') {
        $sql = $conn->query("SELECT * FROM user ORDER BY id DESC");
        $users = array(); 
        while($row = $sql->fetch_assoc()){
            array_push($users, $row);
        }
        $result['users'] = $users;
    }

    // Insert new record
    if($action=='create') {
        $name = $_POST['name']; 
        $email = $_POST['email']; 
        $phone = $_POST['phone']; 
        $sql = $conn->query("INSERT INTO user (`name`, `email`, `phone`) VALUES ('$name', '$email', '$phone')");
         
        if($sql) {
            $result['message'] = "User added successfully!"; 
        } else {
            $result['error'] = true; 
            $result['message'] = "Failed to add new user!"; 
        }
    }

    // update user. 
    if($action=='update') {
        $id = $_POST['id'];
        $name = $_POST['name']; 
        $email = $_POST['email']; 
        $phone = $_POST['phone']; 

        $sql = $conn->query("UPDATE user SET `name`='$name', `email`='$email', `phone`='$phone' WHERE `id`='$id' "); 

        if($sql) {
            $result['message'] = "User Updated successfully!"; 
        } else {
            $result['error'] = true; 
            $result['message'] = "Failed to update user!"; 
        }
    }

    // Delete user 
    if($action=='delete') {
        $id = $_POST['id'];
        $sql = $conn->query("DELETE from user WHERE `id`='$id'"); 
        $result['sql'] = "888888888888888 id:".$sql; 
        if($sql) {
            $result['message'] = "User deleted successfully!"; 
        } else {
            $result['error'] = true; 
            $result['message'] = "Failed to delete user!"; 
        }
    }

    $conn->close();

    // Comming from serve.
    echo json_encode($result);
?>