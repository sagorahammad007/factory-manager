// Mock Database for UI Live Search Demonstration
const mockData = [
    { type: 'Customer / কাস্টমার', name: 'Karim Traders', info: 'পূর্বের বাকি: 15,000 ৳' },
    { type: 'Raw Material / কাঁচামাল', name: 'Plastic Dana (Red)', info: 'স্টক: 1,500 KG' },
    { type: 'Invoice / ভাউচার', name: 'Invoice-102 (Sujon)', info: 'টাকা পরিশোধিত: 25,000 ৳' },
    { type: 'Worker / কর্মচারী', name: 'Abul Hossain', info: 'পদবী: মেশিন অপারেটর' }
];

function openModal(id) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById(id).style.display = 'block';
}

function closeAllModals() {
    document.getElementById('overlay').style.display = 'none';
    document.querySelectorAll('.modal').style.forEach(m => m.style.display = 'none');
}

// 1. Google-like Live Search Logic
function liveSearch() {
    const query = document.getElementById('global-search').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    
    if (!query) return;

    const filtered = mockData.filter(item => item.name.toLowerCase().includes(query));
    
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerHTML = `<strong>[${item.type}]</strong> ${item.name} - <span style="color: #ffff00;">${item.info}</span>`;
        resultsContainer.appendChild(div);
    });
}

// 2. KG to Bag Real-time Connection Logic
function calculateKg() {
    const bags = document.getElementById('input-bags').value || 0;
    // 1 Bag = 25 KG Formula
    const kg = bags * 25;
    document.getElementById('calculated-kg').value = kg;
}

function submitProduction() {
    const bags = document.getElementById('input-bags').value;
    const kg = document.getElementById('calculated-kg').value;
    if(bags > 0) {
        alert(`সফলভাবে ${bags} ব্যাগ উৎপাদন স্টক যোগ হয়েছে এবং কাঁচামাল থেকে ${kg} KG দানা মাইনাস করা হয়েছে।`);
        closeAllModals();
    }
}

// 3. Opening Balance Connector
function saveOpeningBalance() {
    const cash = document.getElementById('opening-cash').value;
    const due = document.getElementById('opening-due').value;
    const raw = document.getElementById('opening-raw').value;
    
    alert(`খাতার পূর্বের হিসাব লিংকড হয়েছে!\nনগদ তহবিল: ${cash}৳\nকাস্টমার ডিউ: ${due}৳\nওপেনিং স্টক: ${raw} KG`);
    closeAllModals();
}
