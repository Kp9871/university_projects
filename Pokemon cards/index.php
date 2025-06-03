<?php
    require_once 'PokemonStorage.php';

    $pokemons = new PokemonStorage();

    session_start();

    $logged_in;
    $error = "";

    if (isset($_SESSION['user_id']))
    {
        $userId = $_SESSION['user_id'];
        $logged_in = true;

        require_once 'UserStorage.php';

        $userStorage = new UserStorage();

        $user = $userStorage->findById($userId);

        if (isset($_GET['action']) && $_GET['action'] == 'logout')
        {
            session_destroy();

            header('Location: index.php');
            exit();
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['buy_card']))
        {
            $cardId = $_POST['buy_card'];
            $admin = $userStorage->findById("admin");
            $adminInventory = explode(" ", $admin['inventory']);

            if (in_array($cardId, $adminInventory) && $user != $admin)
            {
                $cardPrice = $pokemons->findById($cardId)['price'];
    
                if ($user['money'] >= $cardPrice)
                {
                    if ($user['cards'] < 5)
                    {
                        $user['money'] -= $cardPrice;
                        $admin['money'] += $cardPrice;
    
                        $user['inventory'] .= $cardId . " ";
        
                        $adminInventory = array_diff($adminInventory, [$cardId]);
                        $admin['inventory'] = implode(" ", $adminInventory);

                        $user['cards']++;
                        $admin['cards']--;
        
                        $userStorage->update($userId, $user);
                        $userStorage->update("admin", $admin);
                    }
                    else
                    {
                        $error = "Can't buy any more cards.";
                    }
                }
                else
                {
                    $error = "Insufficient funds!";
                }
            }
            else
            {
                $error = "Card not available for purchase!";
            }
        }
    }
    else
    {
        $logged_in = false;
    }

    $itemsPerPage = 9;
    $currentPage = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $start = ($currentPage - 1) * $itemsPerPage;
    $end = $start + $itemsPerPage;
    $filteredPokemons = array_slice($pokemons->findAll(), $start, $itemsPerPage);    
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IKémon | Home</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/cards.css">
</head>

<body>
    <header>
        <div class="fejléc">
            <div class="left-side">
                <h1><a href="index.php">IKémon</a> > Home</h1>
            </div>
            <div class="mid">
                <p>Welcome to IKémon!</p>
                <p><?= $error; ?></p>
            </div>
            <div class="right-side">
                <?php if (!$logged_in): ?>
                    <p><a class="link" href="register.php">Register</a> <a class="link" href="login.php">Log in</a></p>
                <?php else: ?>
                    <p><a class="link" href="userdata.php"><?= $user['username']; ?></a> <a class="link" href="?action=logout">Log out</a></p>
                    <p>Money: <?= $user['money']; ?>💰</p>
                <?php endif; ?>
            </div>
        </div>
    </header>
    <div id="content">
        <div id="filter-form">
            <form action="index.php" method="get">
                <label for="filter-type">Filter by Type:</label>
                <select id="filter-type" name="filter_type">
                    <option value="" selected>All Types</option>
                    <option value="normal">Normal</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="electric">Electric</option>                    
                    <option value="grass">Grass</option>
                    <option value="ice">Ice</option>
                    <option value="fighting">Fighting</option>
                    <option value="poison">Poison</option>
                    <option value="ground">Ground</option>
                    <option value="flying">Flying</option>
                    <option value="psychic">Psychic</option>
                    <option value="bug">Bug</option>
                    <option value="rock">Rock</option>
                    <option value="ghost">Ghost</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="steel">Steel</option>
                    <option value="fairy">Fairy</option>
                    <option value="stellar">Stellar</option>
                </select>
                <input type="submit" value="Filter">
            </form>
        </div>
        <div id="card-list">
            <?php foreach ($filteredPokemons as $key => $pokemon): ?>
                <?php if (!isset($_GET['filter_type']) || $_GET['filter_type'] == '' || $_GET['filter_type'] == $pokemon['type']): ?>
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
                            <form action="index.php" method="post">
                                <input type="hidden" name="buy_card" value="<?= $key; ?>">
                                <span class="buy-button" onclick="this.closest('form').submit()">
                                    <div class="buy">
                                        <span class="card-price"><span class="icon">💰</span> <?= $pokemon['price']; ?></span>
                                    </div>
                                </span>
                            </form>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
        <div id="pagination">
            <?php if ($currentPage > 1): ?>
                <a href="#" class="pagination-link" onclick="submitPageForm(<?= $currentPage - 1; ?>)">&lt;</a>
            <?php endif; ?>

            <?php for ($i = 1; $i <= ceil(count($pokemons->findAll()) / $itemsPerPage); $i++): ?>
                <a href="#" class="pagination-link <?= $i === $currentPage ? 'active' : ''; ?>" onclick="submitPageForm(<?= $i; ?>)"><?= $i; ?></a>
            <?php endfor; ?>

            <?php if ($currentPage < ceil(count($pokemons->findAll()) / $itemsPerPage)): ?>
                <a href="#" class="pagination-link" onclick="submitPageForm(<?= $currentPage + 1; ?>)">&gt;</a>
            <?php endif; ?>

            <form id="pageForm" action="index.php" method="get" style="display: none;">
                <input type="hidden" name="page" id="pageInput">
            </form>
        </div>
    </div>
    <footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
    <script src="script.js"></script>
</body>

</html>