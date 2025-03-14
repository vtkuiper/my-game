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
    name.textContent = getRandomName();
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

function getRandomName() {
    const names = ['Aragorn', 'Legolas', 'Gimli', 'Frodo', 'Samwise'];
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
    }
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
