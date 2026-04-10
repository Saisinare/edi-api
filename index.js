const express = require("express");
const cors = require("cors");
const { db } = require("./firebase");
const { ref, push, get } = require("firebase/database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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

app.get("/data", async (req, res) => {
  try {
    const dataRef = ref(db, "data");
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      res.status(200).json({ success: true, data: snapshot.val() });
    } else {
      res.status(200).json({ success: true, data: {} });
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
