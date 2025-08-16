from flask import Flask, request, jsonify
import bcrypt
import mysql.connector
import os
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

# Set up the database connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '0987654321',
    'database': 'pixel_find'
}
db = mysql.connector.connect(**db_config)
cursor = db.cursor()

@app.route('/')
def home():
    return "Welcome to the Lost & Found Management System!"

# Create a route for user signup
@app.route('/signup', methods=['POST'])
def signup():
    try:
        # Get JSON data from the request
        data = request.get_json()
        
        # Extract fields from JSON data
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        password = data.get('password')
        avatar = data.get('avatar')  # Avatar can be a URL or base64 encoded string
        
        # Check if user already exists
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"success": False, "message": "User  already exists"}), 400

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Save avatar if provided
        avatar_filename = None
        if avatar:
            avatar_filename = f"{email}_avatar.png"
            # Check if avatar is base64 encoded
            if avatar.startswith("data:image"):
                # If the avatar is a base64 string, decode and save it as an image file
                avatar_data = avatar.split(",")[1]  # Get the part after "data:image/png;base64,"
                avatar_bytes = base64.b64decode(avatar_data)
                with open(os.path.join('uploads', avatar_filename), 'wb') as img_file:
                    img_file.write(avatar_bytes)
            else:
                # If it's not base64, just save the URL or whatever format is passed
                with open(os.path.join('uploads', avatar_filename), 'w') as img_file:
                    img_file.write(avatar)

        # Insert the user into the database
        cursor.execute(
            "INSERT INTO users (first_name, last_name, email, password, avatar) VALUES (%s, %s, %s, %s, %s)",
            (first_name, last_name, email, hashed_password.decode('utf-8'), avatar_filename)
        )
        db.commit()

        return jsonify({"success": True, "message": "User  created successfully"}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"success": False, "message": str(e)}), 500


# ------------------- 
# API: Login User
# -------------------
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()  # Parse JSON payload
        email = data.get('email')
        password = data.get('password')
        
        if not all([email, password]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Check if user exists
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'error': 'User  not found'}), 404

        # Verify the password with bcrypt
        if bcrypt.checkpw(password.encode('utf-8'), user[4].encode('utf-8')):  # Assuming password is at index 4
            return jsonify({'message': 'Login successful', 'user': {
                'first_name': user[0],  # Assuming first_name is at index 0
                'last_name': user[1],    # Assuming last_name is at index 1
                'email': user[2],        # Assuming email is at index 2
                'avatar': user[4]        # Assuming avatar is at index 4
            }}), 200
        else:
            return jsonify({'error': 'Invalid password'}), 401

    except Exception as e:
        print('Login error:', str(e))
        return jsonify({'error': 'Login failed', 'details': str(e)}), 500


# ------------------- 
# Start the Server
# -------------------
if __name__ == '__main__':
    # Ensure the uploads directory exists
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(port=5000, debug=True)
