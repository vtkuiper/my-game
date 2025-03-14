let gold = 50;

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
    details.classList.add('details');
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
