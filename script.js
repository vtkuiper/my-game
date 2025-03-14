document.getElementById('hire-button').addEventListener('click', function() {
    const slots = document.querySelectorAll('.character-slot');
    const emptySlot = Array.from(slots).find(slot => slot.innerHTML === '');

    if (emptySlot) {
        const character = createCharacterProfile();
        emptySlot.appendChild(character);
    } else {
        alert('Alle vakjes zijn vol!');
    }
});

function createCharacterProfile() {
    const profile = document.createElement('div');
    profile.classList.add('character-profile');

    const img = document.createElement('img');
    img.src = 'profile.jpg'; // Voeg hier de juiste afbeelding toe
    profile.appendChild(img);

    const info = document.createElement('div');
    info.classList.add('character-info');

    const name = document.createElement('div');
    name.classList.add('name');
    name.textContent = getRandomName();
    info.appendChild(name);

    const details = document.createElement('div');
    details.classList.add('details');
    details.innerHTML = `
        Max HP: ${getRandomNumber(50, 100)}<br>
        Damage: ${getRandomNumber(10, 20)}<br>
        Rank: ${getRandomRank()}<br>
        ${getRandomGender()}
    `;
    info.appendChild(details);

    profile.appendChild(info);

    return profile;
}

function getRandomName() {
    const names = ['Aragorn', 'Legolas', 'Gimli', 'Frodo', 'Samwise'];
    return names[Math.floor(Math.random() * names.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomRank() {
    const ranks = ['Novice', 'Warrior', 'Knight', 'Lord'];
    return ranks[Math.floor(Math.random() * ranks.length)];
}

function getRandomGender() {
    const genders = ['Male', 'Female'];
    return genders[Math.floor(Math.random() * genders.length)];
}
