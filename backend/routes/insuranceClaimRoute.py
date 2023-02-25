from flask import Blueprint

from controllers.insuranceClaimController import getall, get; 

insuranceClaimRoute = Blueprint('insuranceClaim', __name__); 


insuranceClaimRoute.route('/getall', strict_slashes=False,
                methods=['GET'])(getall)

insuranceClaimRoute.route('/get/<claimId>', strict_slashes=False,
                methods=['GET'])(get)