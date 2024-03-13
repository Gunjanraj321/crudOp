const User = require('../model/user');

exports.createResource = async (userId) => {
    try {
        await User.create({ userId });
    } catch (error) {
        throw new Error(error);
    }
};

exports.getAllResources = async (userId)=>{
    try{
        return await User.find({ userId: userId }, '-_id -userId -__v -currDate');
    }catch (error) {
        throw new Error(error);
    }
}

exports.findResource = async (userId) => {
    try {
        return await User.findOne({ userId });
    } catch (error) {
        throw new Error(error);
    }
};

exports.updateResource = async(userId,resource,newData)=>{
    try{
        return await User.updateOne({ userId: userId }, { [resource]: [newData] });
    }catch(error){
        throw new Error(error);
    }
}

exports.updateOneResource = async(userId,resource,updated)=>{
    try{
        await User.findOneAndUpdate({ userId: userId }, { [resource]: updated })
    }catch(error){
        throw new Error(error);
    }
}