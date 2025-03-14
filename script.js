// Karakter constructor
function Character(name) {
    this.name = name;
    this.hp = 10;
    this.maxHp = 10;
    this.damage = 2;
    this.kills = 0;
    this.rank = "Bronze";
    this.image = `https://picsum.photos/60/60?random=${Math.floor(Math.random() * 1000)}`;  // Random image
    this.foodGatheringProgress = 0;  // Laadbalk voor voedselverzameling
    this.isResting = false; // Controleert of het karakter rust
    this.foodBar = null;  // Houdt de foodbalk bij
    this.section = null; // Houdt bij waar het karakter zich bevindt (resting, food, fighting)
}

// Enemy constructor
function Enemy(name) {
    this.name = name;
    this.hp = 5;
    this.damage = 2;
    this.image = `https://picsum.photos/60/60?random=${Math.floor(Math.random() * 1000)}`;  // Random image
}

// Genereer een random naam voor karakters
function generateRandomName() {
    const names = ['Axel', 'Lena', 'Finn', 'Sophie', 'Kai', 'Emma'];
    return names[Math.floor(Math.random() * names.length)];
}

// Startgeld
let gold = 50;

// Functie om goud bij te werken
function updateGold(amount) {
    gold += amount;
    document.getElementById('gold').textContent = `Gold: ${gold}`;
    checkGoldStatus();
}

// Functie om de status van de Hire Volunteer knop bij te werken
function checkGoldStatus() {
    const hireButton = document.getElementById('hireVolunteerBtn');
    hireButton.disabled = gold < 10; // Zet de knop uit als er minder dan 10 goud is
}

// Maak een nieuw karakter
function createCharacter() {
    const name = generateRandomName();
    const character = new Character(name);
    return character;
}

// Voeg een karakter toe aan een bepaalde sectie
function addCharacterToSection(character, sectionId) {
    const section = document.getElementById(sectionId);
    const availableSpots = Array.from(section.getElementsByClassName('spot')).filter(spot => !spot.hasChildNodes());

    if (availableSpots.length > 0) {
        const randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');
        characterDiv.innerHTML = `<img src="${character.image}" alt="${character.name}" />`;

        randomSpot.appendChild(characterDiv);
        character.section = sectionId;  // Zet de sectie van het karakter
    }
}

// Functie voor de Hire Volunteer knop
document.getElementById('hireVolunteerBtn').addEventListener('click', function () {
    if (gold >= 10) {
        const newCharacter = createCharacter();
        addCharacterToSection(newCharacter, 'resting');
        updateGold(-10); // Verlaag het goud met 10
    }
});

// Initialiseren van de goldstatus
checkGoldStatus();
