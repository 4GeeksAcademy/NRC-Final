"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, User_profile, Video, Contact_msj
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from flask_cors import CORS

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret"  
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file

#Endpoints usuario

@app.route('/user', methods=['POST'])
def add_user():
    data = request.get_json()
    if 'email' not in data or 'password' not in data:
        raise APIException('all fields are required', status_code=400)

    new_user = User(
            email=data['email'], 
            password=data['password'], 
            rol=data['rol'],
            is_active=data.get('is_active',True)
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User added'}), 201 

@app.route('/user', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_json = [user.serialize() for user in users]

    return jsonify(user_json), 200

@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id) 
    if user is None:
        raise APIException('user not found', status_code=404) 

    user_json = {'id': user.id,
                'email': user.email,
                'rol': user.rol,
                'is_active': user.is_active}
    return jsonify(user_json)

#endpoints User_profile

@app.route('/userProfile/<int:user_id>', methods=['POST'])
def add_user_profile(user_id):
    data = request.get_json()
    if 'name' not in data or 'last_name' not in data:
        raise APIException('all fields are required', status_code=400)

    new_user_profile = User_profile(
            name=data['nombre'], 
            last_name=data['apellidos'], 
            age=data['edad'],
            genre=data['genero'],
            height=data['altura'],
            injury=data.get('lesion'),
            additional_info=data['informacionAdicional'],
            user_id=user_id
    )

    db.session.add(new_user_profile)
    db.session.commit()

    return jsonify({'message': 'User added'}), 201 

@app.route('/userProfile/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        user = User_profile.query.filter_by(user_id=user_id).first()
        if user is None:
            raise APIException('User not found', status_code=404)

        if 'nombre' in data:
            user.name = data['nombre']
        if 'apellidos' in data:
            user.last_name = data['apellidos']
        if 'edad' in data:
            user.age = data['edad']
        if 'genero' in data:
            user.genre = data['genero']
        if 'altura' in data:
            user.height = data['altura']
        if 'lesion' in data:
            user.injury = data['lesion']
        if 'informacionAdicional' in data:
            user.additional_info = data['informacionAdicional'] 
        db.session.commit()
        return jsonify({'message': 'User updated'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@app.route('/userProfile/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = User_profile.query.filter_by(user_id=user_id).first()
    if user is None:
        raise APIException('user not found', status_code=404) 

    user_profile_json = {'nombre': user.name,
                        'apellidos': user.last_name,
                        'edad': user.age,
                        'genero': user.genre,
                        'altura': user.height,
                        'lesion': user.injury,
                        'informacionAdicional': user.additional_info,
                        'user_id': user.user_id,
                        'user' : {
                            'email' : user.user.email,
                            'rol' : user.user.rol,
                            'is_active' : user.user.is_active
                        }
                        }
    return jsonify(user_profile_json)

@app.route('/userProfile', methods=['GET'])
def get_all_usersProfile():
    usersProfile = User_profile.query.all()
    profile_json = [profile.serialize() for profile in usersProfile]

    return jsonify(profile_json), 200


#endpoints login

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email = email).first()
    user_rol = user.rol

    if not user:
        raise APIException('User doesnt exist', status_code=400)

    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401
    
    expire_time = timedelta(seconds = 60) #solo para pruebas de acceso, después hay que modificarlo
    additional_claims = {
        "rol": user_rol,
        "user_id": user.id
        }
    
    access_token = create_access_token(identity=email, expires_delta = expire_time, additional_claims=additional_claims)
    return jsonify(access_token=access_token)

@app.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200



#endpoints videos

@app.route('/video', methods=['POST'])
def add_video():
    data = request.get_json()
    if 'exercise_name' not in data or 'url' not in data:
        raise APIException('all fields are required', status_code=400)

    new_video = Video(
            exercise_name=data['exercise_name'], 
            url=data['url'] 
    )

    db.session.add(new_video)
    db.session.commit()

    return jsonify({'message': 'Video added'}), 201 

@app.route('/video/<int:video_id>', methods=['GET'])
def get_video(video_id):
    video = Video.query.get(video_id) 
    if video is None:
        raise APIException('video not found', status_code=404) 

    video_json = {'id': video.id,
                'exercise_name': video.exercise_name,
                'url': video.url}
    return jsonify(video_json)

@app.route('/video', methods=['GET'])
def get_all_videos():
    videos = Video.query.all()
    video_json = [video.serialize() for video in videos]

    return jsonify(video_json), 200

@app.route('/video/<int:video_id>', methods=['PUT'])
def update_video(video_id):
    try:
        data = request.get_json()
        video = Video.query.filter_by(id=video_id).first()
        if video is None:
            raise APIException('Video not found', status_code=404)

        if 'exercise_name' in data:
            video.exercise_name = data['exercise_name']
        if 'url' in data:
            video.url = data['url'] 
        db.session.commit()
        return jsonify({'message': 'Video updated'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

#endpoints formulario

@app.route('/contact_form', methods=['POST'])
def add_msj():
    data = request.get_json()
    if 'from_user' not in data or 'email' not in data or 'comment' not in data:
        raise APIException('all fields are required', status_code=400)

    new_msj = Contact_msj(
            to=1,
            from_user=data['from_user'], 
            email=data['email'],
            comment=data['comment'] 
    )

    db.session.add(new_msj)
    db.session.commit()

    return jsonify({'message': 'Msj added'}), 201 

@app.route('/contact_form', methods=['GET'])
# @jwt_required() comentado durante las pruebas
def get_all_msj():
    messages = Contact_msj.query.all()
    message_json = [message.serialize() for message in messages]

    return jsonify(message_json), 200

@app.route('/contact_form/<int:msj_id>', methods=['DELETE'])
def delete_msj(msj_id):
    try:
        msj = Contact_msj.query.get(msj_id)
        db.session.delete(msj)
        db.session.commit()
        return jsonify({'message': 'Message erased'})
    except Exception as e:
        db.session.rollback()
        raise APIException('error', status_code=500)


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response







# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
