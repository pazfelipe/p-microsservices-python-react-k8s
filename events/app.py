from flask import Flask
from flask_cors import CORS
from flask import request
import requests as http

app = Flask(__name__)
CORS(app)

events = dict()


@app.route('/events', methods=['POST'])
def create():
    try:
        eventType = request.json['type']
        content = request.json['content']

        eventContent = {
            'type': eventType,
            'data': content
        }

        events.update(eventContent)

        http.post('http://localhost:5000/events', json=eventContent)
        http.post('http://localhost:5001/events', json=eventContent)
        http.post('http://localhost:5003/events', json=eventContent)

        return '', 204
    except Exception as e:
        return str(e), 400


if __name__ == '__main__':
    app.run(debug=True)
