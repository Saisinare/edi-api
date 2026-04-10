const express = require("express");
const cors = require("cors");
const { db } = require("./firebase");
const { ref, push, get, child } = require("firebase/database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// POST - Send data
app.post("/send", async (req, res) => {
  try {
    const data = req.body;

    const dataRef = ref(db, "data");
    const newRef = await push(dataRef, {
      ...data,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({ success: true, id: newRef.key });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Fetch all data
app.get("/data", async (req, res) => {
  try {
    const snapshot = await get(ref(db, "data"));

    if (!snapshot.exists()) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    // Convert Firebase object to an array with IDs
    const raw = snapshot.val();
    const data = Object.entries(raw).map(([id, value]) => ({ id, ...value }));

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Fetch single record by ID
app.get("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await get(child(ref(db), `data/${id}`));

    if (!snapshot.exists()) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    res.status(200).json({ success: true, data: { id, ...snapshot.val() } });
  } catch (error) {
    console.error("Error fetching record:", error);
    res.status(500).json({ error: error.message });
  }
});
// GET - Fetch data by specific date (e.g., /data/filter?date=2025-04-10)
app.get("/data/filter", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: "Date query param is required. Use ?date=YYYY-MM-DD" });
    }

    // Validate date format
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!isValidDate) {
      return res.status(400).json({ success: false, message: "Invalid date format. Use YYYY-MM-DD" });
    }

    const snapshot = await get(ref(db, "data"));

    if (!snapshot.exists()) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    const raw = snapshot.val();

    // Filter records where createdAt starts with the given date
    const filtered = Object.entries(raw)
      .map(([id, value]) => ({ id, ...value }))
      .filter(item => item.createdAt && item.createdAt.startsWith(date));

    if (filtered.length === 0) {
      return res.status(404).json({ success: false, message: `No records found for date: ${date}` });
    }

    res.status(200).json({ success: true, date, count: filtered.length, data: filtered });
  } catch (error) {
    console.error("Error fetching data by date:", error);
    res.status(500).json({ error: error.message });
  }
});


// GET - Fetch entire database (all nodes, not just "data")
app.get("/all", async (req, res) => {
  try {
    const snapshot = await get(ref(db, "/"));

    if (!snapshot.exists()) {
      return res.status(404).json({ success: false, message: "Database is empty" });
    }

    res.status(200).json({ success: true, database: snapshot.val() });
  } catch (error) {
    console.error("Error fetching entire database:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});