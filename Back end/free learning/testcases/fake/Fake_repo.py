class Repo:
    def __init__(
        self,
        return_get_one_by_field=None,
        return_get_one_by_id=None,
        return_get_all={},
        return_get_page={},
        return_insert_one={},
        return_update="1",
        return_delete=None,
        return_update_one_by_field=[],
    ) -> None:
        self.__return_get_one_by_field = return_get_one_by_field
        self.__return_get_one_by_id = return_get_one_by_id
        self.__return_get_all = return_get_all
        self.__return_get_page = return_get_page
        self.__return_insert_one = return_insert_one
        self.__return_update = return_update
        self.__return_delete = return_delete
        self.__return_update_one_by_field = return_update_one_by_field

    async def insert_one(self, obj=None, custom_id=None):
        value = self.__return_insert_one
        # print()
        # print("fake insert_one")
        return common_return(value)

    async def update(self, doc_id=None, obj=None):
        value = self.__return_update
        # print()
        # print("fake update")
        return common_return(value)

    async def delete(self, doc_id=None, obj=None):
        value = self.__return_delete
        # print()
        # print("fake delete")
        return common_return(value)

    async def get_one_by_field(self, field=None, value=None):
        value = self.__return_get_one_by_field
        # print()
        # print("fake get_one_by_field")
        return common_return(value=value)

    async def get_one_by_id(self, id=None):
        value = self.__return_get_one_by_id
        # print()
        # print("fake get_one_by_id")
        return common_return(value)

    async def get_all(self, filter=None):
        value = self.__return_get_all
        # print()
        # print("fake get_all")
        return common_return(value)

    async def get_page(self, page=None, size=None, filter=None):
        value = self.__return_get_page
        # print()
        # print("fake get_page")
        return common_return(value)

    async def update_one_by_field(self, lst_obj=[], custom_id=None):
        value = self.__return_update_one_by_field
        # print()
        # print("fake update_one_by_field")
        return common_return(value)


def common_return(value):
    if isinstance(value, Exception):
        raise Exception()
    if isinstance(value, dict) and ("multi_called" in value.keys()):
        return_value = value["multi_called"].pop(0)
        return return_value
    return value
