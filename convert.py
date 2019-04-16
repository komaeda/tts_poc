from textgrid import TextGrid
import json

tg = TextGrid()
tg.read("./temp.TextGrid")
data = []

for i in tg.getFirst("words"):
  data.append({"begin": str(i.minTime), "end": str(i.maxTime), "word": i.mark})

with open('out.json', 'w') as outfile:
  json.dump(data, outfile)
