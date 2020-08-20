import unittest
import bot


class BotTest(unittest.TestCase):

    def setUp(self):
        self.testBot = bot.Bot()

    def test_01_new_bot(self):
        self.assertEqual(type(self.testBot), bot.Bot)  

    def test_02_test_positive_response(self):
        self.assertIn(self.testBot.analyse("Happy"), self.testBot.happy_response)

    def test_03_test_negative_response(self):
        self.assertIn(self.testBot.analyse("Sad"), self.testBot.sad_response) 

    def test_04_new_bot_initialized_with_conversation(self):
        self.assertEqual(self.testBot.conversation, [])

if __name__ == "__main__":
    unittest.main()