# Cấu trúc thư mục

+-- changelog    <!-- Script thay đổi liên quan đến dữ liệu db -->
|   +-- R06.09.2024    <!-- Thư mục chứa từng phiên bản changlelog R1, R2, R3, ... -->
|   |   +-- nhat_1.sql    <!-- File sql để chạy thay đổi dữ liệu db => Khi chạy sẽ gộp tất cả file làm 1 và chạy -->
|   |   +-- thanh_2.sql
|   +-- ...
+-- public    <!-- Lưu chữ dữ liệu public: icon, image -->
|   +-- images
|   +-- icons
+-- src    <!-- Lưu trữ code chính của dự án -->
|   +-- admin    <!-- Lưu trữ controller, view cho trang admin -->
|   |   +-- product    <!-- Lưu trữ controller, view cho chức năng sản phẩm của trang admin -->
|   |   |   +-- views    <!-- Lưu trữ view dùng cho chức năng sản phẩm của trang admin -->
|   |   |   +-- .controller.ts    <!-- controller của chức năng sản phẩm của trang admin -->
|   |   |   +-- .module.ts    <!-- module của chức năng sản phẩm của trang admin -->
|   |   +-- project    
|   |   +-- view-components    
|   |   +-- admin.module.ts    <!-- module cao nhất của trang admin: các module trong admin import vào module này để sử dụng --> 
|   +-- customer    
|   |   +-- home    
|   |   +-- project    
|   |   +-- view-components    
|   |   +-- customer.module.ts    
|   +-- config    <!-- Lưu config cho dùng cho ứng dụng -->
|   |   +-- .env    <!-- Config riêng cho từng thành viên -->
|   |   +-- .share.env    <!-- Config chung: chỉ cần thay đổi giá trị không cần build ứng dụng -->
|   +-- share    <!-- Chứa entity, service, provider dùng chung cho ứng dụng-->
|   +-- app.module.ts    <!-- Module level cao nhất ứng dụng: AdminModule và customerModule import vào đây -->
|   +-- main.ts    <!-- Cấu hình ứng dụng --> 
+-- tailwind.config.js    <!-- Config thuộc tính css -->

# Lưu ý:
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


# Câu lệnh cấu hình và chạy ứng dụng

## Chạy ứng dụng
``` npm run start:dev ```

## Chạy tailwind
``` npm run render:css ```
