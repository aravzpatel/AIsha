import unittest
import bot


class BotTest(unittest.TestCase):

    def setUp(self):
        self.testBot = bot.Bot()

    def test_01_new_bot(self):
        self.assertEqual(type(self.testBot), bot.Bot) 

    def test_02_test_positive_response(self):
        self.assertIn(self.testBot.analyse("Happy")['bot_response'], self.testBot.happy_response)

    def test_03_test_negative_response(self):
        self.assertIn(self.testBot.analyse("Sad")['bot_response'], self.testBot.sad_response)  

if __name__ == "__main__":
    unittest.main()