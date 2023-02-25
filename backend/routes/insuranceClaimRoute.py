from flask import Blueprint

from controllers.insuranceClaimController import *; 

insuranceClaimRoute = Blueprint('insuranceClaim', __name__); 


insuranceClaimRoute.route('/getall', strict_slashes=False,
                methods=['GET'])(getall)

insuranceClaimRoute.route('/get<claimId>', strict_slashes=False,
                methods=['GET'])(get)

insuranceClaimRoute.route('/add', strict_slashes=False,
                methods=['POST'])(addClaim)

insuranceClaimRoute.route('/edit', strict_slashes=False,
                methods=['PUT'])(editClaim)

insuranceClaimRoute.route('delete/<int:claimId>', strict_slashes=False,methods=['DELETE'])(deleteClaim)


