from csv import reader
import csv

fieldnames = ['SIT', 'TARGET']

joyFile = open('./emotions/joy.csv', "w")
joyWriter = csv.DictWriter(joyFile, fieldnames = fieldnames)

fearFile = open('./emotions/fear.csv', "w")
fearWriter = csv.DictWriter(fearFile, fieldnames = fieldnames)

angerFile = open('./emotions/anger.csv', "w")
angerWriter = csv.DictWriter(angerFile, fieldnames = fieldnames)

sadnessFile = open('./emotions/sadness.csv', "w")
sadnessWriter = csv.DictWriter(sadnessFile, fieldnames = fieldnames)

disgustFile = open('./emotions/disgust.csv', "w")
disgustWriter = csv.DictWriter(disgustFile, fieldnames = fieldnames)

shameFile = open('./emotions/shame.csv', "w")
shameWriter = csv.DictWriter(shameFile, fieldnames = fieldnames)

guiltFile = open('./emotions/guilt.csv', "w")
guiltWriter = csv.DictWriter(guiltFile, fieldnames = fieldnames)

with open('./emotions/isear.csv', 'r') as read_obj:
  csv_reader = csv.reader(read_obj, delimiter="|")
  for row in csv_reader:
    if row[36] == 'joy':
      joyWriter.writerow({'SIT': row[40], 'TARGET': row[36]})
    elif row[36] == 'fear':
      fearWriter.writerow({'SIT': row[40], 'TARGET': row[36]})
    elif row[36] == 'anger':
      angerWriter.writerow({'SIT': row[40], 'TARGET': row[36]})
    elif row[36] == 'sadness':
      sadnessWriter.writerow({'SIT': row[40], 'TARGET': row[36]})
    elif row[36] == 'disgust':
      disgustWriter.writerow({'SIT': row[40], 'TARGET': row[36]})
    elif row[36] == 'shame':
      shameWriter.writerow({'SIT': row[40], 'TARGET': row[36]})
    elif row[36] == 'guilt':
      guiltWriter.writerow({'SIT': row[40], 'TARGET': row[36]})