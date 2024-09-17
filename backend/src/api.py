

from flask import Blueprint, request, jsonify, Response
from werkzeug.utils import secure_filename
import os
import cv2
import sys
import json
import logging
logging.basicConfig(level=logging.DEBUG)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from model.model import OCR_Model

api_bp = Blueprint('api', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '../static/uploads/')
RESULTS_FOLDER = os.path.join(os.path.dirname(__file__), '../static/results/')

@api_bp.route('/imageupload', methods=['POST', 'OPTIONS'])
def process_file():
    if 'file' not in request.files:
        return jsonify({'error': 'no file part'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'no selected file'})
    
    if file:
        filename = secure_filename(file.filename)
        img_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(img_path)

        # Call the OCR model to process the image
        annotated_image, text_output = OCR_Model.predict(img_path)
        
        # Save the annotated image
        annotated_image_filename = 'annotated_' + filename
        annotated_image_path = os.path.join(RESULTS_FOLDER, annotated_image_filename)
        cv2.imwrite(annotated_image_path, annotated_image)

        # Extract just the text from the OCR output
        extracted_text = [t[1] for t in text_output]
        
        # Save the extracted text to a results file
        result_txt_path = os.path.join(RESULTS_FOLDER, 'result.txt')
        with open(result_txt_path, 'w') as result_file:
            result_file.write("\n".join(extracted_text))
        
        return jsonify({
            'text': extracted_text,
            'annotated_image': annotated_image_filename
        })

@api_bp.route('/test', methods=['GET'])
def test_route():
    return "Test route is working!"