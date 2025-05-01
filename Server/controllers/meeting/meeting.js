const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

const add = async (req, res) => {
   
}

const index = async (req, res) => {
    const query = req.query
    query.deleted = false;
    // let result = await Property.find(query)
    let allData = await MeetingHistory.find(query).populate({
        path: 'createBy',
        match: { deleted: false } // Populate only if createBy.deleted is false
    }).exec()

    const result = allData.filter(item => item.createBy !== null);
    res.send(result)
}

const view = async (req, res) => {
    
}

const deleteData = async (req, res) => {
  
}

const deleteMany = async (req, res) => {
    
}

module.exports = { add, index, view, deleteData, deleteMany }