// Game data en variabelen
let characters = [];
let maxCharacters = 10;
let maxCharactersPerSection = 5;
let gold = 0;
let food = 0;

// Karakter constructor
function Character(name) {
    this.name = name;
    this.hp = 10;
    this.maxHp = 10;
    this.damage = 2;
    this.kills = 0;
    this.rank = "Bronze";
    this.image = `https://picsum.photos/80/80?random=${Math.floor(Math.random() * 1000)}`;  // Random image
    this.foodGatheringProgress = 0;  // Laadbalk voor voedselverzameling
    this.isResting = false; // Controleert of het karakter rust
    this.foodBar = null;  // Houdt de foodbalk bij
}

// Genereer een random naam voor karakters
function generateRandomName() {
    const names = ['Axel', 'Lena', 'Finn', 'Sophie', 'Kai', 'Emma'];
    return names[Math.floor(Math.random() * names.length)];
}

// Maak een nieuw karakter
function createCharacter() {
    if (characters.length >= maxCharacters) {
        alert("Je kunt maximaal 10 karakters hebben.");
        return;
    }

    const name = generateRandomName();
    const character = new Character(name);
    characters.push(character);
    updateCharacterList();
}

// Werk de lijst van beschikbare karakters bij
function updateCharacterList() {
    const charListContainer = document.getElementById('character-list');
    charListContainer.innerHTML = ''; // Verwijder de huidige lijst

    characters.forEach((character, index) => {
        const charDiv = document.createElement('div');
        charDiv.classList.add('character');
        charDiv.setAttribute('draggable', true);
        charDiv.setAttribute('id', 'character-' + index);
        charDiv.setAttribute('ondragstart', 'drag(event)');

        charDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <div class="character-info">
                <p><strong>${character.name}</strong></p>
                <p>HP: ${character.hp}/${character.maxHp}</p>
                <p>Damage: ${character.damage}</p>
                <p>Rank: ${character.rank}</p>
            </div>
        `;
        charListContainer.appendChild(charDiv);
    });
}

// Update de food en gold tellers
function updateResourceCounters() {
    document.getElementById('gold-count').innerText = gold;
    document.getElementById('food-count').innerText = food;
}

// Laat het karakter slepen
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const characterId = event.dataTransfer.getData("text");
    const character = characters[parseInt(characterId.split('-')[1])];
    const sectionId = event.target.id;

    // Zorg ervoor dat de sectie niet vol is
    const section = document.getElementById(sectionId);
    if (section.children.length >= maxCharactersPerSection) {
        alert("Deze sectie is vol!");
        return;
    }

    // Verplaats het karakter naar de sectie
    const charDiv = document.getElementById(characterId);
    section.appendChild(charDiv);

    // Als het karakter in de food gathering sectie staat, start de voedselbalk
    if (sectionId === "food") {
        startFoodGathering(character);
    }

    // Als het karakter in de resting sectie staat, herstel HP met food
    if (sectionId === "resting") {
        startResting(character);
    }

    // Als het karakter niet meer in food gathering staat, stop de foodbar
    if (sectionId !== "food" && character.foodBar) {
        clearInterval(character.foodBar.interval);  // Stop de voedselverzameling
        character.foodBar = null;  // Verwijder de foodbalk
    }
}

// Start het voedsel verzamelen voor een karakter
function startFoodGathering(character) {
    // Maak een nieuwe foodbalk als die er nog niet is
    if (!character.foodBar) {
        const foodBar = document.createElement('div');
        foodBar.classList.add('food-bar');
        const foodFill = document.createElement('div');
        foodFill.classList.add('food-bar-fill');
        foodBar.appendChild(foodFill);

        // Voeg de voedselbalk toe aan het karakter in de food sectie
        const section = document.getElementById('food');
        section.appendChild(foodBar);

        character.foodBar = { fill: foodFill, progress: 0 };

        // Start de voedselverzameling
        const interval = setInterval(() => {
            if (character.foodBar.progress < 100) {
                character.foodBar.progress += 1;
                character.foodBar.fill.style.width = character.foodBar.progress + '%';
            } else {
                clearInterval(interval);
                food += 1;  // Voeg 1 food toe
                updateResourceCounters();
                startFoodGathering(character);  // Begin opnieuw met verzamelen
            }
        }, 100);  // Elke 100ms voegt de balk 1% toe
    }
}

// Start het rusten van een karakter en herstel HP met food
function startResting(character) {
    if (food > 0 && character.hp < character.maxHp) {
        character.hp += 1;  // Herstel 1 HP
        food -= 1;  // Verbruik 1 food
        updateResourceCounters();
    }
}

// Maak karakters aan en werk de lijst bij
createCharacter();
createCharacter();
createCharacter(); // Maak meer karakters aan naar wens
