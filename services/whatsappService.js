exports.sendTextMessage = async (phone, message) => {

    console.log("==================================");
    console.log("📱 To:", phone);
    console.log("🤖 Bot Reply:");
    console.log(message);
    console.log("==================================");

    return {
        success: true,
        phone,
        message
    };

};