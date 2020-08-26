from textblob import TextBlob
import random
from training import Analysis
from types import SimpleNamespace

class Bot:

    Joy = [
        "That's great!", 
        "Good to hear!",
        "You're smashing it!",
        "Keep it up"
    ]
    Sad = [
        "Oh no!",
        "That's sad news",
        "Sorry to hear that",
        "Sucks for you!"
    ]

    Anger = [
        "Take a chill pill",
        "Deep breathing yo",
        "That's life LOL"
    ]
    Fear = [
        "You're right, you should be afraid",
        "Scared is waking up every morning not knowing how to feed yourself",
        "Buckle up"
    ]

    def find_highest_emotion(self, emotions):
        score = 0
        final_emotion = ''
        for emotion in emotions.__dict__:
            if emotions.__dict__[emotion] > score:
                final_emotion = emotion
                score = emotions.__dict__[emotion]
            
        return final_emotion

    def analyse(self, user_text):
        print("User Text:\n", user_text)
        emotions = Analysis.get_emotion(Analysis(), user_text)
        emotion = self.find_highest_emotion(emotions)
        print("Emotion:\n", emotion)
        return {'user_text': user_text, 'bot_response': self.generate_response(emotion), 'moodscore': vars(emotions)}

    def generate_response(self, emotion): 
        if emotion == 'Joy':
            return random.choice(self.Joy)
        elif emotion == 'Sadness':
            return random.choice(self.Sad)
        elif emotion == 'Anger':
            return random.choice(self.Anger)
        elif emotion == 'Fear':
            return random.choice(self.Fear)

