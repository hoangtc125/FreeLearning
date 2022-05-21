class Role:
    STUDENT = "STUDENT"
    ADMIN = "ADMIN"
    TEACHER = "TEACHER"
    SCHOOL = "SCHOOL"


class Category:
    VAN =  "văn"
    TOAN =  "toán"
    ANH =  "anh"
    FREE =  "free"

if __name__ == "__main__":
    print(Role.get_all())
