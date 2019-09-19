#!/usr/bin/env python
# coding: utf-8

import csv
import json
import os

SAMPLE_ROOT = '/Users/wes/Desktop/eaasi-sample-data/'
SAVE_LOCATION = '/Users/wes/Desktop/eaasi-sample-data-json/'

def get_csvs_in_subdirs(path):
    """
    Recursivley finds all files ending with 'csv' in a parent directory
    """
    files = os.listdir(path)
    all_files  = []

    for entry in files:
        full_path = os.path.join(path, entry)

        if os.path.isdir(full_path):
            all_files += get_csvs_in_subdirs(full_path)

        elif full_path.endswith('csv'):
            all_files.append(full_path)

    return all_files

for file in get_csvs_in_subdirs(SAMPLE_ROOT):
    try:
        # try open csv file using utf-8
        with open(file, mode='r', encoding='utf8') as f:
            content = f.readline()
            item_keys = content.strip().split(",")
            reader = csv.DictReader(f, fieldnames=item_keys)
            out = json.dumps([row for row in reader])

            with open(file.split('.csv')[0] + ".json", 'w') as res:
                res.write(out)

    except UnicodeDecodeError:
        # failover to latin-1 encoding
        # add other failover encodings as required
        with open(file, encoding='latin-1') as f:
            content = f.readline()
            item_keys = content.strip().split(",")
            reader = csv.DictReader(f, fieldnames=item_keys)
            out = json.dumps([row for row in reader])

            with open(file.split('.csv')[0] + ".json", 'w') as res:
                res.write(out)

