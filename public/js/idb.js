let db;

const request = indexedDB.open('budget', 1);


request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore('new_transaction', { autoIncrement: true });
};

request.onsuccess = function(event) {

  db = event.target.result;

  if (navigator.onLine) {
    // we haven't created this yet, but we will soon, so let's comment it out for now
    // uploadPizza();
  }
};

request.onerror = function(event) {
  console.log(event.target.errorCode);
};


function saveRecord(record) {
  const transaction = db.transaction(['new_transaction'], 'readwrite');

  const budgetObjectStore = transaction.objectStore('new_transaction');

  budgetObjectStore.add(record);
}