from textblob import TextBlob
import random
from training import Analysis

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

    def analyse(self, user_text):
        print("User Text:\n", user_text)
        emotion = Analysis.get_emotion(Analysis(), user_text)
        print("Emotion:\n", emotion)
        return {'user_text': user_text, 'bot_response': self.generate_response(emotion)}

    def generate_response(self, emotion): 
        if emotion == 'Joy':
            return random.choice(self.Joy)
        elif emotion == 'Sadness':
            return random.choice(self.Sad)
        elif emotion == 'Anger':
            return random.choice(self.Anger)
        elif emotion == 'Fear':
            return random.choice(self.Fear)

