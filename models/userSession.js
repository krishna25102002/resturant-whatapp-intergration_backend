/**
 * Represents a user's session for the WhatsApp bot.
 */
class UserSession {
    /**
     * Creates a new user session.
     * @param {string} phone The user's phone number.
     */
    constructor(phone) {
        this.phone = phone;
        this.step = "CATEGORY"; // The initial step in the conversation flow
        this.cart = [];
        this.selectedCategory = "";
        this.selectedItem = "";
        this.quantity = 0;
    }

    /**
     * Resets the session to its initial state, keeping the phone number.
     */
    reset() {
        this.step = "CATEGORY";
        this.cart = [];
        this.selectedCategory = "";
        this.selectedItem = "";
        this.quantity = 0;
    }
}

module.exports = UserSession;