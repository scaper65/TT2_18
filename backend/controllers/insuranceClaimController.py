from flask import *; 
from flask_jwt_extended import *; 
from models.db_models import InsuranceClaim
from utils.dbConfig import db

@jwt_required()

<<<<<<< Updated upstream

=======
def editClaim(claimId):
    
    try:
        firstName = request.json.get("FirstName", None)
        lastName = request.json.get("LastName", None)

        expenseDate = request.json.get("ExpenseDate", None)
        amount = request.json.get("Amount", None)

        
        purpose = request.json.get("Purpose", None)
        followUp = request.json.get("FollowUp", None)

        previousClaimID = request.json.get("Purpose", None)
       
        claim = InsuranceClaim(FirstName=firstName,LastName=lastName,ExpenseDate=expenseDate,Amount=amount,Purpose=purpose,FollowUp=followUp,PreviousClaimID=previousClaimID)
        
        InsuranceClaim.query.filter(InsuranceClaim.ClaimID == claimId).update()

        db.session.add(claim)
        db.session.commit()

        return jsonify({
            "code": 200,
            "message": "Successfully Added a Claim!"
        })

    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "message": "Server Error"
            }
        ), 500

@jwt_required()
>>>>>>> Stashed changes
def addClaim():
    try:
        firstName = request.json.get("FirstName", None)
        lastName = request.json.get("LastName", None)

        expenseDate = request.json.get("ExpenseDate", None)
        amount = request.json.get("Amount", None)

        
        purpose = request.json.get("Purpose", None)
        followUp = request.json.get("FollowUp", None)

        previousClaimID = request.json.get("PreviousClaimID", None)
       
        claim = InsuranceClaim(FirstName=firstName,LastName=lastName,ExpenseDate=expenseDate,Amount=amount,Purpose=purpose,FollowUp=followUp,PreviousClaimID=previousClaimID)
        
        db.session.add(claim)
        db.session.commit()

        return jsonify({
            "code": 200,
            "message": "Successfully Added a Claim!"
        })

    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "message": "Server Error"
            }
        ), 500


def deleteClaim(claimId):

    try:
        
        InsuranceClaim.query.filter(InsuranceClaim.ClaimID == claimId).delete()
      
        db.session.commit()

        return jsonify({
            "data": f"Claim of id {ClaimID} has been successfully deleted"
        })
    except:
        return jsonify({
            "data": "Server error"
        }), 500
