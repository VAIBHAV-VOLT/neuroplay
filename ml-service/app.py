from fastapi import FastAPI
import mysql.connector
from predict import predict
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv()

# DB CONNECTION
def get_db():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=3306
    )

@app.post("/predict")
def get_prediction(user_id: int):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    # GET LATEST DATA
    cursor.execute("""
        SELECT m.*, g.user_id
        FROM metrics m
        JOIN game_sessions g ON m.session_id = g.id
        WHERE g.user_id = %s
        ORDER BY g.created_at DESC
        LIMIT 1
    """, (user_id,))
    
    row = cursor.fetchone()

    # COUNT GAMES
    cursor.execute("SELECT COUNT(*) as total FROM game_sessions WHERE user_id = %s", (user_id,))
    total_games = cursor.fetchone()['total']

    # BASELINE LOGIC
    if total_games < 5:
        baseline = {
            "typing_speed": 50,
            "error_rate": 0.15,
            "reaction_time": 350
        }
    else:
        cursor.execute("""
            SELECT AVG(typing_speed) as typing_speed,
                   AVG(error_rate) as error_rate,
                   AVG(reaction_time) as reaction_time
            FROM metrics m
            JOIN game_sessions g ON m.session_id = g.id
            WHERE g.user_id = %s
        """, (user_id,))
        baseline = cursor.fetchone()

    result = predict(row, baseline)

    # STORE RESULT
    cursor.execute("""
        INSERT INTO burnout_scores (user_id, score, status)
        VALUES (%s, %s, %s)
    """, (user_id, result['score'], result['status']))
    
    conn.commit()

    return result