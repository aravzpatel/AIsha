import csv
import nltk
from csv import reader
from nltk import tokenize

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

print(joy_token[0])
