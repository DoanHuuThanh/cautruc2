import { join } from 'path';
import * as hbs from 'hbs';
import * as fs from 'node:fs';

export async function registerPartial() {
  // Danh sách folder đăng ký partial
  const partialFolders = [
    join(__dirname, '..', 'views/admin/components'),
    join(__dirname, '..', 'views/admin/layouts'),
    join(__dirname, '..', 'views/customer/components'),
    join(__dirname, '..', 'views/customer/layouts'),
  ];

  partialFolders.forEach((partailDir) => {
    // Đọc tất cả các file trong thư mục partials
    fs.readdir(partailDir, () => (err, files) => {
      if (err) {
        console.log('registerPartial: Error readdir - ', err);
      } else {
        for (const file of files) {
          const filePath = join(partailDir, file);
          // Xóa phần mở rộng để lấy tên partial
          const partialName = file.replace(/\.[^/.]+$/, '');

          // Đọc file và đăng ký partial
          fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
            hbs.registerPartial(partialName, data);
          });
        }
        console.log('registerPartial: Complete read partial');
      }
    });
  });
}
