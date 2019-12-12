Để chạy chương trình thì máy tính phải cài đặt 
```
npm
node
mongo
```
và cài đặt trong tiện ích mở rộng của trình duyệt: *"React Developer Tool"*
 


# Cài đặt backend và Frontend 

# Cài đặt Server Backend
1. 
```
git clone 
```

2. Sau khi tải về
```
cd 13_hieunk
```
3. Cài đặt thư viện và package
```
npm i 
```
4. Sau khi cài đặt thành công, khởi động server 
```
nodemon
or
node .
or 
npm start
```
5. Cổng của server sẽ là http://localhost:3000

# Import database

1. Download và cài đặt mongodb 
2. Tải  và cài đặt Sudio3T link: https://studio3t.com/download/
3.  Sau khi tải về, chọn connect sau đó chọn *Add DataBase..*
4. Tạo database tên BookStore 
5. Nhấn vào tên database chọn Import Collections, sau đó chọn formart JSON nhấn OK
6. Nhấn " + " và chọn  các file .json trong thư mục *database* trong source code
7. Sau khi chọn xong hết các file nhấn Execute để import dữ liệu
8. Chọn vào database sau đó chọn vào icon Users, chọn Add..
9. Nhập Name: "nhom13thayhieunk" và password: "123456"
10. Nhấn Grant Roles chon các roles: { dbAdmin, dbOwner, read, readWrite, userAdmin } ấn Grant 
11. Chọn Add User 
12. Copy đoạn code sau vào file server/datasource.json
```
{
  "mydb": {
      "host": "localhost",
      "port": 27017,
      "url":  "",
      "database": "BookStore",
      "password": "123456",
      "name": "mydb",
      "user": "nhom13thayhieunk",
      "connector": "mongodb"
  },
  "emailDs": {
    "name": "emailDs",
    "connector": "mail",
    "transports": [
      {
        "type": "smtp",
        "host": "smtp.gmail.com",
        "secure": true,
        "port": 465,
        "tls": {
          "rejectUnauthorized": false
        },
        "auth": {
          "user": "project1.20181k61@gmail.com",
          "pass": "project1baochay"
        }
      }
    ]
  }
}

```

# Cài đặt Phần web FrontEnd cho admin 
tương tự như phần cài đặt server tới bước thứ 2

3. Tới thư mục client-admin 
```
cd client-admin
```
4. Cài đặt các thư viện và package
```
npm i 
```
5. Sau khi đã cài đặt thành công vào khởi động server Frontend cho Admin 
```
npm start
```
6. Vào địa chỉ http://localhost:1111 để truy cập vào phần cho admin

# Cài đặt phần giao diện cho User 
tương tự như phần cài đặt server tới bước thứ 2
3. Tới thư mục client-src
```
cd client-src
```
4. Cài đặt các thư viện và package
```
npm i 
```
5. Sau khi đã cài đặt thành công vào khởi động server Frontend của web 
```
npm start
```
6. Vào địa chỉ http://localhost:3001 để truy cập vào trang web BookStore


