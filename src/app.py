"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, User_profile, Video
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
            name=data['name'], 
            last_name=data['last_name'], 
            age=data['age'],
            sex=data['sex'],
            height=data['height'],
            injury=data.get('injury'),
            additional_info=data['additional_info'],
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

        if 'name' in data:
            user.name = data['name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'age' in data:
            user.age = data['age']
        if 'sex' in data:
            user.sex = data['sex']
        if 'height' in data:
            user.height = data['height']
        if 'injury' in data:
            user.injury = data['injury']
        if 'additional_info' in data:
            user.additional_info = data['additional_info'] 
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

    user_profile_json = {'name': user.name,
                        'last_name': user.last_name,
                        'age': user.age,
                        'sex': user.sex,
                        'height': user.height,
                        'injury': user.injury,
                        'additional_info': user.additional_info,
                        'user_id': user.user_id}
    return jsonify(user_profile_json)


#endpoints login

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email = email).first()

    if not user:
        raise APIException('User doesnt exist', status_code=400)

    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401
    
    expire_time = timedelta(seconds = 60) #solo para pruebas de acceso, después hay que modificarlo

    access_token = create_access_token(identity=email, expires_delta = expire_time)
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
