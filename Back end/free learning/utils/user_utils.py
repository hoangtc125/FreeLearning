

def to_response_dict_user(user) -> dict:
  return {
    "fullname": user["fullname"],
    "email": user["email"],
    "password": user["password"]
  }