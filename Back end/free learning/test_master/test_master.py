import pytest
from typing import TypeVar
from pydantic import BaseModel

T = TypeVar("T")


def get_dict_from_testing_result(object: T, COMPARITION_EXCLUDE: list = []):
    res = {}
    data = object if type(object) is dict else object.__dict__
    for attr in COMPARITION_EXCLUDE:
        if attr in data.keys():
            data.pop(attr)
    for key, value in data.items():
        if value == None:
            continue
        if isinstance(value, BaseModel):
            res[key] = get_dict_from_testing_result(value, COMPARITION_EXCLUDE)
        elif type(value) is not dict:
            res[key] = value
        elif len(value.keys()) == 0:
            continue
        else:
            res[key] = get_dict_from_testing_result(value, COMPARITION_EXCLUDE)
    return res


@pytest.mark.asyncio
async def test_master(
    testcase,
    mocker,
):
    for item in testcase["MOCK"]:
        mocker.patch(item["path"], return_value=item["return_value"])
    print(testcase["FUNCTION"].__name__, testcase["NAME"])
    if isinstance(testcase["OUTPUT"], Exception):
        with pytest.raises(testcase["OUTPUT"].__class__) as exception:
            await testcase["FUNCTION"](*testcase["INPUT"].values())
        print(exception.__dict__["_excinfo"])
    else:
        resutl = await testcase["FUNCTION"](*testcase["INPUT"].values())
        if "COMPARISON_EXCLUDE" in testcase.keys():
            assert get_dict_from_testing_result(
                resutl, testcase["COMPARISON_EXCLUDE"]
            ) == get_dict_from_testing_result(
                testcase["OUTPUT"], testcase["COMPARISON_EXCLUDE"]
            )
        else:
            assert (
                resutl == testcase["OUTPUT"]
            ), "a few values are realtime so not equal while testing"
