from flask import Flask
from flask_cors import CORS
from flask import request
from flask import jsonify
import os
import binascii
import requests as http

app = Flask(__name__)
CORS(app)

posts = dict()


@app.route('/events', methods=['POST'])
def events():
    eventType = request.json['type']
    content = request.json['data']

    if eventType == 'PostCreated':
        posts[content[id]] = {'comments': []}

    if eventType == 'CommentCreated':

        if not posts.get(content['post']):
            posts[content['post']] = {'comments': []}

        comments = posts[content['post']]['comments']
        comments.append(dict(content))

        posts[content['post']]['comments'] = comments

    if eventType == 'CommentUpdated':
        posts[content['post']]['comments'][content['id']] = content['content']

    print(posts)
    return '', 204


@app.route('/<post>', methods=['GET'])
def getPost(post):
    try:
        return jsonify(posts[post])
    except KeyError:
        return 'Post not found', 404


if __name__ == '__main__':
    app.run(debug=True)
