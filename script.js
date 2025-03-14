let gold = 50;
let food = 20;

document.getElementById('hire-button').addEventListener('click', function() {
    if (gold >= 10) {
        const slots = document.querySelectorAll('.character-slot');
        const emptySlot = Array.from(slots).find(slot => slot.innerHTML === '');

        if (emptySlot) {
            const character = createCharacterProfile();
            emptySlot.appendChild(character);
            gold -= 10;
            document.getElementById('gold-counter').textContent = `Gold: ${gold}`;
        } else {
            alert('Alle vakjes zijn vol!');
        }
    } else {
        alert('Niet genoeg goud!');
    }
});

function createCharacterProfile() {
    const profile = document.createElement('div');
    profile.classList.add('character-profile');
    profile.draggable = true;
    profile.id = `character-${Date.now()}`;
    profile.addEventListener('dragstart', dragStart);
    profile.addEventListener('dragend', dragEnd);

    const img = document.createElement('img');
    img.src = 'profile.jpg'; // Voeg hier de juiste afbeelding toe
    profile.appendChild(img);

    const info = document.createElement('div');
    info.classList.add('character-info');

    const name = document.createElement('div');
    name.classList.add('name');
    name.textContent = getRandomName(profile.id);
    info.appendChild(name);

    const gender = document.createElement('div');
    gender.textContent = getRandomGender();
    info.appendChild(gender);

    const details = document.createElement('div');
    details.innerHTML = `
        Max HP: 10<br>
        Damage: 2<br>
        Rank: Bronze
    `;
    info.appendChild(details);

    profile.appendChild(info);

    return profile;
}

function getRandomName(id) {
    const maleNames = ['Aragorn', 'Legolas', 'Gimli', 'Frodo', 'Samwise'];
    const femaleNames = ['Arwen', 'Eowyn', 'Galadriel', 'Rosie', 'Luthien'];
    const gender = document.getElementById(id).querySelector('.character-info div:nth-child(2)').textContent;
    const names = gender === 'Male' ? maleNames : femaleNames;
    return names[Math.floor(Math.random() * names.length)];
}

function getRandomGender() {
    const genders = ['Male', 'Female'];
    return genders[Math.floor(Math.random() * genders.length)];
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('hide');
    }, 0);
}

function dragEnd(event) {
    event.target.classList.remove('hide');
}

const boxes = document.querySelectorAll('.sub-box');
boxes.forEach(box => {
    box.addEventListener('dragover', dragOver);
    box.addEventListener('drop', drop);
});

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    if (event.target.classList.contains('sub-box') && event.target.childElementCount < 2 && (event.target.id.startsWith('rest') || event.target.id.startsWith('adventure'))) {
        event.target.appendChild(draggableElement);
        if (event.target.id.startsWith('adventure')) {
            spawnEnemy(event.target.id);
        }
    }
}

function spawnEnemy(adventureId) {
    const encounterId = adventureId.replace('adventure', 'encounters');
    const encounterBox = document.getElementById(encounterId);
    console.log(`Spawning enemy in: ${encounterId}`);
    if (encounterBox.childElementCount === 0) {
        const enemy = createEnemyProfile();
        encounterBox.appendChild(enemy);
        console.log(`Enemy spawned in: ${encounterId}`);
        startBattle(adventureId, encounterId);
    }
}

function createEnemyProfile() {
    const profile = document.createElement('div');
    profile.classList.add('character-profile');
    profile.draggable = false;

    const img = document.createElement('img');
    img.src = 'goblin.jpg'; // Voeg hier de juiste afbeelding toe
    profile.appendChild(img);

    const info = document.createElement('div');
    info.classList.add('character-info');

    const name = document.createElement('div');
    name.classList.add('name');
    name.textContent = 'Goblin';
    info.appendChild(name);

    const gender = document.createElement('div');
    gender.textContent = 'Male';
    info.appendChild(gender);

    const details = document.createElement('div');
    details.innerHTML = `
        Max HP: 5<br>
        Damage: 2
    `;
    info.appendChild(details);

    profile.appendChild(info);

    return profile;
}

function startBattle(adventureId, encounterId) {
    const adventureBox = document.getElementById(adventureId);
    const encounterBox = document.getElementById(encounterId);

    const adventureCharacters = adventureBox.querySelectorAll('.character-profile');
    const encounterCharacters = encounterBox.querySelectorAll('.character-profile');

    const battleInterval = setInterval(() => {
        if (adventureCharacters.length > 0 && encounterCharacters.length > 0) {
            const adventureCharacter = adventureCharacters[0];
            const encounterCharacter = encounterCharacters[0];

            const adventureDetails = adventureCharacter.querySelector('.details');
            const encounterDetails = encounterCharacter.querySelector('.details');

            const adventureHp = parseInt(adventureDetails.innerHTML.match(/Max HP: (\d+)/)[1]);
            const encounterHp = parseInt(encounterDetails.innerHTML.match(/Max HP: (\d+)/)[1]);

            const adventureDamage = parseInt(adventureDetails.innerHTML.match(/Damage: (\d+)/)[1]);
            const encounterDamage = parseInt(encounterDetails.innerHTML.match(/Damage: (\d+)/)[1]);

            if (adventureHp > 0 && encounterHp > 0) {
                adventureDetails.innerHTML = adventureDetails.innerHTML.replace(/Max HP: \d+/, `Max HP: ${adventureHp - encounterDamage}`);
                encounterDetails.innerHTML = encounterDetails.innerHTML.replace(/Max HP: \d+/, `Max HP: ${encounterHp - adventureDamage}`);
            }

            if (encounterHp - adventureDamage <= 0) {
                encounterBox.removeChild(encounterCharacter);
                gold += 5;
                document.getElementById('gold-counter').textContent = `Gold: ${gold}`;
                clearInterval(battleInterval);
            }

            if (adventureHp - encounterDamage <= 0) {
                adventureBox.removeChild(adventureCharacter);
                clearInterval(battleInterval);
            }
        } else {
            clearInterval(battleInterval);
        }
    }, 1000);
}

function healCharacters() {
    const restBox = document.getElementById('rest-box');
    const characters = restBox.querySelectorAll('.character-profile');
    characters.forEach(character => {
        if (food > 0) {
            const details = character.querySelector('.details');
            const hp = parseInt(details.innerHTML.match(/Max HP: (\d+)/)[1]);
            if (hp < 10) {
                details.innerHTML = details.innerHTML.replace(/Max HP: \d+/, `Max HP: ${hp + 1}`);
                food -= 1;
                document.getElementById('food-counter').textContent = `Food: ${food}`;
            }
        }
    });
}

setInterval(healCharacters, 1000);
