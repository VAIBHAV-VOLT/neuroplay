def compute_deviation(current, baseline):
    if baseline == 0 or baseline is None:
        return 0
    return (baseline - current) / baseline


def preprocess_row(row, baseline):
    return [
        compute_deviation(row['typing_speed'], baseline['typing_speed']),
        compute_deviation(row['error_rate'], baseline['error_rate']),
        compute_deviation(row['reaction_time'], baseline['reaction_time']),
        row.get('focus_score', 0) or 0,
        row.get('pattern_accuracy', 0) or 0,
        encode_mood(row.get('mood_type', 'sunny'))
    ]


def encode_mood(mood):
    mood_map = {
        "sunny": 0,
        "cloudy": 0.3,
        "rainy": 0.7,
        "storm": 1
    }
    return mood_map.get(mood, 0)