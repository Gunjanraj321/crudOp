const User = require('../model/user');

exports.createResource = async (userId) => {
    try {
        await User.create({ userId });
    } catch (error) {
        throw new Error('Error creating user');
    }
};

exports.getAllResources = async (userId)=>{
    try{
        return await User.find({ userId: userId }, '-_id -userId -__v -currDate');
    }catch (error) {
        console.error("Error fetching field data:", error);
    }
}

exports.findResource = async (userId) => {
    try {
        return await User.findOne({ userId });
    } catch (error) {
        throw new Error('Error creating user');
    }
};

exports.updateResource = async(userId,resource,newData)=>{
    try{
        return await User.updateOne({ userId: userId }, { [resource]: [newData] });
    }catch(error){
        res.status(500).json({ error: 'Error Occured while updating data' })
    }
}

exports.updateOneResource = async(userId,resource,updated)=>{
    try{
        await User.findOneAndUpdate({ userId: userId }, { [resource]: updated })
    }catch{
    res.status(500).json({ error: 'Error deleting data' })
    }
}