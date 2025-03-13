// JavaScript code for draggable windows and physics
const square = document.getElementById('square');
const circle = document.getElementById('circle');

let isDragging = false;
let offsetX, offsetY;

function onMouseDown(event) {
    isDragging = true;
    offsetX = event.clientX - event.target.offsetLeft;
    offsetY = event.clientY - event.target.offsetTop;
    event.target.style.cursor = 'grabbing';
}

function onMouseMove(event) {
    if (isDragging) {
        event.target.style.left = `${event.clientX - offsetX}px`;
        event.target.style.top = `${event.clientY - offsetY}px`;
    }
}

function onMouseUp(event) {
    isDragging = false;
    event.target.style.cursor = 'grab';
}

square.addEventListener('mousedown', onMouseDown);
square.addEventListener('mousemove', onMouseMove);
square.addEventListener('mouseup', onMouseUp);

circle.addEventListener('mousedown', onMouseDown);
circle.addEventListener('mousemove', onMouseMove);
circle.addEventListener('mouseup', onMouseUp);

// Matter.js physics setup
const { Engine, Render, World, Bodies } = Matter;

const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false
    }
});

const squareBody = Bodies.rectangle(200, 200, 100, 100);
const circleBody = Bodies.circle(400, 200, 50);

World.add(engine.world, [squareBody, circleBody]);

Engine.run(engine);
Render.run(render);
