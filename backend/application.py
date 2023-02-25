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
from routes.insuranceClaimRoute import insuranceClaimRoute; 
#-------------------------------------------------------------------

application = app =  Flask(__name__)
# Load app configurations--------------------------------------------------------------------------------------------------------------------------------------

application.config.from_object('config')
# Allow CORS requests to this API-----------------------------------------------------------------------------------------------------------------------------
# allow method , origins , methods are * 
# CORS(application)
CORS_ALLOW_ORIGIN = "*,*"
CORS_EXPOSE_HEADERS = "*,*"
CORS_ALLOW_HEADERS = "content-type,*"
CORS(application, origins=CORS_ALLOW_ORIGIN.split(","), allow_headers=CORS_ALLOW_HEADERS.split(
    ","), expose_headers=CORS_EXPOSE_HEADERS.split(","),   supports_credentials=True)
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
application.register_blueprint(insuranceClaimRoute, url_prefix='/insuranceclaim')
#---------------------------------------------------------------------------------------------------------------------

if __name__ == '__main__':
    application.run()
