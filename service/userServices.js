const User = require('../model/user');

exports.createUser = async (userId) => {
    try {
        await User.create({ userId });
    } catch (error) {
        throw new Error('Error creating user');
    }
};

exports.getUserByUserId = async (userId) => {
    try {
        return await User.findOne({ userId }, -_id -userId );
    } catch (error) {
        throw new Error('Error fetching user');
    }
};

exports.updateUserField = async (userId, resource, newData) => {
    try {
        let userData = await User.findOneAndUpdate(
            { userId },
            { $push: { [resource]: newData } },
            { upsert: true, new: true }
        );
        await userData.save();
    } catch (error) {
        throw new Error('Error updating user field');
    }
};

exports.deleteUserDataById = async (userId, resource, dataId) => {
    try {
        await User.updateOne(
            { userId },
            { $pull: { [resource]: { dataId } } }
        );
    } catch (error) {
        throw new Error('Error deleting user data');
    }
};

exports.updateUserDataById = async (userId, resource, updateId, updatedData) => {
    try {
        await User.updateOne(
            { userId, [`${resource}.dataId`]: updateId },
            { $set: { [`${resource}.$`]: updatedData } }
        );
    } catch (error) {
        throw new Error('Error updating user data');
    }
};

exports.getUserDataById = async (userId, resource, dataId) => {
    try {
        return await User.findOne({ userId, [`${resource}.dataId`]: dataId }, `${resource}.$`);
    } catch (error) {
        throw new Error('Error getting user data');
    }
};
