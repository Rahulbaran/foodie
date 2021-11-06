# [foodie](https://flask-foodie-app.herokuapp.com/) 🥮🎂🍗
* It is a recipe searching application coded👨‍💻 using flask and javascript.
* The application will show top 15 recipes (if available). 
* One can also check recipe ingredients using the `ingredients` button.

### Run the application locally
#### clone the git repo
```shell
$ git clone https://github.com/Rahulbaran/foodie.git
```

#### Install all the required python packages using `requirements.txt`
```bash
$ pip install -r requirements.txt
```

#### Install the node modules
```bash
$ npm install
```

#### Create a `.env` file in root directory & put secret key and api key inside it
```bash
$ touch .env
```

#### Activate the virtual environment
##### Mac/Linux
```bash
$ source virtual/bin/activate
```
##### Windows
```bash
$ virtual/scripts/activate.bat
```
#### Run the application
```bash
(virtual) $ export FLASK_APP=app.py
(virtual) $ export FLASK_ENV=development
(virtual) $ flask run
```

#### [website link](https://flask-foodie-app.herokuapp.com/)
