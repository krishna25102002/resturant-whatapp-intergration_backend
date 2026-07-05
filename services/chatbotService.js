const whatsappService = require("./whatsappService");

exports.processMessage = async (phone, message) => {

    message = message.trim().toLowerCase();

    if (message === "hi") {

        return await whatsappService.sendTextMessage(
            phone,
`👋 Welcome to YatraVandi Restaurant

Choose your category

1️⃣ Veg

2️⃣ Non Veg

3️⃣ Drinks`
        );

    }

    return await whatsappService.sendTextMessage(
        phone,
        "Sorry, I didn't understand."
    );

};