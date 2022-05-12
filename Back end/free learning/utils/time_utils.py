from datetime import datetime
from typing import Optional
from dateutil.relativedelta import relativedelta


def get_current_timestamp() -> int:
    return int(datetime.utcnow().timestamp())


def to_timestamp(timestamp: datetime) -> int:
    return int(timestamp.timestamp())


def get_timestamp_after(current_time: Optional[int] = None, **args):
    current_datetime = (
        datetime.fromtimestamp(current_time) if current_time else datetime.now()
    )
    datetime_after = current_datetime + relativedelta(**args)
    return int(datetime_after.timestamp())
