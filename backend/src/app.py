from flask import Flask
from flask_cors import CORS
from api import api_bp  # Import the API blueprint

app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/api/": {"origins": ["*"]}})

# Register the API blueprint with the URL prefix '/api'
app.register_blueprint(api_bp, url_prefix='/api')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8080)
