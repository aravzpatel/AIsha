import random
from training import Analysis
from types import SimpleNamespace

class Bot:

    Joy = [
        "I'm detecting joy. That's great! Try to think about what events in your day are making you feel this way. You might want to incorporate more of these activities into your lifestyle going forward!", 
        "I'm detecting joy. Good to hear! Perhaps there are positive thoughts you are having today that are influencing this? The impact of positive thoughts is great to be aware of! ",
        "I'm detecting joy. I hope this feeling continues for you!",
        "I'm detecting joy. Keep it up!"]
    Sad = [
        "I'm detecting some sadness. It can be helpful to reflect on what events in your day or thought processes might be contributing to this emotion. I hope tomorrow is better for you!",
        "I'm detecting some sadness. Sorry to hear! It can be good to do something you enjoy to lift your mood. Perhaps take some time to treat yourself. ",
        "I'm detecting some sadness. Down days happen to us all! Perhaps check out your graph to see that positive times are possible!",
        "I'm detecting some sadness. Talking about your emotions with people you trust is a great way of letting go of negative emotions"
    ]
    Anger = [
        "I'm detecting that you are holding some anger. It could be good to take a timeout, step away from whatever you're doing, go for a walk get some fresh air and come back",
        "I can sense some anger in your emotions. Did you know that exercise is a proven way to reduce anger? Can you fit some into your day?",
        "Is something making you feel anger? Can you identify what is causing your frustration and approach the person to find a solution - you never know how helpful people can be."
    ]
    Fear = [
        "I can sense you are feeling some anxiety, exercise can be a good way to help take you mind off this.",
        "I can sense you are feeling some anxiety, try to avoid too much caffeine during this time to help feel calmer.",
        "I can sense you are feeling some anxiety, yoga and meditation can be helpful tools to reduce this.", 
        "I can sense you are feeling some anxiety, it can help to drop your shoulders and breathe deeply to feel calmer."
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

