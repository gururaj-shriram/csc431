"""
name: sample-data-gen.py
modified last by: jerry
date last modified: 30 apr 2018

generates random multimedia references for database; probably won't need to run
this script again, but here for research   
"""
import random
from itertools import combinations

CONSTRUCCION_LEN = 2388
TERRENO_LEN = 1465
WORKSHOP_LEN = 223
MULTIMEDIA_LEN = 6
DELIMITER = "	"

sizes_list = [CONSTRUCCION_LEN, TERRENO_LEN, WORKSHOP_LEN]
list_names = ["construccion", "terreno", "workshop"]
combinations_dict = {}
out = ""

# list from 1 to 6 
multimedia_list = [i for i in range(1,7)] 

# get all combinations
for i in range(4):
    combinations_dict[i] = list(combinations(multimedia_list, i))

for size_index in range(len(sizes_list)):
    id_value = 1
    for i in range(1,sizes_list[size_index]+1):
        # number of media this id should have
        num_media = random.randint(0,3)
        for media_id in random.choice(combinations_dict[num_media]):
            out += str(id_value) + DELIMITER + str(media_id) + DELIMITER \
                + str(i) + DELIMITER + list_names[size_index] + "\n"
            id_value += 1

            
with open("multimedia_to_layer.data", "w") as file:
    file.write(out)
    file.close()