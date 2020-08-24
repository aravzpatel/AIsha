import csv
import nltk
from csv import reader
from nltk import tokenize
from nltk.tag import pos_tag
from nltk.stem.wordnet import WordNetLemmatizer
import re, string
from nltk.corpus import stopwords

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

print(remove_noise(joy_token[0], stop_words))