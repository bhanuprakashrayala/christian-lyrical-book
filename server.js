require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/search", async (req, res) => {
  const { title } = req.query;

  let query = supabase.from("songs").select("*");

  if (title) {
    query = query.ilike("title", `%${title}%`);
  }

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});
