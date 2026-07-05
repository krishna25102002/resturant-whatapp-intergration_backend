const axios = require("axios");

exports.sendTextMessage = async (phone, message) => {

    try {

        console.log("➡️ Sending Message...");

        const url =`https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/${process.env.PHONE_NUMBER_ID}/messages`;
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

    console.log("========== META ERROR ==========");

    console.log("Status:",
        error.response?.status);

    console.log("Headers:",
        error.response?.headers);

    console.log("Data:",
        JSON.stringify(
            error.response?.data,
            null,
            2
        ));

    console.log(error.message);

}

};