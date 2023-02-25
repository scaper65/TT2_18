from flask_cors import CORS;
from flask import Flask; 
from utils.dbConfig import db; 
from flask_jwt_extended import JWTManager; 
import os; 

#--------AUTH----------------------------
from routes.authRoute import authRoute; 


# <REMOVE THE WHEN USING THIS AS A TEMPLATE>---------------------------------------------------------

from routes.userProtected import userRoute; 
from routes.insurancePolicyRoute import insurancePolicyRoute; 
from routes.insuranceClaimsRoute import insuranceClaimsRoute; 
#-------------------------------------------------------------------

application = app =  Flask(__name__)
# Load app configurations--------------------------------------------------------------------------------------------------------------------------------------

application.config.from_object('config')
# Allow CORS requests to this API-----------------------------------------------------------------------------------------------------------------------------
# allow method , origins , methods are * 
CORS(application)

#register app into JWT manager 
jwt = JWTManager(application)

# Register SQL Alchemy------------------------------------------------------------------------------------------------------------------------------------
db.init_app(application)


# Elastic beanstalk health check
@application.route('/', methods=["GET"])
def healthCheck(): 
    return "Healthy",200; 
# Register your blueprints------------------------------------------------------------------------------------------------------------------------------------


# <AUTH ROUTE>-------------------------------------------------------------------------------------------------------------------
application.register_blueprint(authRoute, url_prefix='/auth')


# <REMOVE THE WHEN USING THIS AS A TEMPLATE>----------------------------------------------------------------------

application.register_blueprint(userRoute, url_prefix='/user')
application.register_blueprint(insurancePolicyRoute, url_prefix='/insurancepolicy')
application.register_blueprint(insuranceClaimsRoute, url_prefix='/insuranceclaims')
#---------------------------------------------------------------------------------------------------------------------

if __name__ == '__main__':
    application.run()
