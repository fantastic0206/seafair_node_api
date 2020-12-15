
const workOrderModel = require('../models/workorder');
const assetModel = require('../models/assets');	
const projectModel=require('../models/project');
const userModel=require('../models/users');
module.exports = {
	getById: async function(req, res, next) {
		await workOrderModel.findById(req.params.Id, async function(err, workorder){
			if (err) {
				res.status(400).json({ msg: "Not  found" });
			} else {
				//  let workOrderStatus=await workOrderStatusModel.findById(workorder.intWorkOrderStatusID).exec();
				// let Asset=await assetModel.findById(workorder.strAssetIds).exec();
				let project=await projectModel.findById(workorder.intProjectId).exec();
				let completedUser=await userModel.findById(workorder.intCompletedByUserID==""?null:workorder.intCompletedByUserID).exec();
				let assignedUser=await userModel.findById(workorder.intAssignedUserId==""?null:workorder.intAssignedUserId).exec();
				let result={};
				 result.workorder=workorder==null?{}:workorder;	
				  result.asset={};
				 result.project=project==null?{}:project;
				 result.completedUser=completedUser==null?{}:completedUser;
				 result.assignedUser=assignedUser==null?{}:assignedUser;
				 res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		workOrderModel.find({})
		// ..and populate all of the notes associated with it
		// .populate("strAssetIds")
		.populate("intCompletedByUserID")
		.populate("intAssignedUserId")
		.then(function(data) {		
		  // If we were able to successfully find an Product with the given id, send it back to the client
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  // If an error occurred, send it to the client
		  res.status(500).json({ msg: "Internal Server error" });
		});		
		
	},

	updateById: function(req, res, next) {
		var workorder={};
		workorder.intPriorityID=req.body.intPriorityID;
		workorder.intWorkOrderStatusID=req.body.intWorkOrderStatusID;
		workorder.intSiteID=req.body.intSiteID;
		workorder.intRequestedByUserID=req.body.intRequestedByUserID;
		workorder.strEmailUserGuest=req.body.strEmailUserGuest;
		// workorder.dtmDateCreated=req.body.dtmDateCreated;
		workorder.dtmDateCompleted=req.body.dtmDateCompleted;
		workorder.intCompletedByUserID=req.body.intCompletedByUserID;
		workorder.strDescription=req.body.strDescription;
		workorder.strNameUserGuest=req.body.strNameUserGuest;
		workorder.dtmSuggestedCompletionDate=req.body.dtmSuggestedCompletionDate;
		workorder.strPhoneUserGuest=req.body.strPhoneUserGuest;
		// workorder.strCode=req.body.strCode;
		workorder.strCompletionNotes=req.body.strCompletionNotes;
		workorder.intMaintenanceTypeID	=req.body.intMaintenanceTypeID;
		workorder.dtmDateLastModified	=req.body.dtmDateLastModified;
		workorder.strAdminNotes	=req.body.strAdminNotes;
		workorder.intRCAActionID	=req.body.intRCAActionID;
		workorder.intRCACauseID	=req.body.intRCACauseID;
		workorder.intRCAProblemID	=req.body.intRCAProblemID;
		workorder.intProjectId=req.body.intProjectId;
		workorder.strAssetIds=req.body.strAssetIds;
		workorder.strAssignedUsers=req.body.strAssignedUsers;
		workorder.intAssignedUserId=req.body.intAssignedUserId;
		workorder.dblTimeEstimatedHours=req.body.dblTimeEstimatedHours;
		workorder.dblTimeSpentHours=req.body.dblTimeSpentHours;
		workorder.strAssets=req.body.strAssets;
		workOrderModel.findByIdAndUpdate(req.params.Id,workorder, function(err, movieInfo){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		workOrderModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!", data:null});
			}
		});
	},

	create: function(req, res, next) {		
		var workorder={};
		workorder.intPriorityID=req.body.intPriorityID;
		workorder.intWorkOrderStatusID=req.body.intWorkOrderStatusID;
		workorder.intSiteID=req.body.intSiteID;
		workorder.intRequestedByUserID=req.body.intRequestedByUserID;
		workorder.strEmailUserGuest=req.body.strEmailUserGuest;
		// workorder.dtmDateCreated=req.body.dtmDateCreated;
		workorder.dtmDateCompleted=req.body.dtmDateCompleted;
		workorder.intCompletedByUserID=req.body.intCompletedByUserID;
		workorder.strDescription=req.body.strDescription;
		workorder.strNameUserGuest=req.body.strNameUserGuest;
		workorder.dtmSuggestedCompletionDate=req.body.dtmSuggestedCompletionDate;
		workorder.strPhoneUserGuest=req.body.strPhoneUserGuest;
		workorder.strCode=req.body.strCode;
		workorder.strCompletionNotes=req.body.strCompletionNotes;
		workorder.intMaintenanceTypeID	=req.body.intMaintenanceTypeID;
		workorder.dtmDateLastModified	=req.body.dtmDateLastModified;
		workorder.strAdminNotes	=req.body.strAdminNotes;
		workorder.intRCAActionID	=req.body.intRCAActionID;
		workorder.intRCACauseID	=req.body.intRCACauseID;
		workorder.intRCAProblemID	=req.body.intRCAProblemID;
		workorder.strAssignedUsers=req.body.strAssignedUsers;
		workorder.strAssetIds=req.body.strAssetIds==null?"":req.body.strAssetIds;
		workorder.intProjectId=req.body.intProjectId;
		workorder.intAssignedUserId=req.body.intAssignedUserId;
		workorder.dblTimeEstimatedHours=req.body.dblTimeEstimatedHours;
		workorder.dblTimeSpentHours=req.body.dblTimeSpentHours;
		workorder.strAssets=req.body.strAssets==null?"":req.body.strAssets;

		workOrderModel.create(workorder, function (err, result) {

				  if (err) {					
					if (err.errors) {	
						if (err.errors.intWorkOrderStatusID) {
							res.status(400).json({ msg: err.errors.intWorkOrderStatusID.message });
							return;
						  }
						else if (err.errors.intSiteID) {
								res.status(400).json({ msg: err.errors.intSiteID.message });
								return;
						}
					}
					console.log(err);
					res.status(400).json({ msg: "Saved failed", data: null});
				  }				  
				  else{
					workorder.strCode="WO# "+result._id;
					workOrderModel.findByIdAndUpdate(result._id,workorder, function(err, movieInfo){

						if(err)
							res.status(400).json({ msg: "Saved failed!" });
						else {
							res.status(200).json({msg: "Saved successfully!", data: {id:result._id}});
						}
					});
				
				  }
				 	 
				  
				});
	},

}					