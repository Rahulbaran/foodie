import os
from flask import Flask, render_template, request
from flask_moment import Moment
from form import SearchRecipeForm
from utils import requestRecipeItem




app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
moment = Moment(app)






@app.route('/')
@app.route('/home')
def home():
    form = SearchRecipeForm()
    return render_template('index.html', title='Search Recipe', form=form)




@app.route('/getRecipe', methods=["POST"])
def getRecipe():
    recipeName = request.get_json()
    url = 'https://api.spoonacular.com/recipes/complexSearch'
    parameters = {'apiKey' : os.environ.get('FOOD_API_KEY'), 'query' : recipeName.get('recipe'), 'number' : 15}
    data = requestRecipeItem(url, parameters)
    return data




@app.route('/getIngredients', methods=["POST"])
def getIngredients():
    recipeId = request.get_json()
    url = f'https://api.spoonacular.com/recipes/{recipeId.get("id")}/ingredientWidget.json'
    parameters = {'apiKey' : os.environ.get('FOOD_API_KEY')}
    ingredients = requestRecipeItem(url, parameters)
    return ingredients



if __name__=="__main__":
    app.run(debug=False)