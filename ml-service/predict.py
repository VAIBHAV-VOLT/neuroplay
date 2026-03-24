import joblib
from utils import preprocess_row

model = joblib.load("model.pkl")

def predict(data, baseline):
    X = [preprocess_row(data, baseline)]
    pred = model.predict(X)[0]

    if pred == 0:
        return {"score": 20, "status": "Healthy"}
    elif pred == 1:
        return {"score": 50, "status": "Moderate"}
    else:
        return {"score": 80, "status": "High Burnout"}