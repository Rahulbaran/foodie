from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.fields.simple import SubmitField
from wtforms.validators import DataRequired



class SearchRecipeForm(FlaskForm):
    recipeName = StringField(validators=[DataRequired()])
    submit = SubmitField('Search')