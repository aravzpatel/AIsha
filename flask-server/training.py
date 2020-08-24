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

stop_words = stopwords.words('english')
remove_list = ['not', 'no', "don't", "doesn't", "didn't", "shouldn't", "couldn't", "won't", "wouldn't", "wasn't", "can't", "aren't", "weren't",
"hadn't", "hasn't", "haven't", "isn't"]
stop_words = [word for word in stop_words if word not in remove_list]


joy = open('./emotions/joy.csv', 'r')
anger = open('./emotions/anger.csv', 'r')
disgust = open('./emotions/disgust.csv', 'r')
guilt = open('./emotions/guilt.csv', 'r')
sadness = open('./emotions/sadness.csv', 'r')
shame = open('./emotions/shame.csv', 'r')
fear = open('./emotions/fear.csv', 'r')

joy_token = []
with joy as csvfile:
  reader = csv.reader(csvfile)
  for row in reader:
    joy_token += [nltk.word_tokenize(row[0])]

sadness_token = []
with sadness as csvfile:
  reader = csv.reader(csvfile)
  for row in reader:
    sadness_token += [nltk.word_tokenize(row[0])]


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


joy_cleaned_tokens_list = []
for tokens in joy_token:
    joy_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

sadness_cleaned_tokens_list = []
for tokens in sadness_token:
    sadness_cleaned_tokens_list.append(remove_noise(tokens, stop_words))


def get_all_words(cleaned_tokens_list):
    for tokens in cleaned_tokens_list:
        for token in tokens:
            yield token

def get_tokens_for_model(cleaned_tokens_list):
    for tokens in cleaned_tokens_list:
        yield dict([token, True] for token in tokens)

joy_tokens_for_model = get_tokens_for_model(joy_cleaned_tokens_list)
sadness_tokens_for_model = get_tokens_for_model(sadness_cleaned_tokens_list)

joy_dataset = [(joy_dict, "Joy")
                for joy_dict in joy_tokens_for_model]

sadness_dataset = [(sadness_dict, "Sadness")
                for sadness_dict in sadness_tokens_for_model]

dataset = joy_dataset + sadness_dataset

random.shuffle(dataset)

train_data = dataset[:1533]
test_data = dataset[1533:]

classifier = NaiveBayesClassifier.train(train_data)
print("Accuracy is:", classify.accuracy(classifier, test_data))

print(classifier.show_most_informative_features(10))

custom_message = "It's our last week and I'm excited to see what the next phase of our journey has to offer"
custom_tokens = remove_noise(word_tokenize(custom_message))

print(classifier.classify(dict([token, True] for token in custom_tokens)))