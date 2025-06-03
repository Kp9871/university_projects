<?php
    require_once 'PokemonStorage.php';

    $pokemons = new PokemonStorage();

    $id = $_GET['id'];
    $name = "";

    foreach ($pokemons->findAll() as $key => $pokemon)
    {
        if ($id == $key)
        {
            $name = $pokemon['name'];
        }
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IKémon | <?= $name ?></title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/details.css">
</head>

<body>
    <header>
        <h1><a href="index.php">IKémon</a> > <?= $name ?></h1>
    </header>
    <div id="content">
        <?php foreach ($pokemons->findAll() as $key => $pokemon): ?>
            <?php if ($id == $key): ?>
                <div id="details">
                    <div class="image clr-<?= $pokemon['type']; ?>">
                        <img src="<?= $pokemon['image']; ?>" alt="">
                    </div>
                    <div class="info">
                        <div class="description">
                            <?= $pokemon['description']; ?>
                        </div>
                        <span class="card-type"><span class="icon">🏷</span> Type: <?= $pokemon['type']; ?></span>
                        <div class="attributes">
                            <div class="card-hp"><span class="icon">❤</span> Health: <?= $pokemon['hp']; ?></div>
                            <div class="card-attack"><span class="icon">⚔</span> Attack: <?= $pokemon['attack']; ?></div>
                            <div class="card-defense"><span class="icon">🛡</span> Defense: <?= $pokemon['defense']; ?></div>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        <?php endforeach; ?>
    </div>
    <footer>
        <p>IKémon | ELTE IK Webprogramozás</p>
    </footer>
</body>
</html>