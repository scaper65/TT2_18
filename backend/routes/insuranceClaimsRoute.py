from flask import Blueprint

from controllers.insuranceClaimController import *; 

insuranceClaimsRoute = Blueprint('insuranceClaim', __name__); 


insuranceClaimsRoute.route('/getall', strict_slashes=False,
                methods=['GET'])(getall)

insuranceClaimsRoute.route('/delete', strict_slashes=False,
                methods=['POST'])()

insuranceClaimsRoute.route('/edit', strict_slashes=False,
                methods=['POST'])(getall)


insuranceClaimsRoute.route('/add', strict_slashes=False,
                methods=['POST'])(getall)
