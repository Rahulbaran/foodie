import os
import requests as req
from requests import exceptions
from requests.exceptions import HTTPError, ConnectionError
from flask import Flask, render_template, request
from flask_moment import Moment
from form import SearchRecipeForm



app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(16).hex()

moment = Moment(app)





@app.route('/')
@app.route('/home')
def home():
    form = SearchRecipeForm()
    return render_template('index.html', title='Search Recipe', form=form)




def requestRecipe(name):
    url = 'https://api.spoonacular.com/recipes/complexSearch'
    try:
        res = req.get(url, params={'apiKey' : os.environ.get('FOOD_API_KEY'), 'query' : name, 'number' : 15})
        res.raise_for_status()
    except HTTPError:
        return {'code' : 404, 'message' : 'Did not get anything'}
    except ConnectionError : 
        return {'code' : 500, 'message' : 'Something went wrong'}
    except exceptions:
        return {'code' : 500, 'message' : 'Something went wrong'}
    else : 
        return res.json()

@app.route('/getRecipe', methods=["POST"])
def getRecipe():
    recipeName = request.get_json()
    data = requestRecipe(recipeName.get('recipe'))
    return data