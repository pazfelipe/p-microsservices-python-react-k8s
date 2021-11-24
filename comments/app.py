from flask import Flask
from flask import request
from flask import jsonify
import os
import binascii
import requests as http
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

comments = dict()


@app.route('/posts/<post_id>/comments', methods=['GET'])
def getPost(post_id):
    post = list()
    try:
        if comments.__len__() > 0:
            if post_id in comments:
                post.append(comments[post_id]['comments'])
        else:
            return '', 204

        return jsonify(post[0])

    except KeyError:
        return 'Comment not found', 404


@app.route('/posts/<post_id>/comments', methods=['POST'])
def create(post_id):

    id = binascii.b2a_hex(os.urandom(5)).decode('utf-8')

    content = request.json
    content = content.get('content')

    comment = {
        'content': content,
        'id': id,
    }

    if post_id in comments:
        cs = comments[post_id]
        if cs['comments'].__len__() == 1 and cs['comments'][0]['content'] == None:
            cs['comments'][0]['content'] = content
        else:
            cs['comments'].append(comment)

    else:
        comments[post_id] = {'comments': [comment]}

    return jsonify(comment), 201


if __name__ == '__main__':
    app.run(debug=True)
