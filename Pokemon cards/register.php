<?php
    require_once 'UserStorage.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $username = $_POST['username'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $password2 = $_POST['passwordagain'] ?? '';

        $userStorage = new UserStorage();
        $errors = [];

        foreach ($userStorage->findAll() as $key => $user)
        {
            if ($user['username'] == $username)
            {
                $errors[] = 'userexists';
            }

            if ($user['email'] == $email)
            {
                $errors[] = 'emailexists';
            }
        }

        if (empty($username) || strpos($username, ' ') === 0)
        {
            $errors[] = 'invalidusername';
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL))
        {
            $errors[] = 'invalidemail';
        }

        if (strlen($password) < 8) 
        {
            $errors[] = 'shortpassword';
        }

        if ($password != $password2)
        {
            $errors[] = 'passwordsdontmatch';
        }

        if (!empty($errors))
        {
            header('Location: register.php?error=' . implode(',', $errors));
            exit();
        }

        $newUser = [
            'username' => $username,
            'email' => $email,
            'password' => $password,
            'cards' => 0,
            'money' => 500,
            'inventory' => "",
        ];

        $userId = $userStorage->add($newUser);

        session_start();
        $_SESSION['user_id'] = $userId;
        
        header('Location: index.php');
        exit();
    }
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IKémon | Register</title>
    <link rel="stylesheet" href="styles/main.css">
</head>

<body>
    <header>
        <div class="fejléc">
            <div class="left-side">
                <h1><a href="index.php">IKémon</a> > Register</h1>
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
                $errors = explode(',', $_GET['error']);
                
                foreach ($errors as $error)
                {
                    if ($error == "userexists")
                    {
                        echo('<p style="color: red;">Username already taken.</p>');
                    }

                    if ($error == "invalidusername")
                    {
                        echo('<p style="color: red;">Username must not be empty or start with space.</p>');
                    }

                    if ($error == "emailexists")
                    {
                        echo('<p style="color: red;">E-mail already taken.</p>');
                    }

                    if ($error == "invalidemail")
                    {
                        echo('<p style="color: red;">E-mail is invalid.</p>');
                    }

                    if ($error == "shortpassword")
                    {
                        echo('<p style="color: red;">Password needs to be at least 8 characters long.</p>');
                    }

                    if ($error == "passwordsdontmatch")
                    {
                        echo('<p style="color: red;">Passwords must match.</p>');
                    }
                }
            }
        ?>

        <form action="register.php" method="post" autocomplete="off">
            <label for="username">User name: </label><br>
            <input type="text" id="username" name="username" required><br>

            <label for="email">E-mail: </label><br>
            <input type="text" id="email" name="email" required><br>

            <label for="password">Password: </label><br>
            <input type="password" name="password" id="password" required><br>
            
            <label for="password">Password again: </label><br>
            <input type="password" name="passwordagain" id="passwordagain" required><br><br>

            <input type="submit" value="Register">
        </form>

        </div>
    </div>
    <footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
</body>

</html>