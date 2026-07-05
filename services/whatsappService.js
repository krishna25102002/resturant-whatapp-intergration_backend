const axios = require("axios");

exports.sendTextMessage = async (phone, message) => {

    try {

        const url = `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`;

        const response = await axios.post(
            url,
            {
                messaging_product: "whatsapp",
                to: phone,
                type: "text",
                text: {
                    body: message
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("✅ Message Sent Successfully");
        console.log(response.data);

        return response.data;

    } catch (error) {

        console.log("❌ Error Sending Message");

        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

    }

};