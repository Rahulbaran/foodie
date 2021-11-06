import requests as req
from requests.exceptions import HTTPError, ConnectionError



def requestRecipeItem(url, parameters):
    try:
        res = req.get(url, params=parameters)
        res.raise_for_status()
    except HTTPError:
        return {'code' : 404, 'message' : 'Did not get anything'}
    except ConnectionError : 
        return {'code' : 500, 'message' : 'Something went wrong'}
    except Exception:
        return {'code' : 500, 'message' : 'Something went wrong'}
    else : 
        return res.json()