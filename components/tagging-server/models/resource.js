const mongoose = require('mongoose');
const resourceSchema = new mongoose.Schema({
    title: {
    	type: String,
    	required: true,
    	unique: false
    },
    url:{
    	type: mongoose.SchemaTypes.Url,
    	required: true,
    	unique: true
    },
    desc:{
    	type: String,
    	required: true,
    	unique: true
    },
    tags:{
    	type: Array,
    	required: false,
    	unique: false
    },
    checkedTypes:{
    	type: Array,
    	required: false,
    	unique: false
    },
    levelRating:{
    	type: Array,
    	required: false,
    	unique: false
    },
    timeCommitment:{
    	type: Array,
    	required: false,
    	unique: false
    },
    imageUrl:{
    	type: mongoose.SchemaTypes.Url,
    	required: false,
    	unique: false
    },
    submittedBy:{
    	type: Array,
    	required: true,
    	unique: false
    },
    keywordExtraction:{
    	type: Array,
    	required: false,
    	unique: false
    }
});

const Resource = mongoose.model("Resource", resourceSchema);
module.exports = Resource;