#!/usr/bin/env python
# coding: utf-8

"""
Unit Tests
csv_to_json.py
"""

import os
import mock
from csv_to_json import CsvToJsonConverter

@mock.patch('os.listdir', mock.MagicMock(return_value=
    ['file1.xml', 'file2.csv', 'file3.csv', 'foo.jpg']))
@mock.patch('os.path.isdir', mock.MagicMock(return_value=False))
def test_get_csvs_in_subdir():
    sut = CsvToJsonConverter('root', 'save_loc')
    all_files = sut.get_csvs_in_subdirs('some_path')
    assert all_files == ['some_path/file2.csv', 'some_path/file3.csv']
