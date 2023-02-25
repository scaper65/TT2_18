from flask import Flask, request, jsonify
from utils.dbConfig import db
from models.db_models import InsuranceClaim
from flask_jwt_extended import *; 

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
        existingInsuranceClaims = InsuranceClaim.query.filter( (InsuranceClaim.EmployeeID == current_user) &  (InsuranceClaim.ClaimID == claimId)).all(); 
        return list(map(lambda x: x.json(), existingInsuranceClaims)), 200

    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "message": "Server Error"
            }
        ), 500