import os
import importlib

import pytest

testcases_dir = "testcases"


def get_immediate_subdirectories(a_dir):
    return [
        name
        for name in os.listdir(a_dir)
        if os.path.isdir(os.path.join(a_dir, name)) and name.endswith("router")
    ]


def get_list_of_files(dirName):
    listOfFile = os.listdir(dirName)
    allFiles = list()
    for entry in listOfFile:
        fullPath = os.path.join(dirName, entry)
        if os.path.isdir(fullPath):
            allFiles = allFiles + get_list_of_files(fullPath)
        else:
            allFiles.append(fullPath)

    return allFiles


def get_tree_testcases():
    PATHS = {}
    ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
    testcases_path = os.path.split(ROOT_DIR)[0]
    folder_paths = get_immediate_subdirectories(testcases_path + "/" + testcases_dir)
    for folder_path in folder_paths:
        PATHS[folder_path] = []
        parent = testcases_path + "/" + testcases_dir + "/" + folder_path + "/"
        files_path = get_list_of_files(parent)
        for file_path in files_path:
            if "__init__" in file_path:
                continue
            list_file_name = file_path.split("/")
            PATHS[folder_path].append(
                list_file_name[len(list_file_name) - 1].split(".")[0]
            )
    return PATHS


def pytest_addoption(parser):
    parser.addoption("--files", action="store")
    parser.addoption("--folders", action="store")
    parser.addoption("--excludes", action="store")


def append_path(paths, _folder, _file):
    new_path = testcases_dir + "." + _folder + "." + _file
    if new_path not in paths:
        paths.append(new_path)


def generate_path(folders=None, files=None):
    PATHS = get_tree_testcases()
    paths = []
    if not folders and not files:
        for _folder, _files in PATHS.items():
            for _file in _files:
                append_path(paths, _folder, _file)
    elif not files:
        for _folder, _files in PATHS.items():
            for folder in folders:
                if folder not in _folder:
                    continue
                for _file in _files:
                    append_path(paths, _folder, _file)
    else:
        for _folder, _files in PATHS.items():
            if (
                folders and any([(folder in _folder) for folder in folders])
            ) or not folders:
                for file in files:
                    for _file in _files:
                        if file not in _file:
                            continue
                        append_path(paths, _folder, _file)
    return paths


def pytest_generate_tests(metafunc):
    testcases = []
    files = None
    folders = None
    if metafunc.config.getoption("files"):
        name_files = metafunc.config.option.files
        files = name_files.split("+")
    if metafunc.config.getoption("folders"):
        name_folders = metafunc.config.option.folders
        folders = name_folders.split("+")
    paths = generate_path(folders, files)
    for path in paths:
        testcase = importlib.import_module(path).TEST_CASE
        for name_test, data_test in testcase.items():
            data_test["NAME"] = name_test
            testcases.append(data_test)
    if metafunc.config.getoption("excludes"):
        excludes_attr = metafunc.config.option.excludes
        for _testcase in testcases:
            _testcase["COMPARISON_EXCLUDE"] = excludes_attr.split("+")
    tcs = []
    metafunc.parametrize("testcase", testcases)


if __name__ == "__main__":
    for item in generate_path():
        print(item)
