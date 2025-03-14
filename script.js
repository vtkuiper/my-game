// Game data en variabelen
let characters = [];
let maxCharacters = 10;
let maxCharactersPerSection = 5;

// Karakter constructor
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
}

// Maak karakters aan en werk de lijst bij
createCharacter();
createCharacter();
createCharacter(); // Maak meer karakters aan naar wens
