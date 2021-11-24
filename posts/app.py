from flask import Flask
from flask import request
from flask import jsonify
import os
import binascii
import requests as http

app = Flask(__name__)

posts = dict()


@app.route('/', methods=['GET'])
def getPosts():
    return jsonify(posts)


@app.route('/<post>', methods=['GET'])
def getPost(post):
    try:
        return jsonify(posts[post])
    except KeyError:
        return 'Post not found', 404


@app.route('/', methods=['POST'])
def create():
    id = binascii.b2a_hex(os.urandom(5)).decode('utf-8')
    posts[id] = {
        'title': request.json['title'],
        'id': id
    }

    http.post(f'http://localhost:5001/posts/{id}/comments', json={'post': id})

    return jsonify(posts[id]), 201


if __name__ == '__main__':
    app.run(debug=True)
