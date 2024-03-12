const uuid = require('uuid');
const path = require('path');
const { ObjectId } = require('mongoose');
const User = require('../model/user');
const { error } = require('console');
const service = require('../service/userServices');

exports.getHomePage = async (req, res) => {

    const id = uuid.v4().replace(/-/g, '');

    await service.createResource(id);

    res.json(id);
}

exports.getFieldNames = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userObject = await service.getAllResources(userId);
        const fields = Object.keys(userObject[0]).slice(3);

        res.status(200).json(fields);
    }
    catch (error) {
        res.status(500).json({
            error: "Error fetching field data:"
        });
    }
}


exports.getAllData = async (req, res) => {
    try {
        const userId = req.params.userId;
        const resource = req.params.resource;
        const data = await service.getAllResources(userId);

        res.status(200).json(data[0][resource]);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user data:" });
    }
};

exports.createUserData = async (req, res) => {
    try {
        const userId = req.params.userId;
        const resource = req.params.resource;
        const newData = req.body;
        const dataId = uuid.v1();
        newData["dataId"] = dataId.replace(/-/g, '');

        let userData = await service.findResource(userId);

        if (!userData) {
            throw new Error('User Not Found')
        }
        if (!userData[resource]) {
            userData = await service.updateResource(userId,resource,newData);
            return res.status(201).json(newData);
        } else {
            userData.markModified(resource);
            userData[resource].push(newData);
        }
        await userData.save();

        res.status(201).json(newData);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured while inserting data' })
    }
}

exports.deleteUserData = async (req, res) => {

    try {
        const userId = req.params.userId;
        const resource = req.params.resource
        const deleteId = req.params.id;
        const user = await service.findResource(userId);

        const updated = user[resource].filter(ele => ele.dataId != deleteId);

        await service.updateOneResource(userId,resource,updated);

        res.status(202).json({ message: 'Data deleted successfully' });
    }
    catch (err) {
        console.error("Error deleting data", err);
        res.status(500).json({ error: 'Internal Servor Error' });
    }
}

exports.updateUserData = async (req, res) => {
    try {
        const resource = req.params.resource;
        const userId = req.params.userId;
        const updateId = req.params.id;
        const updatedData = req.body;
        updatedData["dataId"] = updateId;
        const user = await service.findResource(userId);

        const indexToUpdate = user[resource].findIndex(ele => ele.dataId === updateId);

        if (indexToUpdate === -1) {
            return res.status(404).json({ error: 'Data not found' });
        }

        user[resource][indexToUpdate] = updatedData;

        await service.updateOneResource(userId,resource,user[resource]);

        res.status(201).json( user[resource][indexToUpdate] );

    }
    catch (err) {
        console.error("Error updating data", err);
        res.status(500).json({ error: 'Internal Servor Error' });
    }
}

exports.getUserDataById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const resource = req.params.resource;
        const dataId = req.params.id;

        const user = await service.findResource(userId);

        const getIndex = user[resource].findIndex(ele => ele.dataId === dataId);

        if (getIndex === -1) {
            return res.status(404).json('User data not found');
        }

        res.status(200).json(user[resource][getIndex]);
    }
    catch (err) {
        console.error("error getting data", err);
        res.status(500).json({ error: "Internal Sever Error" });
    }
}