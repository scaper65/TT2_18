from flask import Blueprint

from controllers.userController import protected; 

userRoute = Blueprint('user', __name__); 


userRoute.route('/protected', strict_slashes=False,
                methods=['GET'])(protected)

