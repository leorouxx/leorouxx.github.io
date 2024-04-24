function calculateTax() {
    const income = parseFloat(document.getElementById('income').value);
    const floors = document.querySelectorAll('.floor');
    let totalTax = 0;

    for (let i = 0; i < floors.length; i++) {
        const floorAmount = parseFloat(floors[i].querySelector('.floor-amount').value);
        const floorRate = parseFloat(floors[i].querySelector('.floor-rate').value) / 100;
        const previousFloorAmount = i > 0 ? parseFloat(floors[i - 1].querySelector('.floor-amount').value) : 0;

        if (!isNaN(floorAmount) && !isNaN(floorRate)) {
            const taxableAmount = Math.min(Math.max(income - previousFloorAmount, 0), floorAmount - previousFloorAmount);
            totalTax += taxableAmount * floorRate;
        }
    }

    const finalRate = (totalTax / income) * 100;

    document.getElementById('total-tax').textContent = `${totalTax.toFixed(2)}€`;
    document.getElementById('final-rate').textContent = `${finalRate.toFixed(2)}%`; 
    document.getElementById('net-income').textContent = `${(income + totalTax).toFixed(2)}€`;
}

function addFloor() {
    const floorContainer = document.getElementById('floor-container');
    const floorCount = floorContainer.querySelectorAll('.floor').length + 1;
    const newFloor = `
        <div class="floor">
            <label for="floor${floorCount}">Palier ${floorCount}:</label>
            <input type="number" class="floor-amount" id="floor${floorCount}" placeholder="Valeur en €">
            <input type="number" class="floor-rate" placeholder="Taux (%)">
        </div>
    `;
    floorContainer.insertAdjacentHTML('beforeend', newFloor);
}

function removeFloor() {
    const floorContainer = document.getElementById('floor-container');
    const floors = floorContainer.querySelectorAll('.floor');
    if (floors.length > 1) {
        const lastFloor = floors[floors.length - 1];
        floorContainer.removeChild(lastFloor);
    }
}