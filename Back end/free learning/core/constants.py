class Role:
  STUDENT = "STUDENT"
  ADMIN = "ADMIN"
  TEACHER = "TEACHER"
  SCHOOL = "SCHOOL"

class BarrierStatus:
  AUTO: str = "AUTO"

class IOType:
  IN: str = "IN"
  OUT: str = "OUT"

if __name__ == "__main__":
  print(Role.get_all())
