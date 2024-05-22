"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def add_user():
    data = request.get_json()
    if 'email' not in data or 'password' not in data:
        raise APIException('all fields are required', status_code=400)

    new_user = User(
            email=data['email'], 
            password=data['password'], 
            rol=data['rol','user'],
            is_active=data.get('is_active',True)
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User added'}), 201 

@api.route('/user', methods=['GET'])
def get_user():
    users = User.query.all()
    user_json = [user.serialize() for user in users]

    return jsonify(user_json), 200

@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'Favorite character erased'})
    except Exception as e:
        db.session.rollback()
        raise APIException('error', status_code=500)
    
