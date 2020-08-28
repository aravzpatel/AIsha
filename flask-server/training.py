import csv, nltk, re, string, random
from csv import reader
from nltk import tokenize, classify, NaiveBayesClassifier
from nltk.tag import pos_tag
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from datetime import datetime
from types import SimpleNamespace
import json
from nltk import everygrams
import pickle

class Analysis:
  def lemmatize_sentence(tokens):
      lemmatizer = WordNetLemmatizer()
      lemmatized_sentence = []
      for word, tag in pos_tag(tokens):
          if tag.startswith('NN'):
              pos = 'n'
          elif tag.startswith('VB'):
              pos = 'v'
          else:
              pos = 'a'
          lemmatized_sentence.append(lemmatizer.lemmatize(word, pos))
      return lemmatized_sentence

  def clean_stop_words(self):
    stop_words = stopwords.words('english')
    
    remove_list = ['not', 'no', "don't", "doesn't", "didn't", "shouldn't", "couldn't", "won't", "wouldn't", "wasn't", "can't", "aren't", "weren't",
    "hadn't", "hasn't", "haven't", "isn't"]
    cleaned_stop_words = [word for word in stop_words if word not in remove_list]
    
    return cleaned_stop_words

  def remove_noise(self, tokens):
    stop_words = self.clean_stop_words()
    
    cleaned_tokens = []

    for token, tag in pos_tag(tokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'\
                      '(?:%[0-9a-fA-F][0-9a-fA-F]))+','', token)
        token = re.sub(r'[^\w]','', token)
        token = re.sub("(@[A-Za-z0-9_]+)","", token)
        token = re.sub("á","", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) > 0 and token not in string.punctuation and token.lower() not in stop_words:
            cleaned_tokens.append(token.lower())

    return cleaned_tokens

  def get_all_words(cleaned_tokens_list):
      for tokens in cleaned_tokens_list:
          for token in tokens:
              yield token

  def get_tokens_for_model(self, cleaned_tokens_list, n=2):
    for tokens in cleaned_tokens_list:
      ngram_vocab = everygrams(tokens, 1, n)
      yield dict([ng, True] for ng in ngram_vocab)

    # ngram_vocab = ngrams(cleaned_tokens_list, n)
    # for tokens in ngram_vocab:
    #   yield dict([token, True] for token in tokens)

      # for tokens in cleaned_tokens_list:
      #     ngrams = dict([token, True] for token in tokens + ngrams(tokens, 1))
      #     return ngrams

  def get_ngrams_for_model(self, cleaned_tokens_list, n=4):
    ngram_vocab = ngrams(cleaned_tokens_list, n)
    for tokens in ngram_vocab:
          yield dict([token, True] for token in tokens)

  def create_tokens(self, raw_csv, output_token):
      with raw_csv as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
          output_token += [nltk.word_tokenize(row[0])]

  def process_data(self):
    joy = open('./emotions/joy.csv', 'r')
    anger = open('./emotions/anger.csv', 'r')
    sadness = open('./emotions/sadness.csv', 'r')
    fear = open('./emotions/fear.csv', 'r')

    joy_token = []
    self.create_tokens(joy, joy_token)

    anger_token = []
    self.create_tokens(anger, anger_token)
  
    sadness_token = []
    self.create_tokens(sadness, sadness_token)
    
    fear_token = []
    self.create_tokens(fear, fear_token)

    joy_cleaned_tokens_list = []
    for tokens in joy_token:
        joy_cleaned_tokens_list.append(self.remove_noise(tokens))

    anger_cleaned_tokens_list = []
    for tokens in anger_token:
        anger_cleaned_tokens_list.append(self.remove_noise(tokens))  
    
    sadness_cleaned_tokens_list = []
    for tokens in sadness_token:
        sadness_cleaned_tokens_list.append(self.remove_noise(tokens))

    fear_cleaned_tokens_list = []
    for tokens in fear_token:
        fear_cleaned_tokens_list.append(self.remove_noise(tokens))

    joy_tokens_for_model = self.get_tokens_for_model(joy_cleaned_tokens_list)
    anger_tokens_for_model = self.get_tokens_for_model(anger_cleaned_tokens_list)
    sadness_tokens_for_model = self.get_tokens_for_model(sadness_cleaned_tokens_list)
    fear_tokens_for_model = self.get_tokens_for_model(fear_cleaned_tokens_list)

    joy_dataset = [(joy_dict, "Joy")
                    for joy_dict in joy_tokens_for_model]

    anger_dataset = [(anger_dict, "Anger")
                    for anger_dict in anger_tokens_for_model]

    sadness_dataset = [(sadness_dict, "Sadness")
                    for sadness_dict in sadness_tokens_for_model]

    fear_dataset = [(fear_dict, "Fear")
                    for fear_dict in fear_tokens_for_model]
    
    dataset = joy_dataset + anger_dataset + sadness_dataset + fear_dataset

    with open('data.pickle', 'wb') as f:
      pickle.dump(dataset,f)

    random.shuffle(dataset)
  
  @staticmethod
  def get_emotion(self, message):
    with open('shuffled_data.pickle', 'rb') as f:
        dataset = pickle.load(f)

    train_data = dataset[:3067]
    test_data = dataset[3067:]
    
    classifier = NaiveBayesClassifier.train(train_data)

    custom_tokens = self.remove_noise(word_tokenize(message))

    custom_ngram = everygrams(custom_tokens, 1, 4)

    score = classifier.prob_classify(dict([token, True] for token in custom_ngram))

    score.percentages = SimpleNamespace()
    for label in score.samples():
        setattr(score.percentages, label, score.prob(label))
    
    print(nltk.classify.accuracy(classifier, test_data))

    print(score.percentages)
    
    return score.percentages