require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const webhookRoutes = require("./routes/webhookRoutes");

app.use("/", webhookRoutes);

app.get("/", (req, res) => {
    res.send("Restaurant WhatsApp Bot Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});