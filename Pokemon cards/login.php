<?php
    require_once 'UserStorage.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        $userStorage = new UserStorage();

        foreach ($userStorage->findAll() as $key => $user)
        {
            if ($user['email'] == $email && $user['password'] == $password)
            {
                session_start();
                $_SESSION['user_id'] = $key;
                
                header('Location: index.php');
                exit();
            }
        }

        header('Location: login.php?error=invalidlogin');
        exit();
    }
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IKémon | Log in</title>
    <link rel="stylesheet" href="styles/main.css">
</head>

<body>
    <header>
        <div class="fejléc">
            <div class="left-side">
                <h1><a href="index.php">IKémon</a> > Log in</h1>
            </div>
            <div class="mid">

            </div>
            <div class="right-side">
                <p><a class="link" href="register.php">Register</a> <a class="link" href="login.php">Log in</a></p>
            </div>
        </div>
    </header>
    <div id="content">
        <div class="center">

            <?php
            if (isset($_GET['error']))
            {
                $error = $_GET['error'];

                if ($error == "invalidlogin")
                {
                    echo("<p style='color: red;'>User doesn't exist.</p>");
                }
            }
            ?>

            <form action="login.php" method="post" autocomplete="off">
                <label for="email">E-mail: </label><br>
                <input type="text" id="email" name="email"><br>

                <label for="password">Password: </label><br>
                <input type="password" name="password" id="password"><br><br>

                <input type="submit" value="Log in">
            </form>
        </div>
    </div>
    <footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
</body>

</html>