from flask import *; 
from flask_jwt_extended import *; 
from models.db_models import *

from utils.dbConfig import db


@jwt_required()
def getall():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    
    try:
        existingInsuranceClaims = db.session.query(InsuranceClaim, InsurancePolicy).filter((InsurancePolicy.EmployeeID == current_user) & (InsurancePolicy.InsuranceID == InsuranceClaim.InsuranceID)).all(); 
        return list(map(lambda x: x.InsuranceClaim.json(), existingInsuranceClaims)), 200

    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "message": "Server Error"
            }
        ), 500

@jwt_required()
def get(claimId):
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    
    try:
        existingInsuranceClaim = db.session.query(InsuranceClaim, InsurancePolicy).filter((InsurancePolicy.EmployeeID == current_user) & (InsurancePolicy.InsuranceID == InsuranceClaim.InsuranceID) & (InsuranceClaim.ClaimID == claimId)).first(); 
        
        if not existingInsuranceClaim:
            return jsonify(
                {
                    "code": 404,
                    "message": "Claim not found."
                }
            ), 404

        return existingInsuranceClaim.InsuranceClaim.json(), 200

    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "message": "Server Error"
            }
        ), 500

@jwt_required()

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

@jwt_required()
def deleteClaim(claimId):

    try:
        
        InsuranceClaim.query.filter(InsuranceClaim.ClaimID == claimId).delete()
      
        db.session.commit()

        return jsonify({
            "data": f"Claim of id {claimId} has been successfully deleted"
        })
    except Exception as e:
        return jsonify({
            "data": "Server error",
            "error":str(e)
        }), 500
