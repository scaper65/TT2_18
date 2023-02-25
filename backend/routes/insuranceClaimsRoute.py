from flask import Blueprint

from controllers.insuranceClaimsController import getall; 

insuranceClaimsRoute = Blueprint('insuranceClaim', __name__); 


insuranceClaimsRoute.route('/getall', strict_slashes=False,
                methods=['GET'])(getall)
