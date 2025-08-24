const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

// Simple test endpoint
app.get('/test', (req, res) => {
  res.json({ success: true, message: 'Simple backend is working!' });
});

app.listen(PORT, () => {
  console.log(`Simple test backend running on http://localhost:${PORT}`);
});
