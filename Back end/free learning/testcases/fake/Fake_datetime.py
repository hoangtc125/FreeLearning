class Utcnow:
    def __init__(
        self,
        timestamp=123,
    ):
        self.__timestamp = timestamp

    def timestamp(self):
        # print()
        # print("fake utcnow")
        return self.__timestamp


class Datetime:
    def __init__(
        self,
        timestamp=123,
    ):
        self.__timestamp = timestamp

    def utcnow(self):
        # print()
        # print("fake datetime")
        return Utcnow(timestamp=self.__timestamp)


if __name__ == "__main__":
    print(Datetime(123).utcnow().timestamp())
