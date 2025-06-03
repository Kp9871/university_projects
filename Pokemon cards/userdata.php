<?php
    session_start();

    require_once 'PokemonStorage.php';

    $pokemons = new PokemonStorage();

    $logged_in;

    if (isset($_SESSION['user_id']))
    {
        $userId = $_SESSION['user_id'];
        $logged_in = true;

        require_once 'UserStorage.php';

        $userStorage = new UserStorage();

        $user = $userStorage->findById($userId);

        $inventory = explode(" ", $user['inventory']);

        if (isset($_GET['action']) && $_GET['action'] == 'logout')
        {
            session_destroy();
            
            header('Location: index.php');
            exit();
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sell_card']))
        {
            $cardId = $_POST['sell_card'];
            $admin = $userStorage->findById("admin");
            $adminInventory = explode(" ", $admin['inventory']);

            if (in_array($cardId, $inventory) && $user != $admin)
            {
                $cardPrice = $pokemons->findById($cardId)['price'];
    
                $user['money'] += floor($cardPrice * 0.9);
                $admin['money'] -= floor($cardPrice * 0.9);

                $admin['inventory'] .= $cardId . " ";

                $inventory = array_diff($inventory, [$cardId]);
                $user['inventory'] = implode(" ", $inventory);

                $user['cards']--;
                $admin['cards']++;

                $userStorage->update($userId, $user);
                $userStorage->update("admin", $admin);
            }
            else
            {
                $error = "Admin can't sell cards!";
            }
        }
    }
    else
    {
        $logged_in = false;
        header('Location: index.php');
        exit();
    }
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IKémon | Profile</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/cards.css">
</head>

<body>
    <header>
        <div class="fejléc">
            <div class="left-side">
                <h1><a href="index.php">IKémon</a> > Profile</h1>
            </div>
            <div class="mid">

            </div>
            <div class="right-side">
                <?php if ($user['id'] == "admin"): ?>
                    <p><a class="link" href="newcard.php">Add card</a> <a class="link" href="userdata.php"><?= $user['username']; ?></a> <a class="link" href="index.php?action=logout">Log out</a></p>
                <?php else: ?>
                    <p><a class="link" href="userdata.php"><?= $user['username']; ?></a> <a class="link" href="index.php?action=logout">Log out</a></p>
                <?php endif; ?>
            </div>
        </div>
    </header>
    <div id="content">
        <div class="center">
            <p>Username: <?= $user['username']; ?> E-mail: <?= $user['email']; ?> Money: <?= $user['money']; ?>💰</p>
        </div>
        <div id="card-list">
            <?php foreach ($pokemons->findAll() as $key => $pokemon): ?>
                <?php if (in_array($key, $inventory)): ?>
                    <div class="pokemon-card">
                        <div class="image clr-<?= $pokemon['type']; ?>">
                            <img src="<?= $pokemon['image']; ?>" alt="">
                        </div>
                        <div class="details">
                            <h2><a href="details.php?id=<?= $key; ?>"><?= $pokemon['name']; ?></a></h2>
                            <span class="card-type"><span class="icon">🏷</span> <?= $pokemon['type']; ?></span>
                            <span class="attributes">
                                <span class="card-hp"><span class="icon">❤</span> <?= $pokemon['hp']; ?></span>
                                <span class="card-attack"><span class="icon">⚔</span> <?= $pokemon['attack']; ?></span>
                                <span class="card-defense"><span class="icon">🛡</span> <?= $pokemon['defense']; ?></span>
                            </span>
                        </div>
                        <?php if ($logged_in): ?>
                            <form action="userdata.php" method="post">
                                <input type="hidden" name="sell_card" value="<?= $key; ?>">
                                <span class="sell-button" onclick="this.closest('form').submit()">
                                    <div class="buy">
                                        <span class="card-price"><span class="icon">💰</span> <?= floor($pokemon['price'] * 0.9); ?></span>
                                    </div>
                                </span>
                            </form>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
    <footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
</body>

</html>