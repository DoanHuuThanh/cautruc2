import { join } from 'path';
import * as hbs from 'hbs';
import * as fs from 'node:fs';

export async function registerPartial() {
  console.log('registerPartial: Begin regis partial');

  // Danh sách folder đăng ký partial
  const partialFolders = [
    join(__dirname, '..', 'views/admin/components'),
    join(__dirname, '..', 'views/admin/layouts'),
    join(__dirname, '..', 'views/admin/product'),
    join(__dirname, '..', 'views/admin/project'),
    join(__dirname, '..', 'views/customer/components'),
    join(__dirname, '..', 'views/customer/layouts'),
    join(__dirname, '..', 'views/customer/home'),
    join(__dirname, '..', 'views/customer/product'),
  ];

  partialFolders.forEach((partial) => {
    // Đọc tất cả các file trong thư mục partials
    const files = fs.readdirSync(partial);
    if(files) {
      for (const file of files) {
        const filePath = join(partial, file);
        // Xóa phần mở rộng để lấy tên partial
        const partialName = file.replace(/\.[^/.]+$/, '');

        // Đọc file và đăng ký partial
        hbs.registerPartial(partialName, fs.readFileSync(filePath, { encoding: 'utf8' }).toString());
      }
    } else {
      console.log('registerPartial: Error readdir - ', files);
    }
  });
  
  console.log('registerPartial: Complete regis partial');
}
