# # Cách viết testcase cho API

## 1. Tạo file

File cần tạo trong folder **testcases/_router/**

## 2. Viết testcase

 - [ ] Tạo *dict* có tên **TEST_CASE** với *key* là tên *testcase* và *value* là nội dung của *testcase*

 - [ ] Ví dụ:

    > TEST_CASE['EXAMPLE_NAME'] = {
    >     'INPUT':{
    >         param1:value1,
    >         param2:value2,
    >         ...
    >     },
    >     'MOCK':[
    >         {
    >             'path':'app.service.account_service.get_repo',
    >             'return_value':Repo(
    >                 return_insert_one="1",
    >                 return_get_one_by_id={
    >                     'multi_called':[
    >                         (
    >                             "1", VALUE1
    >                         ),
    >                         (
    >                             "2", VALUE2
    >                         ),
    >                         ...
    >                     ]
    >                 },
    >                 ...
    >             )
    >         }
    >     ],
    >     'OUTPUT':Exception() / success_response(date=None), 
    >     'FUNCTION':example_api,
    > }

## 3. Chạy testcase

Tại *command-line* của *project*, chạy câu lệnh:

>   pytest [-p no warnings] [-vv] [-s] [--folders param1[+pram2+...]] [--files param1[+param2+...]] [--excludes param1[+param2+...]

với:

	 [-p no warnings] sẽ bỏ qua warnings của pytest
	 [-vv] hiển thị kết quả chạy chi tiết của testcase
	 [-s] hiển thị chi tiết thông tin khi chạy testcase
	 [--folders] xác định folders testcase sẽ chạy
	 [--files] xác định files testcase sẽ chạy
	 [--excludes] không so sánh thuộc tính được liệt kê