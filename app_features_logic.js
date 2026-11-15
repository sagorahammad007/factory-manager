// ---- Factory Manager Feature Updates ----

// ১. গ্লোবাল সার্চ ইঞ্জিন (Global Search Engine)
function globalSearch(keyword, database) {
    let results = {
        customers: [],
        raw_materials: [],
        sales: []
    };
    
    if (!keyword) return results;
    keyword = keyword.toLowerCase();

    // কাস্টমার টেবিলে সার্চ
    results.customers = database.customers.filter(c => c.name.toLowerCase().includes(keyword));
    // কাঁচামাল টেবিলে সার্চ
    results.raw_materials = database.raw_materials.filter(r => r.name.toLowerCase().includes(keyword));
    // সেলস বা ভাউচারে সার্চ
    results.sales = database.sales.filter(s => s.invoiceNo.toLowerCase().includes(keyword) || s.customerName.toLowerCase().includes(keyword));

    return results;
}

// ২. র-ম্যাটেরিয়াল (KG/Ton) থেকে ফিনিশড প্রোডাক্ট (Bag) কনভার্সন (১ ব্যাগ = ২৫ কেজি)
function processProduction(bagsProduced, currentStock) {
    const KG_PER_BAG = 25;
    let totalKgUsed = bagsProduced * KG_PER_BAG;

    if (currentStock.rawMaterialKg < totalKgUsed) {
        return { success: false, message: "পর্যাপ্ত কাঁচামাল স্টক নেই!" };
    }

    // স্টক অ্যাডজাস্টমেন্ট
    currentStock.rawMaterialKg -= totalKgUsed;
    currentStock.finishedBags += bagsProduced;

    // উৎপাদন খরচের হিসাব (Costing Connection)
    let rawMaterialCost = totalKgUsed * currentStock.costPerKg;
    let costPerBag = rawMaterialCost / bagsProduced; 

    return {
        success: true,
        updatedStock: currentStock,
        totalKgUsed: totalKgUsed,
        costPerBag: costPerBag
    };
}

// ৩. প্রারম্ভিক স্থিতি বা খাতার পূর্বের হিসাব (Opening Balance) লিঙ্কিং
function initializeOpeningBalance(data) {
    let businessState = {
        cashBalance: data.openingCash || 0,
        bankBalance: data.openingBank || 0,
        customerDues: data.openingCustomerDues || 0, // কার কাছে কত পাবেন
        supplierDues: data.openingSupplierDues || 0, // সাপ্লায়ার কত পাবে
        rawMaterialStockKg: data.openingRawMaterialKg || 0,
        finishedStockBags: data.openingFinishedBags || 0
    };
    return businessState;
}
