from flask import Blueprint, request, jsonify
from flask import Blueprint, request, jsonify
from app.models.report import Report
from app import db

report_bp = Blueprint('report', __name__)

@report_bp.route('/submit_report', methods=['POST'])
def submit_report():
    data = request.get_json()

    # Validate required fields
    required_fields = ['user_id', 'item_name', 'description', 'category']
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    # Extracting report data
    user_id = data['user_id']
    item_name = data['item_name']
    description = data['description']
    category = data['category']

    # Create and store the report
    report = Report(
        user_id=user_id,
        item_name=item_name,
        description=description,
        category=category
    )
    db.session.add(report)
    db.session.commit()

    return jsonify({"message": "Report submitted successfully!"}), 201
from app import db

report_bp = Blueprint('report', __name__)

@report_bp.route('/submit_report', methods=['POST'])
def submit_report():
    data = request.get_json()

    # Extracting report data
    user_id = data.get('user_id')
    item_name = data.get('item_name')
    description = data.get('description')
    category = data.get('category')

    # Insert into database
    report = Report(user_id=user_id, item_name=item_name, description=description, category=category)
    db.session.add(report)
    db.session.commit()

    return jsonify({"message": "Report submitted successfully!"}), 201
