const chatbotService = require("../services/chatbotService");

// ===============================
// GET /webhook
// Meta Webhook Verification
// ===============================
exports.verifyWebhook = (req, res) => {

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (
        mode === "subscribe" &&
        token === process.env.VERIFY_TOKEN
    ) {
        console.log("✅ Webhook Verified");
        return res.status(200).send(challenge);
    }

    console.log("❌ Webhook Verification Failed");
    return res.sendStatus(403);
};


// ===============================
// POST /webhook
// Receive WhatsApp Messages
// ===============================
exports.receiveWebhook = async (req, res) => {

    try {

        console.log("\n==============================");
        console.log("📩 Incoming Webhook");
        console.log("==============================");

        const body = req.body;

        console.log("Full Payload:");
        console.log(JSON.stringify(body, null, 2));

        const value = body.entry?.[0]?.changes?.[0]?.value;

        if (!value) {
            console.log("❌ No value object found.");
            return res.sendStatus(200);
        }

        // Ignore delivery/read/status updates
        if (value.statuses) {
            console.log("ℹ️ Status Update Received");
            console.log(JSON.stringify(value.statuses, null, 2));
            return res.sendStatus(200);
        }

        // Ignore if no messages
        if (!value.messages) {
            console.log("ℹ️ No incoming messages found.");
            return res.sendStatus(200);
        }

        const incoming = value.messages[0];

        console.log("Incoming Message Object:");
        console.log(JSON.stringify(incoming, null, 2));

        // Ignore non-text messages
        if (incoming.type !== "text") {
            console.log(`ℹ️ Ignoring ${incoming.type} message.`);
            return res.sendStatus(200);
        }

        const phone = incoming.from;
        const message = incoming.text.body;

        console.log("--------------------------------");
        console.log("Customer :", phone);
        console.log("Message  :", message);
        console.log("--------------------------------");

        console.log("➡️ Calling chatbotService...");

        await chatbotService.processMessage(phone, message);

        console.log("✅ chatbotService completed.");

        return res.sendStatus(200);

    } catch (error) {

        console.log("❌ Webhook Error");
        console.error(error);

        return res.sendStatus(500);
    }

};
// exports.receiveWebhook = async (req, res) => {

//     try {

//         console.log("========== WEBHOOK START ==========");
//         console.log(JSON.stringify(req.body, null, 2));

//         const value = req.body.entry?.[0]?.changes?.[0]?.value;

//         console.log("STEP 1");

//         if (!value) {
//             console.log("No value");
//             return res.sendStatus(200);
//         }

//         console.log("STEP 2");

//         if (value.statuses) {
//             console.log("Status webhook");
//             return res.sendStatus(200);
//         }

//         console.log("STEP 3");

//         if (!value.messages) {
//             console.log("No messages");
//             return res.sendStatus(200);
//         }

//         console.log("STEP 4");

//         const incoming = value.messages[0];

//         console.log("STEP 5");

//         const phone = incoming.from;
//         const message = incoming.text?.body;

//         console.log("Phone:", phone);
//         console.log("Message:", message);

//         console.log("STEP 6");

//         await chatbotService.processMessage(phone, message);

//         console.log("STEP 7");

//         return res.sendStatus(200);

//     } catch (err) {

//         console.log("ERROR OCCURRED");
//         console.error(err);

//         return res.sendStatus(500);

//     }

// };