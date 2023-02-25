from flask import *; 
from flask_jwt_extended import *; 
from models.db_models import InsurancePolicy

@jwt_required()
def getall():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    
    try:
        existingInsurancePolicies = InsurancePolicy.query.filter( (InsurancePolicy.EmployeeID == current_user) ).all(); 

        if not existingInsurancePolicies:
            return jsonify(
                {
                    "code": 404,
                    "message": "Policy not found."
                }
            ), 404

        return list(map(lambda x: x.json(),existingInsurancePolicies)), 200

    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "message": "Server Error"
            }
        ), 500