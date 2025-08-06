const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  try {
    const data = fs.readFileSync('./date.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read date.json' });
  }
});

app.listen(PORT, () => {
  console.log(`Nepali Date API running on http://localhost:${PORT}/api`);
});
