exports.processMessage = async (phone, message) => {

    message = message.trim().toLowerCase();

    if (message === "hi" || message === "hello") {

        return whatsappService.sendTextMessage(
            phone,
`👋 Welcome to YatraVandi Restaurant

Choose your category

1️⃣ Veg 🍛
2️⃣ Non Veg 🍗
3️⃣ Drinks 🥤

Reply with the number.`
        );
    }

    if (message === "1") {

        return whatsappService.sendTextMessage(
            phone,
`🍛 Veg Menu

1️⃣ Veg Meals - ₹120

2️⃣ Paneer Butter Masala - ₹220

3️⃣ Veg Fried Rice - ₹180

Reply with the item number.`
        );
    }

    if (message === "2") {

        return whatsappService.sendTextMessage(
            phone,
`🍗 Non Veg Menu

1️⃣ Chicken Biryani - ₹250

2️⃣ Chicken Fried Rice - ₹220

3️⃣ Chicken 65 - ₹240

Reply with the item number.`
        );
    }

    if (message === "3") {

        return whatsappService.sendTextMessage(
            phone,
`🥤 Drinks

1️⃣ Coke - ₹40

2️⃣ Sprite - ₹40

3️⃣ Water - ₹20

Reply with the item number.`
        );
    }

    return whatsappService.sendTextMessage(
        phone,
"Sorry 😔 I didn't understand. Please type 'Hi' to start."
    );
};