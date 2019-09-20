#!/usr/bin/env python
# coding: utf-8

import csv
import json
import os
import sys

# SAMPLE_ROOT = '/Users/wes/Desktop/eaasi-sample-data/'
# SAVE_LOCATION = '/Users/wes/Desktop/eaasi-sample-data-json/'

class CsvToJsonConverter:
    """
    Converts CSV files to JSON arrays with k-v structure where keys
    map to column names, value map to names in a CSV 'cell'
    """
    def __init__(self, sample_root, save_loc):
        self.sample_root = seample_root
        self.save_loc = save_loc

    def get_csvs_in_subdirs(self):
        """
        Recursivley finds all files ending with 'csv' in a parent directory
        """
        files = os.listdir(self.sample_root)
        all_files  = []

        for entry in files:
            full_path = os.path.join(self.sample_root, entry)

            if os.path.isdir(full_path):
                all_files += get_csvs_in_subdirs(full_path)

            elif full_path.endswith('csv'):
                all_files.append(full_path)

        return all_files

    def run(self):
        """
        Iterates through subdirectories to convert CSV files to JSON
        """
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

            except Exception as e:
                print(f"Could not convert {file} to JSON; skipping.")
                continue


if __name__ == "__main__":
    root_dir = sys.argv[1]
    save_dir = sys.argv[2]
    converter = CsvToJsonConverter(sys.argv[1], sys.argv[2])
    print(f"Root directory is: {root_dir}")
    print(f"Save directory is: {save_dir}")
    converter.run()
