class Character {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.hp = 10;
        this.maxHp = 10;
        this.damage = 2;
        this.rank = 'Bronze';
        this.kills = 0;
        this.food = 0;
        this.gold = 0;
    }

    heal() {
        if (this.hp < this.maxHp && this.food > 0) {
            this.hp += 1;
            this.food -= 1;
        }
    }

    gatherFood() {
        setInterval(() => {
            this.food += 1;
        }, 3000);
    }

    fight(enemy) {
        enemy.hp -= this.damage;
        if (enemy.hp <= 0) {
            this.kills += 1;
            this.gold += 1;
            this.updateRank();
        }
    }

    updateRank() {
        if (this.kills >= 30) {
            this.rank = 'Platinum';
            this.maxHp = 25;
            this.damage = 5;
        } else if (this.kills >= 20) {
            this.rank = 'Gold';
            this.maxHp = 20;
            this.damage = 4;
        } else if (this.kills >= 10) {
            this.rank = 'Silver';
            this.maxHp = 15;
            this.damage = 3;
        }
    }
}

class Enemy {
    constructor() {
        this.hp = 5;
        this.damage = 2;
    }
}

// Example of creating a character
const characters = [];
const names = ["Alice", "Bob", "Charlie", "Dave"];
const images = ["path/to/image1.png", "path/to/image2.png", "path/to/image3.png", "path/to/image4.png"];

names.forEach((name, index) => {
    const character = new Character(name, images[index]);
    characters.push(character);
    const charElement = document.createElement('div');
    charElement.className = 'character';
    charElement.innerText = name;
    document.getElementById('characters').appendChild(charElement);
});

// Add drag-and-drop functionality
const sections = document.querySelectorAll('.section');
const charElements = document.querySelectorAll('.character');

charElements.forEach(charElement => {
    charElement.addEventListener('dragstart', () => {
        charElement.classList.add('dragging');
    });

    charElement.addEventListener('dragend', () => {
        charElement.classList.remove('dragging');
    });
});

sections.forEach(section => {
    section.addEventListener('dragover', e => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        section.appendChild(dragging);
    });
});
