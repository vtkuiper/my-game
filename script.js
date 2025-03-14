// Game data and variables
let characters = [];
let maxCharacters = 10;
let maxCharactersPerSection = 5;

// Character constructor
function Character(name) {
    this.name = name;
    this.hp = 10;
    this.maxHp = 10;
    this.damage = 2;
    this.food = 10;
    this.kills = 0;
    this.rank = "Bronze";
    this.image = `https://picsum.photos/50/50?random=${Math.floor(Math.random() * 1000)}`;  // Random image
}

// Generate random names for characters
function generateRandomName() {
    const names = ['Axel', 'Lena', 'Finn', 'Sophie', 'Kai', 'Emma'];
    return names[Math.floor(Math.random() * names.length)];
}

// Create a new character
function createCharacter() {
    if (characters.length >= maxCharacters) {
        alert("You can only have 10 characters.");
        return;
    }

    const name = generateRandomName();
    const character = new Character(name);
    characters.push(character);
    updateCharacterList();
}

// Update the character list in the "Available Characters" section
function updateCharacterList() {
    const charListContainer = document.getElementById('character-list');
    charListContainer.innerHTML = ''; // Clear the current list

    characters.forEach((character, index) => {
        const charDiv = document.createElement('div');
        charDiv.classList.add('character');
        charDiv.setAttribute('draggable', true);
        charDiv.setAttribute('id', 'character-' + index);
        charDiv.setAttribute('ondragstart', 'drag(event)');
        charDiv.innerHTML = `<img src="${character.image}" alt="${character.name}" />`;
        charListContainer.appendChild(charDiv);
    });
}

// Allow drag-and-drop
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

    // Ensure the section can hold more characters
    const section = document.getElementById(sectionId);
    if (section.children.length >= maxCharactersPerSection) {
        alert("This section is full!");
        return;
    }

    // Move the character to the section
    const charDiv = document.getElementById(characterId);
    section.appendChild(charDiv);
}

// Create characters and update the list when the game loads
createCharacter();
createCharacter();
createCharacter(); // You can call createCharacter() multiple times to create more characters
