const userViews = require('../service/userServices');
const uuid = require('uuid');

exports.getHomePage = async (req, res) => {
    try {
        const id = uuid.v4().replace(/-/g, '');
        await userViews.createUser(id);
        res.json(id);
    } catch (error) {
        handleError(res, error, "Error creating user");
    }
}

exports.createUserData = async (req, res) => {
    try {
        const { userId, resource } = req.params;
        const newData = { ...req.body, dataId: uuid.v1().replace(/-/g, '') };

        await userViews.updateUserField(userId, resource, newData);

        res.status(201).json(newData);
    } catch (error) {
        handleError(res, error, "Error creating user data");
    }
}

exports.getFieldNames = async (req, res) => {
    try {
        const { userId } = req.params;
        const fields = Object.keys(await userViews.getUserByUserId(userId)).slice(3);
        res.status(200).json(fields);
    } catch (error) {
        handleError(res, error, "Error fetching field data");
    }
}

exports.getAllData = async (req, res) => {
    try {
        const { userId, resource } = req.params;
        const data = await userViews.getUserByUserId(userId);
        res.status(200).json(data[resource]);
    } catch (error) {
        handleError(res, error, "Error fetching user data");
    }
};

exports.deleteUserData = async (req, res) => {
    try {
        const { userId, resource, id } = req.params;

        await userViews.deleteUserDataById(userId, resource, id);

        res.status(202).json({ message: 'Data deleted successfully' });
    } catch (error) {
        handleError(res, error, "Error deleting data");
    }
}

exports.updateUserData = async (req, res) => {
    try {
        const { userId, resource, id } = req.params;
        const updatedData = req.body;

        await userViews.updateUserDataById(userId, resource, id, updatedData);

        res.status(201).json(updatedData);
    } catch (error) {
        handleError(res, error, "Error updating data");
    }
}

exports.getUserDataById = async (req, res) => {
    try {
        const { userId, resource, id } = req.params;

        const data = await userViews.getUserDataById(userId, resource, id);

        res.status(200).json(data);
    } catch (error) {
        handleError(res, error, "Error getting data");
    }
}

function handleError(res, error, message) {
    console.error(message, error);
    res.status(500).json({ error: message });
}
