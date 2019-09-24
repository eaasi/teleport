#!/usr/bin/env python
# coding: utf-8

"""

Creates JSON files for a collection of CSVs

Use:  python3 csv_to_json.py [root_dir] [save_dir]

where root_dir is a parent directory containing CSVs in subdirectories

"""

import csv
import json
import os
import sys

from pathlib import Path


class CsvToJsonConverter:
    """
    Converts CSV files to JSON arrays with k-v structure where keys
    map to column names, value map to names in a CSV 'cell'
    """
    def __init__(self, sample_root, save_loc):
        self.sample_root = sample_root
        self.save_loc = save_loc
        self.ok_files = []
        self.er_files = []

    def get_csvs_in_subdirs(self, path):
        """
        Recursively finds all files ending with 'csv' in a parent directory
        """
        files = os.listdir(path)
        all_files = []

        for entry in files:
            full_path = os.path.join(path, entry)

            if os.path.isdir(full_path):
                all_files += self.get_csvs_in_subdirs(full_path)

            elif full_path.endswith('csv'):
                all_files.append(full_path)

        return all_files


    def run(self):
        """
        Iterates through subdirectories to convert CSV files to JSON
        """
        for file in self.get_csvs_in_subdirs(self.sample_root):
            try:
                # try open csv file using utf-8
                with open(file, mode='r', encoding='utf8') as f:
                    self.save_json(f, file)
                    self.ok_files.append(file)

            except UnicodeDecodeError:
                # failover to latin-1 encoding - add other encs as required
                with open(file, encoding='latin-1') as f:
                    self.save_json(f, file)
                    self.ok_files.append(file)

            except Exception as e:
                print(f"Could not convert {file} to JSON; skipping.")
                self.er_files.append(file)
                continue


    def save_json(self, f, file):
        """
        Writes lines of CSV to JSON
        """
        content = f.readline()
        item_keys = content.strip().split(",")
        reader = csv.DictReader(f, fieldnames=item_keys)
        out = json.dumps([row for row in reader])

        filename = Path(file).stem
        save_path = os.path.join(self.save_loc, filename + '.json')

        print(f"Saved JSON file to: {save_path}")

        with open(save_path, 'w') as res:
            res.write(out)


if __name__ == "__main__":
    root_dir = sys.argv[1]
    save_dir = sys.argv[2]

    print(f"Root directory is: {root_dir}")
    print(f"Save directory is: {save_dir}")

    converter = CsvToJsonConverter(sys.argv[1], sys.argv[2])
    converter.run()

    if converter.ok_files:
        print(f"Converted {len(converter.ok_files)} files to JSON")

    if converter.er_files:
        print(f"Could Not Convert to JSON: \n{converter.err_files}")
