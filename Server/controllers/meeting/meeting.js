const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

const add = async (req, res) => {
    try {
        req.body.createdDate = new Date();
        const user = new MeetingHistory(req.body);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        console.error('Failed to create MeetingHistory:', err);
        res.status(400).json({ error: 'Failed to create MeetingHistory' });
    }
}

const index = async (req, res) => {
    const query = req.query
    query.deleted = false;
    let allData = await MeetingHistory.find(query).populate({
        path: 'createBy',
        match: { deleted: false }
    }).exec()

    const result = allData.filter(item => item.createBy !== null);
    res.send(result)
}

const view = async (req, res) => {
    const { id } = req.params
    let meeting = await MeetingHistory.findOne({ _id: id })

    if (!meeting) return res.status(404).json({ message: "no meeting Data Found." })
    res.status(200).json({ meeting })
}

const edit = async (req, res) => {
    try {
        let result = await MeetingHistory.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to Update MeetingHistory:', err);
        res.status(400).json({ error: 'Failed to Update MeetingHistory' });
    }
}

const deleteData = async (req, res) => {
  
}

const deleteMany = async (req, res) => {
    
}

module.exports = { add, index, view, deleteData, deleteMany, edit }