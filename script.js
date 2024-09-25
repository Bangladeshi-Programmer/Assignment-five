//All getElementById Here 
const balanceDisplay = document.getElementById('balance');
const donationSection = document.getElementById('donationSection');
const historySection = document.getElementById('historySection');
const historyList = document.getElementById('historyList');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
let accountBalance = 55000;

// All Event listeners for buttons
document.getElementById('donationBtn').addEventListener('click', showDonation);
document.getElementById('historyBtn').addEventListener('click', showHistory);
document.querySelectorAll('.donate-btn').forEach(button => {
    button.addEventListener('click', donate);
});
closeModalBtn.addEventListener('click', () => {
    successModal.classList.add('hidden');
});

// Show donation section
function showDonation() {
    historySection.classList.add('hidden');
    donationSection.classList.remove('hidden');
    toggleActiveButton('donationBtn');
}

// Show history section
function showHistory() {
    donationSection.classList.add('hidden');
    historySection.classList.remove('hidden');
    toggleActiveButton('historyBtn');
}

// Toggle active button 
function toggleActiveButton(activeId) {
    document.querySelectorAll('nav button').forEach(button => {
        button.classList.toggle('bg-lime-500', button.id === activeId);
        button.classList.toggle('text-black', button.id === activeId);
    });
}

// Donation functionality
function donate(event) {
    const card = event.target.closest('.flex') || event.target.closest('.lg\\:flex');
    const input = card.querySelector('input[type="number"]');
    const currentAmountElem = card.querySelector('.current-amount');

    const donationAmount = parseFloat(input.value);

    // Input validation
    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
    }
    if (donationAmount > accountBalance) {
        alert('Insufficient balance for this donation.');
        return;
    }

    // Update balance and card money
    accountBalance -= donationAmount;
    balanceDisplay.textContent = accountBalance;
    currentAmountElem.textContent = parseFloat(currentAmountElem.textContent) + donationAmount;

    // Log donation in history
    const date = new Date();
    const historyItem = document.createElement('li');
    historyItem.textContent = `Donated Tk${donationAmount} on ${date.toLocaleString()}`;
    historyList.appendChild(historyItem);

    // Show success modal
    successModal.classList.remove('hidden');

    // Clear input field
    input.value = '';
}