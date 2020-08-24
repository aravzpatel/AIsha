import csv
import nltk
from csv import reader
from nltk import tokenize
from nltk.tag import pos_tag
from nltk.stem.wordnet import WordNetLemmatizer
import re, string
from nltk.corpus import stopwords
from nltk import FreqDist
import random
from nltk import classify
from nltk import NaiveBayesClassifier
from nltk.tokenize import word_tokenize

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


def remove_noise(tokens, stop_words = ()):

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

def get_tokens_for_model(cleaned_tokens_list):
    for tokens in cleaned_tokens_list:
        yield dict([token, True] for token in tokens)




stop_words = stopwords.words('english')
remove_list = ['not', 'no', "don't", "doesn't", "didn't", "shouldn't", "couldn't", "won't", "wouldn't", "wasn't", "can't", "aren't", "weren't",
"hadn't", "hasn't", "haven't", "isn't"]
stop_words = [word for word in stop_words if word not in remove_list]

if __name__ == "__main__":

  joy = open('./emotions/joy.csv', 'r')
  anger = open('./emotions/anger.csv', 'r')
  sadness = open('./emotions/sadness.csv', 'r')
  fear = open('./emotions/fear.csv', 'r')

  def create_tokens(raw_csv, output_token):
    with raw_csv as csvfile:
      reader = csv.reader(csvfile)
      for row in reader:
        output_token += [nltk.word_tokenize(row[0])]

  joy_token = []
  create_tokens(joy, joy_token)


  anger_token = []
  create_tokens(anger, anger_token)

 
  sadness_token = []
  create_tokens(sadness, sadness_token)

  
  fear_token = []
  create_tokens(fear, fear_token)


  joy_cleaned_tokens_list = []
  for tokens in joy_token:
      joy_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

  anger_cleaned_tokens_list = []
  for tokens in anger_token:
      anger_cleaned_tokens_list.append(remove_noise(tokens, stop_words))  
  
  sadness_cleaned_tokens_list = []
  for tokens in sadness_token:
      sadness_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

  fear_cleaned_tokens_list = []
  for tokens in fear_token:
      fear_cleaned_tokens_list.append(remove_noise(tokens, stop_words))


  joy_tokens_for_model = get_tokens_for_model(joy_cleaned_tokens_list)
  anger_tokens_for_model = get_tokens_for_model(anger_cleaned_tokens_list)
  sadness_tokens_for_model = get_tokens_for_model(sadness_cleaned_tokens_list)
  fear_tokens_for_model = get_tokens_for_model(fear_cleaned_tokens_list)

  joy_dataset = [(joy_dict, "Joy")
                  for joy_dict in joy_tokens_for_model]

  anger_dataset = [(anger_dict, "Anger")
                  for anger_dict in anger_tokens_for_model]

  sadness_dataset = [(sadness_dict, "Sadness")
                  for sadness_dict in sadness_tokens_for_model]

  fear_dataset = [(fear_dict, "Fear")
                  for fear_dict in fear_tokens_for_model]

  dataset = joy_dataset + anger_dataset + sadness_dataset + fear_dataset

  random.shuffle(dataset)

  train_data = dataset[:3067]
  test_data = dataset[3067:]

  classifier = NaiveBayesClassifier.train(train_data)
  print("Accuracy is:", classify.accuracy(classifier, test_data))

  print(classifier.show_most_informative_features(10))

  custom_message = "It's our last week and I'm scared to see what the next phase of our journey has to offer"
  custom_tokens = remove_noise(word_tokenize(custom_message))

  dist = classifier.prob_classify(dict([token, True] for token in custom_tokens))
  

  print("This is our message: " + custom_message)

  print("Outcome distribution")
  for label in dist.samples():
    print("%s: %f" % (label, dist.prob(label)))

  print("----")
  print("Overriding emotion: " + classifier.classify(dict([token, True] for token in custom_tokens)))