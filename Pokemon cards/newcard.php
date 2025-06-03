<?php
    session_start();

    $logged_in;

    if (isset($_SESSION['user_id']))
    {
        $userId = $_SESSION['user_id'];
        $logged_in = true;

        require_once 'UserStorage.php';

        $userStorage = new UserStorage();

        $user = $userStorage->findById($userId);

        if ($user['id'] != "admin")
        {
            header('Location: index.php');
            exit();
        }

        if (isset($_GET['action']) && $_GET['action'] == 'logout')
        {
            session_destroy();
            
            header('Location: index.php');
            exit();
        }
    }
    else
    {
        $logged_in = false;
        header('Location: index.php');
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $name = ucfirst(strtolower($_POST['name'] ?? ''));
        $type = strtolower($_POST['type'] ?? '');
        $hp = (int)$_POST['hp'] ?? '';
        $attack = (int)$_POST['attack'] ?? '';
        $defense = (int)$_POST['defense'] ?? '';
        $price = (int)$_POST['price'] ?? '';
        $description = $_POST['description'] ?? '';
        $image = $_POST['image'] ?? '';
    
        $errors = [];
        $types = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy", "stellar"];

        if (empty($name) || strpos($name, ' ') === 0 || preg_match('/\d/', $name))
        {
            $errors[] = 'invalidname';
        }

        if (empty($type) || strpos($type, ' ') === 0 || preg_match('/\d/', $type))
        {
            $errors[] = 'invalidtype1';
        }

        if (in_array($type, $types))
        {
            $errors[] = 'invalidtype2';
        }

        if ($hp < 1)
        {
            $errors[] = 'invalidhp';
        }

        if ($attack < 1)
        {
            $errors[] = 'invalidattack';
        }

        if ($defense < 1)
        {
            $errors[] = 'invaliddefense';
        }

        if ($price < 1)
        {
            $errors[] = 'invalidprice';
        }

        if (empty($description) || strpos($description, ' ') === 0)
        {
            $errors[] = 'invaliddescription';
        }

        if (empty($image) || strpos($image, ' ') === 0)
        {
            $errors[] = 'invalidimage1';
        }

        if (!filter_var($image, FILTER_VALIDATE_URL))
        {
            $errors[] = 'invalidimage2';
        }

        if (!empty($errors))
        {
            header('Location: newcard.php?error=' . implode(',', $errors));
            exit();
        }

        $newPokemon = [
            "name" => $name,
            "type" =>  $type,
            "hp" => $hp,
            "attack" => $attack,
            "defense" => $defense,
            "price" => $price,
            "description" => $description,
            "image" => $image,
        ];
    
        require_once 'PokemonStorage.php';
    
        $pokemonStorage = new PokemonStorage();
        $pokemonStorage->add($newPokemon);
    }
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IKémon | Create</title>
    <link rel="stylesheet" href="styles/main.css">
</head>

<body>
    <header>
        <div class="fejléc">
            <div class="left-side">
                <h1><a href="index.php">IKémon</a> > Create</h1>
            </div>
            <div class="mid">

            </div>
            <div class="right-side">
                <p><a class="link" href="userdata.php"><?= $user['username']; ?></a> <a class="link" href="index.php?action=logout">Log out</a></p>
            </div>
        </div>
    </header>
    <div id="content">
        <div class="center">
        <h2>Add Pokémon Card</h2>

        <?php
            if (isset($_GET['error']))
            {
                $errors = explode(',', $_GET['error']);
                
                foreach ($errors as $error)
                {
                    if ($error == "invalidname")
                    {
                        echo('<p style="color: red;">Name must not be empty, contain numbers or start with space.</p>');
                    }

                    if ($error == "invalidtype1")
                    {
                        echo('<p style="color: red;">Type must not be empty, contain numbers or start with space.</p>');
                    }

                    if ($error == "invalidtype2")
                    {
                        echo('<p style="color: red;">Type must be an already existing type.</p>');
                    }

                    if ($error == "invalidhp")
                    {
                        echo('<p style="color: red;">HP must be a positive whole number.</p>');
                    }

                    if ($error == "invalidattack")
                    {
                        echo('<p style="color: red;">Atatck must be a positive whole number.</p>');
                    }

                    if ($error == "invaliddefense")
                    {
                        echo('<p style="color: red;">Defense must be a positive whole number.</p>');
                    }

                    if ($error == "invalidprice")
                    {
                        echo('<p style="color: red;">Prince must be a positive whole number.</p>');
                    }

                    if ($error == "invaliddescription")
                    {
                        echo('<p style="color: red;">Description must not be empty or start with space.</p>');
                    }

                    if ($error == "invalidimage1")
                    {
                        echo('<p style="color: red;">Image must not be empty or start with space.</p>');
                    }

                    if ($error == "invalidimage2")
                    {
                        echo('<p style="color: red;">Image must be a valid link.</p>');
                    }
                }
            }
        ?>

        <form action="newcard.php" method="post" autocomplete="off">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>

            <label for="type">Type:</label>
            <input type="text" id="type" name="type" required><br>

            <label for="hp">HP:</label>
            <input type="number" id="hp" name="hp" required><br>

            <label for="attack">Attack:</label>
            <input type="number" id="attack" name="attack" required><br>

            <label for="defense">Defense:</label>
            <input type="number" id="defense" name="defense" required><br>

            <label for="price">Price:</label>
            <input type="number" id="price" name="price" required><br>

            <label for="description">Description:</label>
            <textarea id="description" name="description" required></textarea><br>

            <label for="image">Image URL:</label>
            <input type="text" id="image" name="image" required><br>

            <input type="submit" value="Add Pokémon">
        </form>
        </div>
    </div>
    <footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
</body>

</html>