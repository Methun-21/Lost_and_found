from app import create_app, db

# Create the app context and initialize the database
app = create_app()

with app.app_context():
    db.create_all()
    print("✅ Database tables created successfully.")
