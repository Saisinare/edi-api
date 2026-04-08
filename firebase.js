const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyDkuUsQbjcndpyylSXigJ3CDMz1bxrOnRs",
  authDomain: "task-manager-9b872.firebaseapp.com",
  projectId: "task-manager-9b872",
  storageBucket: "task-manager-9b872.firebasestorage.app",
  messagingSenderId: "624868094397",
  appId: "1:624868094397:web:e587aa3ec6faf563dba2d4",
  databaseURL: "https://task-manager-9b872-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = { db };
