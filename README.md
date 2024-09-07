# Cấu trúc thư mục
```
+-- changelog        // Script thay đổi liên quan đến dữ liệu db
|   +-- R06.09.2024        // Thư mục chứa từng phiên bản changlelog R1, R2, R3, ...
|   |   +-- nhat_1.sql        // File sql để chạy thay đổi dữ liệu db => Khi chạy sẽ gộp tất cả file làm 1 và chạy
|   |   +-- thanh_2.sql
|   +-- ...
+-- public        // Lưu chữ dữ liệu static: icon, image, css
|   +-- css
|   |   +-- admin      // file css của phần admin
|   |   +-- customer      // file css của phần khách hàng
|   +-- images
|   +-- icons
|   +-- js        // Lưu trữ file js sử dụng cho views
|   |   +-- admin      // file js của phần admin
|   |   +-- customer      // file js của phần khách hàng
+-- src        // Lưu trữ code chính của dự án
|   +-- admin        // Lưu trữ controller, view cho trang admin
|   |   +-- product        // Lưu trữ controller, view cho chức năng sản phẩm của trang admin
|   |   |   +-- .controller.ts        // controller của chức năng sản phẩm của trang admin
|   |   |   +-- .module.ts        // module của chức năng sản phẩm của trang admin
|   |   +-- project
|   |   +-- admin.module.ts        // module cao nhất của trang admin: các module trong admin import vào module này để sử dụng 
|   +-- customer
|   +-- config        // Lưu config cho dùng cho ứng dụng
|   |   +-- .env        // Config riêng cho từng thành viên
|   |   +-- .share.env        // Config chung: chỉ cần thay đổi giá trị không cần build ứng dụng
|   +-- share        // Chứa entity, service, provider dùng chung cho ứng dụng
|   +-- app.module.ts        // Module level cao nhất ứng dụng: AdminModule và customerModule import vào đây
|   +-- main.ts        // Cấu hình ứng dụng 
+-- views        // Chứa views của ứng dụng
|   +-- admin        // Chứa views của trang quản trị
|   |   +-- components        // Chứa components dùng nhiều nơi
|   |   +-- layouts       // Chứa phần của trang web như footer, header,...
|   +-- customer        // Chứa views của trang khách hàng
+-- tailwind.config.js        // Config thuộc tính css
```

# Cấu hình ứng dụng:
- Đối với css: Sử dụng tailwind nên sẽ có 1 file viết css và 1 file tailwind render ra để dùng vào html
+ Viết css vào file **main.css**.
+ Import **main-out.css** vào file html. 
- Khi kéo project về lần đầu:
+ Tạo và thêm vào file .env tại thư mục config để cấu hình mysql tùy chỉnh theo máy:
```
    MYSQL_HOSTNAME=<hostname>
    MYSQL_PORT=<port>
    MYSQL_USERNAME=<username>
    MYSQL_PASSWORD=<password>
```
+ Chạy file changlog tổng hợp trong thư mục changelog

# Câu lệnh chạy ứng dụng
## Chạy ứng dụng
``` npm run start:dev ```
## Chạy tailwind
- Trang khách hàng:
``` npm run render-customer:css ```
- Trang quản trị
``` npm run render-admin:css ```

# Hướng dẫn đẩy code: Không được trực tiếp đẩy lên nhánh develop
1. Tạo nhánh mới với Template: 
- Nếu là chức năng mới: ```feature/<tên người thực hiện>_<chức năng đang làm>_<chức năng làm gì>```
- Nếu là sửa bug: ```fixbug/<tên người thực hiện>_<tóm tắt bug>```
2. Trước khi đẩy lên thì rebase hoặc pull code mới nhất từ develop. 
3. Sau khi đẩy nhánh lên, tạo pull request merge vào develop và để người review là 2 người còn lại.
3. Phải đánh complete toàn bộ những comment xong thì Thịnh sẽ merge vào develop.