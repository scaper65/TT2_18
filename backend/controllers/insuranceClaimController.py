from flask import *; 
from flask_jwt_extended import *; 
from models.db_models import InsuranceClaim
from utils.dbConfig import db

@jwt_required()
def getall():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    
    try:
        existingInsuranceClaims = InsuranceClaim.query.filter( (InsuranceClaim.EmployeeID == current_user) ).all(); 
        return list(map(lambda x: x.json(), existingInsuranceClaims)), 200

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
        existingInsuranceClaim = InsuranceClaim.query.filter( (InsuranceClaim.EmployeeID == current_user) &  (InsuranceClaim.ClaimID == claimId)).first(); 
        return existingInsuranceClaim.json(), 200

    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "message": "Server Error"
            }
        ), 500
    


def addClaim():
    try:
        FirstName = request.json.get("FirstName", None)
        LastName = request.json.get("LastName", None)

        ExpenseDate = request.json.get("ExpenseDate", None)
        Amount = request.json.get("Amount", None)

        
        Purpose = request.json.get("Purpose", None)
        FollowUp = request.json.get("FollowUp", None)

        PreviousClaimID = request.json.get("Purpose", None)
       
        

        return jsonify({
            "code": 200,
            "token": access_token
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
        
        InsuranceClaim.query.filter(InsuranceClaim.ClaimID == ClaimID).delete()
      
        db.session.commit()

        return jsonify({
            "data": f"Claim of id {ClaimID} has been successfully deleted"
        })
    except:
        return jsonify({
            "data": "Server error"
        }), 500
