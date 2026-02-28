require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// Supabase Connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// 🔥 SEARCH SONGS (DEFAULT + FILTER)
app.get("/search", async (req, res) => {
  const { title } = req.query;

  let query = supabase
    .from("songs")
    .select("*")
    .order("title", { ascending: true });

  if (title) {
    query = query.ilike("title", `%${title}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});