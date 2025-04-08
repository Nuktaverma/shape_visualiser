// Navigation functionality
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', function() {
        // Update active button
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding module
        const moduleId = this.getAttribute('data-module');
        document.querySelectorAll('.module').forEach(module => module.classList.remove('active'));
        document.getElementById(moduleId).classList.add('active');
    });
});

// Square visualization
const squareCanvas = document.getElementById('square-canvas');
const ctx = squareCanvas.getContext('2d');
const sizeSlider = document.getElementById('square-size');
const sizeValue = document.getElementById('square-size-value');
const toggleButton = document.getElementById('toggle-square-view');
const resetButton = document.getElementById('reset-square');
const squareExplanation = document.getElementById('square-explanation');
const squareFormula = document.getElementById('square-formula');

let showingArea = false;
let animationStep = 0;
let animationId = null;

function drawSquare() {
    const size = parseInt(sizeSlider.value);
    sizeValue.textContent = size;
    
    // Clear canvas
    ctx.clearRect(0, 0, squareCanvas.width, squareCanvas.height);
    
    // Draw square
    const centerX = squareCanvas.width / 2;
    const centerY = squareCanvas.height / 2;
    const pixelsPerUnit = 30;
    const pixelSize = size * pixelsPerUnit;
    
    ctx.save();
    ctx.translate(centerX - pixelSize/2, centerY - pixelSize/2);
    
    // Draw the square
    ctx.fillStyle = '#e6f0ff';
    ctx.fillRect(0, 0, pixelSize, pixelSize);
    ctx.strokeStyle = '#3366cc';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, pixelSize, pixelSize);
    
    if (showingArea) {
        // Draw grid for area visualization
        ctx.strokeStyle = '#aaccff';
        ctx.lineWidth = 1;
        
        // Draw vertical grid lines
        for (let i = 1; i < size; i++) {
            ctx.beginPath();
            ctx.moveTo(i * pixelsPerUnit, 0);
            ctx.lineTo(i * pixelsPerUnit, pixelSize);
            ctx.stroke();
        }
        
        // Draw horizontal grid lines
        for (let i = 1; i < size; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * pixelsPerUnit);
            ctx.lineTo(pixelSize, i * pixelsPerUnit);
            ctx.stroke();
        }
        
        // Draw unit squares with numbers
        ctx.font = '12px Arial';
        ctx.fillStyle = '#3366cc';
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                ctx.fillText((i * size + j + 1).toString(), 
                    j * pixelsPerUnit + pixelsPerUnit/2 - 5, 
                    i * pixelsPerUnit + pixelsPerUnit/2 + 5);
            }
        }
        
        // Update explanation and formula
        squareExplanation.innerHTML = `
            <h3>Area of a Square</h3>
            <p>The area represents how many unit squares (1×1) can fit inside the square.</p>
            <p>For a square with side length ${size}, we can fit ${size} rows of ${size} unit squares.</p>
            <p>Total number of unit squares = ${size} × ${size} = ${size*size}</p>
        `;
        squareFormula.innerHTML = `A = s<sup>2</sup> = ${size} × ${size} = ${size*size} square units`;
    } else {
        // Draw side labels for perimeter visualization
        ctx.fillStyle = '#3366cc';
        ctx.font = '16px Arial';
        
        // Label sides
        ctx.fillText(`s = ${size}`, pixelSize/2 - 10, -10);
        ctx.fillText(`s = ${size}`, pixelSize + 10, pixelSize/2 + 5);
        ctx.fillText(`s = ${size}`, pixelSize/2 - 10, pixelSize + 20);
        ctx.fillText(`s = ${size}`, -40, pixelSize/2 + 5);
        
        // Draw highlighted perimeter based on animation step
        if (animationStep > 0) {
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#ff6600';
            
            // Top side
            if (animationStep >= 1) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(pixelSize, 0);
                ctx.stroke();
            }
            
            // Right side
            if (animationStep >= 2) {
                ctx.beginPath();
                ctx.moveTo(pixelSize, 0);
                ctx.lineTo(pixelSize, pixelSize);
                ctx.stroke();
            }
            
            // Bottom side
            if (animationStep >= 3) {
                ctx.beginPath();
                ctx.moveTo(pixelSize, pixelSize);
                ctx.lineTo(0, pixelSize);
                ctx.stroke();
            }
            
            // Left side
            if (animationStep >= 4) {
                ctx.beginPath();
                ctx.moveTo(0, pixelSize);
                ctx.lineTo(0, 0);
                ctx.stroke();
            }
        }
        
        // Update explanation and formula
        squareExplanation.innerHTML = `
            <h3>Perimeter of a Square</h3>
            <p>The perimeter is the total distance around the square. Since all sides are equal, we add them together:</p>
            <p>Perimeter = side + side + side + side = 4 × side</p>
        `;
        squareFormula.innerHTML = `P = 4s = 4 × ${size} = ${4*size} units`;
    }
    
    ctx.restore();
}

function animatePerimeter() {
    if (animationStep < 4) {
        animationStep++;
        drawSquare();
        setTimeout(animatePerimeter, 800);
    }
}

// Event listeners
sizeSlider.addEventListener('input', () => {
    drawSquare();
});

toggleButton.addEventListener('click', () => {
    showingArea = !showingArea;
    toggleButton.textContent = showingArea ? 'Show Perimeter' : 'Show Area';
    animationStep = 0;
    if (!showingArea) {
        animatePerimeter();
    } else {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
    drawSquare();
});

resetButton.addEventListener('click', () => {
    sizeSlider.value = 5;
    animationStep = 0;
    if (!showingArea) {
        animatePerimeter();
    }
    drawSquare();
});

// Initial draw and animation
drawSquare();
animatePerimeter();