from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:0987654321@localhost/pixel_find'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Register blueprints inside the function
    from app.routes.auth import auth_bp
    from app.routes.report import report_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(report_bp, url_prefix='/report')

    return app
