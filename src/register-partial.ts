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
    const files = fs.readdirSync(partailDir);
    if(files) {
      for (const file of files) {
        const filePath = join(partailDir, file);
        // Xóa phần mở rộng để lấy tên partial
        const partialName = file.replace(/\.[^/.]+$/, '');

        // Đọc file và đăng ký partial
        hbs.registerPartial(partialName, fs.readFileSync(filePath, { encoding: 'utf8' }).toString());
      }
    } else {
      console.log('registerPartial: Error readdir - ', files);
    }
  });
  
  console.log('registerPartial: Complete read partial');
}
