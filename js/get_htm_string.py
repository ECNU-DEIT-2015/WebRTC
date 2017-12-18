f = open("htm.txt")
string = ''
linecount = 0
for line in f:
    string += line.strip()
    print(line.strip())
    linecount += 1
print(string)
print(linecount)