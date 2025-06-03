const missions = 
{
  "basic": [
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
    }
  ],
  "extra": [
    {
      "title": "Fasor",
      "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
    },
    {
      "title": "Gazdag város",
      "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
    },
    {
      "title": "Öntözőcsatorna",
      "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
    },
    {
      "title": "Mágusok völgye",
      "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
    },
    {
      "title": "Üres telek",
      "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
    },
    {
      "title": "Sorház",
      "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
    },
    {
      "title": "Páratlan silók",
      "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
    },
    {
      "title": "Gazdag vidék",
      "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
    }
  ],
}

const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]

/////////////////////////////////GAME/////////////////////////////////

let scoreSum = 0;
let scoreSpring = 0;
let scoreSummer = 0;
let scoreAutumn = 0;
let scoreWinter = 0;
let scoreA = 0;
let scoreB = 0;
let scoreC = 0;
let scoreD = 0;
let timeLeft = 7;
let season = 1;


const spring = document.getElementById('spring');
spring.innerHTML = 'Tavasz:\n' + scoreSpring + ' pont';
const summer = document.getElementById('summer');
summer.innerHTML = 'Nyár:\n' + scoreSummer + ' pont';
const autumn = document.getElementById('autumn');
autumn.innerHTML = 'Ősz:\n' + scoreAutumn + ' pont';
const winter = document.getElementById('winter');
winter.innerHTML = 'Tél:\n' + scoreWinter + ' pont';
const scoreCounter = document.getElementById('scoreCounter');
scoreCounter.innerHTML = 'Összesen: ' + scoreSum + ' pont';
const currentSeason = document.getElementById('currentSeason');
currentSeason.innerHTML = "Jelenlegi évszak: Tavasz (AB)";
const leftOfSeason = document.getElementById('leftOfSeason');
leftOfSeason.innerHTML = 'Évszakból hátralévő idő: ' + timeLeft + '/7';
const missionA = document.getElementById('missionA');
const missionB = document.getElementById('missionB');
const missionC = document.getElementById('missionC');
const missionD = document.getElementById('missionD');



function initialisePlayfield()
{
    const table = document.getElementById('game');

    for (let i = 0; i < 11; i++)
    {
        const row = table.rows[i];
    
        for (let j = 0; j < 11; j++)
        {
            const cell = row.cells[j];
            
            if (i == 1 && j == 1 || i == 3 && j == 8 || i == 5 && j == 3 || i == 8 && j == 9 || i == 9 && j == 5)
            {
                cell.style.backgroundImage = `url(src/tiles/mountain_tile.png)`;
            }
        }
    }
}

const initaile = initialisePlayfield();

function getRandomElement(elementsArray)
{
    const randomIndex = Math.floor(Math.random() * elementsArray.length);

    return elementsArray[randomIndex];
}

let randomElement = getRandomElement(elements);
let randomMatrix = randomElement.shape;


const nextItem = document.getElementById('nextItem');
nextItem.innerHTML = 'Lehelyezendő elem: ' + randomElement.time + ' idő';

function setShapeTable(matrix)
{
    const table = document.getElementById('shapeTable');

    for (let i = 0; i < matrix.length; i++)
    {
        const row = table.rows[i];
    
        for (let j = 0; j < matrix[i].length; j++)
        {
            const cell = row.cells[j];
    
            cell.style.backgroundImage = "";
        }
    }

    for (let i = 0; i < matrix.length; i++)
    {
        const row = table.rows[i];
    
        for (let j = 0; j < matrix[i].length; j++)
        {
            const cell = row.cells[j];
    
            if (matrix[i][j] == 1)
            {
                if (randomElement.type == 'town')
                {
                    cell.style.backgroundImage = `url(src/tiles/village_tile.png)`;
                }
                else if (randomElement.type == 'farm')
                {
                    cell.style.backgroundImage = `url(src/tiles/plains_tile.png)`;
                }
                else
                {
                    cell.style.backgroundImage = `url(src/tiles/${randomElement.type}_tile.png)`;
                }
            }
        }
    }
}

let displayShape = setShapeTable(randomMatrix);


function rotateMatrix(matrix)
{
    const rotatedMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    
        for (let i = 0; i < matrix.length; i++)
        {
            for (let j = 0; j < matrix[i].length; j++)
            {
                rotatedMatrix[j][2 - i] = matrix[i][j];
            }
        }


    setShapeTable(rotatedMatrix);
    randomMatrix = rotatedMatrix;
}

const rotateButton = document.getElementById('rotateButton');
rotateButton.addEventListener('click', () => {
    rotateMatrix(randomMatrix);
});


function mirrorMatrix(matrix)
{
    const mirroredMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    for (let i = 0; i < matrix.length; i++)
    {
        for (let j = 0; j < matrix[i].length; j++)
        {
            mirroredMatrix[i][matrix[i].length - j - 1] = matrix[i][j];
        }
    }

    setShapeTable(mirroredMatrix);
    randomMatrix = mirroredMatrix;
}

const mirrorButton = document.getElementById('mirrorButton');
mirrorButton.addEventListener('click', () => {
    mirrorMatrix(randomMatrix);
});

function changeTime()
{
    timeLeft -= randomElement.time;

    if (timeLeft < 1)
    {
        timeLeft += 7;
        season++;

        switch (season)
        {
            case 1:
                currentSeason.innerHTML = "Jelenlegi évszak: Tavasz (AB)";
                labelA.innerHTML = '🟢A';
                labelB.innerHTML = '🟢B';
                break;
            case 2:
                currentSeason.innerHTML = "Jelenlegi évszak: Nyár (BC)";
                labelA.innerHTML = 'A';
                labelC.innerHTML = '🟢C';
                break;
            case 3:
                currentSeason.innerHTML = "Jelenlegi évszak: Ősz (CD)";
                labelB.innerHTML = 'B';
                labelD.innerHTML = '🟢D';
                break;
            case 4:
                currentSeason.innerHTML = "Jelenlegi évszak: Tél (DA)";
                labelC.innerHTML = 'C';
                labelA.innerHTML = '🟢A';
                break;
        }
    }

    leftOfSeason.innerHTML = 'Évszakból hátralévő idő: ' + timeLeft + '/7';
}

function randomMissions()
{
    const allMissions = [];

    for (let i = 0; i < missions.basic.length; i++)
    {
        allMissions[i] = missions.basic[i];
    }
    for (let i = 0; i < missions.extra.length; i++)
    {
        allMissions[missions.basic.length + i] = missions.extra[i];
    }

    const randomMissions = [];
    const missionIndexes = [];

    while (missionIndexes.length < 4)
    {
        const randomIndex = Math.floor(Math.random() * allMissions.length);

        if (!missionIndexes.includes(randomIndex))
        {
            missionIndexes.push(randomIndex);
            randomMissions.push(allMissions[randomIndex]);
        }
    }

    let counter = 0;

    for (let i = 0; i < 2; i++)
    {
        for (let j = 0; j < 2; j++)
        {
            const placeMission = document.querySelector(`#missiontr${i + 1} :nth-child(${j + 1})`);
            let img = '';
            switch (randomMissions[counter].title)
            {
                case "Az erdő széle":
                    img = "url('src/missions_hun/Group 69.png')";
                    break;
                case "Álmos-völgy":
                    img = "url('src/missions_hun/Group 74.png')";
                    break;
                case "Krumpliöntözés":
                    img = "url('src/missions_hun/Group 70.png')";
                    break;
                case "Határvidék":
                    img = "url('src/missions_hun/Group 78.png')";
                    break;
                case "Fasor":
                    img = "url('src/missions_hun/Group 68.png')";
                    break;
                case "Gazdag város":
                    img = "url('src/missions_hun/Group 71.png')";
                    break;
                case "Öntözőcsatorna":
                    img = "url('src/missions_hun/Group 75.png')";
                    break;
                case "Mágusok völgye":
                    img = "url('src/missions_hun/Group 76.png')";
                    break;
                case "Üres telek":
                    img = "url('src/missions_hun/Group 77.png')";
                    break;
                case "Sorház":
                    img = "url('src/missions_hun/Group 72.png')";
                    break;
                case "Páratlan silók":
                    img = "url('src/missions_hun/Group 73.png')";
                    break;
                case "Gazdag vidék":
                    img = "url('src/missions_hun/Group 79.png')";
                    break;
            }
            counter++;
            placeMission.style.backgroundImage = img;
        }
    }

    return randomMissions;
}

const randomMission = randomMissions(missions);

const labelA = document.createElement('p');
labelA.id = 'labelA';
labelA.innerHTML = '🟢A';
missionA.appendChild(labelA);
const labelB = document.createElement('p');
labelB.id = 'labelB';
labelB.innerHTML = '🟢B';
missionB.appendChild(labelB);
const labelC = document.createElement('p');
labelC.id = 'labelC';
labelC.innerHTML = 'C';
missionC.appendChild(labelC);
const labelD = document.createElement('p');
labelD.id = 'labelD';
labelD.innerHTML = 'D';
missionD.appendChild(labelD);

function calculatePoints()
{
    for (let i = 0; i < randomMission.length; i++)
    {
        switch (randomMission[i].title)
        {
            case "Az erdő széle":
                const filledMatrix3 = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ];
                let scoreCounter2 = 0;

                for (let i = 0; i < 11; i++)
                {
                    for (let j = 0; j < 11; j++)
                    {
                        const td = document.querySelector(`#gametr${i + 1} :nth-child(${j + 1})`);
                        const styles = window.getComputedStyle(td);
                        const bg = styles.backgroundImage;
                        const url = bg.slice(116, -2);

                        if (url == "src/tiles/forest_tile.png")
                        {
                            filledMatrix3[i][j] = 1;
                        }
                    }
                }

                for (let i = 0; i < 11; i++)
                {
                    if (filledMatrix3[0][i] == 1)
                    {
                        scoreCounter2++;
                    }
                    if (filledMatrix3[i][0] == 1)
                    {
                        scoreCounter2++;
                    }
                    if (filledMatrix3[10][i] == 1)
                    {
                        scoreCounter2++;
                    }
                    if (filledMatrix3[i][10] == 1)
                    {
                        scoreCounter2++;
                    }
                }

                if (filledMatrix3[0][0] == 1)
                {
                    scoreCounter2--;
                }
                if (filledMatrix3[0][10] == 1)
                {
                    scoreCounter2--;
                }
                if (filledMatrix3[10][0] == 1)
                {
                    scoreCounter2--;
                }
                if (filledMatrix3[10][10] == 1)
                {
                    scoreCounter2--;
                }

                scoreCounter.innerHTML = 'Összesen: '+ scoreCounter2 + 'pont';

                break;
            case "Álmos-völgy":
                const filledMatrix4 = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ];
                let scoreCounter4 = 0;

                for (let i = 0; i < 11; i++)
                {
                    for (let j = 0; j < 11; j++)
                    {
                        const td = document.querySelector(`#gametr${i + 1} :nth-child(${j + 1})`);
                        const styles = window.getComputedStyle(td);
                        const bg = styles.backgroundImage;
                        const url = bg.slice(116, -2);

                        if (url == "src/tiles/forest_tile.png")
                        {
                            filledMatrix4[i][j] = 1;
                        }
                    }
                }
                for (let i = 0; i < 11; i++)
                {
                    let rowCounter = 0;
                    for (let j = 0; j < 11; j++)
                    {
                        if (filledMatrix4[i][j] == 1)
                        {
                            rowCounter++;
                        }
                    }
                    if (rowCounter == 3)
                    {
                        scoreCounter4 += 4;
                    }
                }

                scoreCounter.innerHTML = 'Összesen: '+ scoreCounter4 + 'pont';

                break;
            case "Krumpliöntözés":

                break;
            case "Határvidék":
                const filledMatrix = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ];
                let filledTile = 0;

                for (let i = 0; i < 11; i++)
                {
                    for (let j = 0; j < 11; j++)
                    {
                        const td = document.querySelector(`#gametr${i + 1} :nth-child(${j + 1})`);
                        const styles = window.getComputedStyle(td);
                        const bg = styles.backgroundImage;
                        const url = bg.slice(116, -2);
                        if (url != "src/tiles/base_tile.png")
                        {
                            filledMatrix[i][j] = 1;
                        }
                        if (url != "src/tiles/base_tile.png")
                        {
                            filledMatrix[j][i] = 1;
                        }
                    }
                }

                for (let i = 0; i < filledMatrix.length; i++)
                {
                    for (let j = 0; j < filledMatrix[i].length; j++)
                    {
                        if (filledMatrix[i][j] == 1)
                        {
                            filledTile++;
                            if (filledTile == 11)
                            {
                                scoreSum += 6;
                                filledTile = 0;
                                scoreCounter.innerHTML = 'Összesen: '+ scoreSum + 'pont';
                            }
                        }
                        else
                        {
                            filledTile = 0;
                        }
                    }
                }

                break;
            case "Fasor":

                break;
            case "Gazdag város":

                break;
            case "Öntözőcsatorna":

                break;
            case "Mágusok völgye":

                break;
            case "Üres telek":

                break;
            case "Sorház":

                break;
            case "Páratlan silók":
                const filledMatrix2 = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ];
                let filledTile2 = 0;

                for (let i = 0; i < 11; i++)
                {
                    for (let j = 0; j < 11; j+=2)
                    {
                        const td = document.querySelector(`#gametr${i + 1} :nth-child(${j + 1})`);
                        const styles = window.getComputedStyle(td);
                        const bg = styles.backgroundImage;
                        const url = bg.slice(116, -2);
                        if (url != "src/tiles/base_tile.png")
                        {
                            filledMatrix2[j][i] = 1;
                        }
                    }
                }

                for (let i = 0; i < filledMatrix2.length; i++)
                {
                    for (let j = 0; j < filledMatrix2[i].length; j++)
                    {
                        if (filledMatrix2[i][j] == 1)
                        {
                            filledTile2++;
                            if (filledTile2 == 11)
                            {
                                scoreSum += 10;
                                filledTile2 = 0;
                                scoreCounter.innerHTML = 'Összesen: '+ scoreSum + 'pont';
                            }
                        }
                        else
                        {
                            filledTile2 = 0;
                        }
                    }
                }
                break;
            case "Gazdag vidék":

                break;
        }
    }
}


const placeTile = document.getElementById('game');
let gameEnded = false;
placeTile.addEventListener('click', event => {
    let locationx = 0;
    let locationy = 0;
    let error = false;

    for (let i = 0; i < 12; i++)
    {
        for (let j = 0; j < 12; j++)
        {
            if (document.querySelector(`#gametr${i} :nth-child(${j})`) == event.target)
            {
                locationx = i;
                locationy = j;
            }
        }
    }



    for (let i = locationx - 1; i < locationx + 2; i++)
    {
        for (let j = locationy - 1; j < locationy + 2; j++)
        {
            let localx = i - locationx + 1;
            let localy = j - locationy + 1;

            if (randomMatrix[localx][localy] == 1 && ((i > 11 || j > 11 || i < 1 || j < 1) || (i == 2 && j == 2 || i == 4 && j == 9 || i == 6 && j == 4 || i == 9 && j == 10 || i == 10 && j == 6)))
            {
                error = true;
            }
        }
    }
    console.log(error);

    if (!error && season < 5)
    {
        changeTime();

        for (let i = locationx - 1; i < locationx + 2; i++)
        {
            for (let j = locationy - 1; j < locationy + 2; j++)
            {
                let localx = i - locationx + 1;
                let localy = j - locationy + 1;
                if (randomMatrix[localx][localy] == 1)
                {
                    switch (randomElement.type)
                    {
                        case "farm":
                            document.querySelector(`#gametr${i} :nth-child(${j})`).style.backgroundImage = `url(src/tiles/plains_tile.png)`;
                            break;
                        case "town":
                            document.querySelector(`#gametr${i} :nth-child(${j})`).style.backgroundImage = `url(src/tiles/village_tile.png)`;
                            break;
                        case "water":
                            document.querySelector(`#gametr${i} :nth-child(${j})`).style.backgroundImage = `url(src/tiles/water_tile.png)`;
                            break;
                        case "forest":
                            document.querySelector(`#gametr${i} :nth-child(${j})`).style.backgroundImage = `url(src/tiles/forest_tile.png)`;
                            break;
                    }
                }
            }
        }

        randomElement = getRandomElement(elements);
        randomMatrix = randomElement.shape;
        nextItem.innerHTML = 'Lehelyezendő elem: ' + randomElement.time + ' idő';
        displayShape = setShapeTable(randomMatrix);
    }
    if (season > 4 && !gameEnded)
    {
        gameEnded = true;
        calculatePoints();
    }
});