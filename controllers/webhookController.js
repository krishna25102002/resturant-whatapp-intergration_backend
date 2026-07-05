const chatbotService = require("../services/chatbotService");

// GET /webhook
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

    return res.sendStatus(403);
};


// POST /webhook
exports.receiveWebhook = async (req, res) => {

    console.log("📩 Incoming Webhook");

    const body = req.body;

    if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0].value.messages
    ) {
        console.log(JSON.stringify(req.body, null, 2));
        const phone =
            body.entry[0].changes[0].value.messages[0].from;

        const message =
            body.entry[0].changes[0].value.messages[0].text.body;

        console.log("Customer :", phone);
        console.log("Message  :", message);

        await chatbotService.processMessage(phone, message);

    }

    res.sendStatus(200);

};
// const chatbotService = require("../services/chatbotService");

// exports.verifyWebhook = (req, res) => {

//     const mode = req.query["hub.mode"];
//     const token = req.query["hub.verify_token"];
//     const challenge = req.query["hub.challenge"];

//     if (
//         mode === "subscribe" &&
//         token === process.env.VERIFY_TOKEN
//     ) {
//         console.log("Webhook Verified");
//         return res.status(200).send(challenge);
//     }

//     return res.sendStatus(403);
// };


// exports.receiveWebhook = async (req, res) => {
//     try {
//         console.log("Incoming Webhook");
//         console.log(JSON.stringify(req.body, null, 2));

//         const entry = req.body.entry?.[0];
//         const changes = entry?.changes?.[0];
//         const value = changes?.value;

//         // Check if it's a message and it's a text message
//         if (value?.messages?.[0]?.type === "text") {
//             const phone = value.messages[0].from;
//             const message = value.messages[0].text.body;

//             await chatbotService.processMessage(phone, message);
//         }

//         res.sendStatus(200);
//     } catch (error) { 
//         console.error("Error processing webhook:", error);
//         res.sendStatus(500);
//     }
// };