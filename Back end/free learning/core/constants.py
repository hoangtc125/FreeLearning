class Role:
    STUDENT = "STUDENT"
    ADMIN = "ADMIN"
    TEACHER = "TEACHER"
    SCHOOL = "SCHOOL"


class Category:
    VAN =  "Literature"
    TOAN =  "Math"
    ANH =  "English"
    FREE =  "None"

if __name__ == "__main__":
    print(Role.get_all())
