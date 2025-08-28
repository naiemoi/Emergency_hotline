// script.js

// DOM elements
const lifeCount = document.querySelector('.flex.items-center.justify-center:nth-child(1) p');
const coinCount = document.querySelector('.flex.items-center.justify-center:nth-child(2) p');
const copyCount = document.querySelector('.flex.items-center.justify-center:nth-child(3) p');
const historyList = document.querySelector('.history-list');
const noCalls = document.getElementById('no-calls');
const clearBtn = document.getElementById('btn-clear');
const heartButtons = document.querySelectorAll('.btn-heart');
const copyButtons = document.querySelectorAll('.bg-gray-200.text-gray-700');
const callButtons = document.querySelectorAll('.btn-call');
// Heart button functionality (increment life)
heartButtons.forEach(button => {
    button.addEventListener('click', () => {
        let currentLife = parseInt(lifeCount.textContent);
        lifeCount.textContent = currentLife + 1;
       
    });
});
// Copy button functionality
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.relative');
        const number = card.querySelector('p.text-3xl').textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(number).then(() => {
            let currentCopy = parseInt(copyCount.textContent);
            copyCount.textContent = currentCopy + 1;
            alert(`Copied: ${number}`);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy number!');
        });
    });
});
// Call button functionality
callButtons.forEach(button => {
    button.addEventListener('click', () => {
        let currentCoins = parseInt(coinCount.textContent);
        if (currentCoins <= 0) {
            alert('No coins left! Please add more coins to make a call.');
            return;
        }

        // Show confirmation alert
        if (confirm('Do you want to make this call? It will cost 20 coins.')) {
            // Deduct 20 coins
            coinCount.textContent = currentCoins - 20;

            // Get service details
            const card = button.closest('.relative');
            const serviceName = card.querySelector('h3').textContent;
            const number = card.querySelector('p.text-3xl').textContent;

            // Remove "No calls" message if present
            if (noCalls) {
                noCalls.remove(); // Permanently remove the "No calls" message
            }

            // Add to call history
            const historyItem = document.createElement('div');
            historyItem.classList.add('p-2', 'border-b', 'border-gray-200');
            historyItem.innerHTML = `
                <p class="font-semibold">${serviceName}</p>
                <p class="text-sm text-gray-600">${number}</p>
                <p class="text-xs text-gray-400">${new Date().toLocaleString()}</p>
            `;
            historyList.appendChild(historyItem);
        }
    });
});