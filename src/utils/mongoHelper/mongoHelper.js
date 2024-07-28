const userModel = require("../../models/user.model");

async function syncIndexInMongo() {
    try {
        // Create indexes
        await userModel.syncIndexes();
        console.log('Compound unique index created successfully');
    } catch (err) {
        console.error('Error creating index:', err);
    }
}

module.exports = {syncIndexInMongo}