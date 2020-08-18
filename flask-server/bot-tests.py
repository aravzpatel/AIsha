import unittest
import bot


class BotTest(unittest.TestCase):

    def test_01_test_happy_response(self):
        self.assertEqual(Bot.analyse(Bot(), "Happy"), "That's great")


if __name__ == "__main__":
    unittest.main()