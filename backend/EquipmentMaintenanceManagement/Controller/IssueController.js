const Issue = require('../Model/IssueModel');

const getAllIssues = async (req, res,next) => {
        
    let issue;
        //Get all issues
        try {
            issue = await Issue.find();
        }catch(err){
            console.log(err);
        }
        //not found
        if (!issue) {
            return res.status(404).json({ message: "Issues not found" });
        }
        //display all issues
        return res.status(200).json({issue});   
    };
 

//data insert
const addIssues =async(req, res, next) =>{
    const {serial_number,issue_title,description,priority_level,assign_technician,maintenance_cost} = req.body;

    let issue;

    try{
        issue = new Issue({serial_number,issue_title,description,priority_level,assign_technician,maintenance_cost});
        await issue.save();
    }catch (err){
        console.log(err);
    }
    //not insert equipments
    if(!issue){
        return res.status(404).send({message:"Unable to add Issue"});
    }
    return res.status(200).json({issue});
}


//get by  id
const getById =  async(req, res, next) => {

    const id = req.params.id;

    let issue;
    try{
        issue = await Issue.findById(id);
        
    }catch(err){
        console.log(err);
    }
    //not available issues
    if (!issue) {
        return res.status(404).json({ message: "Issue not found" });
    }
    return res.status(200).json({issue});
}

//Update issue details
const updateIssue = async (req, res, next) => {
    const id = req.params.id;

    const { serial_number, issue_title, description, priority_level, assign_technician, maintenance_cost } = req.body;

    let updatedIssue;

    try {
        updatedIssue = await Issue.findByIdAndUpdate(
            id,
            {
                serial_number,
                issue_title,
                description,
                priority_level,
                assign_technician,
                maintenance_cost
            },
            { new: true } // Returns the updated document
        );

        if (!updatedIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        return res.status(200).json({ message: "Issue updated successfully", issue: updatedIssue });

    } catch (err) {
        console.error("Error updating issue:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};



//delete issue details
const deleteIssue =async(req, res, next) => {
    const id = req.params.id;

    let issue;

    try{
        issue = await Issue.findByIdAndDelete(id);
    }catch(err){
        console.log(err)
    }
    if (!issue) {
        return res.status(404).json({ message: "Unable to delete Issue details" });
    }
    return res.status(200).json({issue});
}



exports.getAllIssues = getAllIssues;
exports.addIssues = addIssues;
exports.getById = getById;
exports.updateIssue = updateIssue;
exports.deleteIssue = deleteIssue;
