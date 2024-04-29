from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    rol = db.Column(db.String(5), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "rol" : self.rol,
            "is_active" : self.is_active
            # do not serialize the password, its a security breach
        }
    
class User_profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    height = db.Column(db.Integer, unique=False, nullable=False )
    sex = db.Column(db.String(20), unique=False, nullable=False)
    injury = db.Column(db.Boolean(), unique=False, nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    additional_info = db.Column(db.String(400), unique=False, nullable=False)

    user = db.relationship("User", backref = db.backref('user_profile', lazy=True))

    def __repr__(self):
        return f'<User_profile {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name" : self.last_name,
            "age" : self.age,
            "height" : self.height,
            "sex" : self.sex,
            "injury" : self.injury,
            "user_id" : self.user_id,
            "additional_info" : self.additional_info
        }
    
class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exercise_name = db.Column(db.String(120), unique=True, nullable=False)
    url = db.Column(db.String(200), unique=True, nullable=False)

    def __repr__(self):
        return f'<Video {self.exercise_name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "exercise_name": self.exercise_name,
            "url": self.url
        }
    
class Contact_msj(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    to = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    from_user = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(50), unique=False, nullable=False)
    comment = db.Column(db.String(250), unique=False, nullable=False)

    user = db.relationship("User", backref = db.backref('contact_msj', lazy=True))

    def __repr__(self):
        return f'<Contact_msj {self.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "to": self.to,
            "from_user": self.from_user,
            "email": self.email,
            "comment": self.comment
        }