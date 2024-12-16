const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const personRoutes = require("./routes/personRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", personRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});