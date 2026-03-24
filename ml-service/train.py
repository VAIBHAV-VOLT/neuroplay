import mysql.connector
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
from utils import preprocess_row
from dotenv import load_dotenv
import os

load_dotenv()

# DB CONNECTION
conn = mysql.connector.connect(
    host= os.getenv("DB_HOST"),
    user= os.getenv("DB_USER"),
    password= os.getenv("DB_PASSWORD"),
    database= os.getenv("DB_NAME")
)

query = """
SELECT m.*, g.user_id, g.game_type
FROM metrics m
JOIN game_sessions g ON m.session_id = g.id
"""

df = pd.read_sql(query, conn)

# GLOBAL BASELINE
baseline = {
    "typing_speed": df['typing_speed'].mean(),
    "error_rate": df['error_rate'].mean(),
    "reaction_time": df['reaction_time'].mean()
}

# FEATURE + LABEL
X = []
y = []

for _, row in df.iterrows():
    features = preprocess_row(row, baseline)

    # PSEUDO LABEL
    if features[0] > 0.3:
        label = 2
    elif features[0] > 0.15:
        label = 1
    else:
        label = 0

    X.append(features)
    y.append(label)

# TRAIN MODEL
model = RandomForestClassifier(n_estimators=100)
model.fit(X, y)

# SAVE MODEL
joblib.dump(model, "model.pkl")

print("Model trained and saved!")