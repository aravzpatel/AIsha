from textblob import TextBlob
import random

class Bot:

    happy_response = [
        "That's great!", 
        "Good to hear!",
        "You're smashing it!",
        "Keep it up"
    ]
    sad_response = [
        "Oh no!",
        "That's sad news",
        "Sorry to hear that",
        "Sucks for you!"
    ]
    def analyse(self, user_text):
        print("User Text:\n", user_text)
        polarity = TextBlob(user_text).sentiment.polarity
        print("Polarity:\n", polarity)
        return {'user_text': user_text, 'bot_response': self.generate_response(polarity)}

    def generate_response(self, polarity): 
        if polarity == 0:
            return "Please provide a different answer"
        elif polarity > 0:
            return random.choice(self.happy_response)
        else:
            return random.choice(self.sad_response)

