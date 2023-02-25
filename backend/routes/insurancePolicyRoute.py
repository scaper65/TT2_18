from flask import Blueprint

from controllers.insurancePolicyController import getall; 

insurancePolicyRoute = Blueprint('insurancePolicy', __name__); 


insurancePolicyRoute.route('/getall', strict_slashes=False,
                methods=['GET'])(getall)
