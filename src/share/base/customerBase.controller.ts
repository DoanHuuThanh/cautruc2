import { CustomerUI } from '../interfaces/customer-UI';

export class CustomerBaseController {
  // Thông tin navbar
  public customerUI: CustomerUI = {
    header: {
      navBar: [
        {
          level: 1,
          title: 'TRANG CHỦ',
          href: '/',
        },
        {
          level: 1,
          title: 'GIỚI THIỆU',
          href: '/',
        },
        {
          level: 1,
          title: 'DỰ ÁN',
          href: '/',
        },
        {
          level: 1,
          title: 'DANH MỤC',
          href: '/',
          subNav: [
            {
              level: 2,
              title: 'Cầu trục 1',
              href: '/',
            },
            {
              level: 2,
              title: 'Cầu trục 2',
              href: '/',
              subNav: [
                {
                  level: 3,
                  title: 'Cầu trục 2.2',
                  href: '/',
                },
              ],
            },
            {
              level: 2,
              title: 'Cầu trục 3',
              href: '/',
            },
            {
              level: 2,
              title: 'Cầu trục 4',
              href: '/',
            },
          ],
        },
        {
          level: 1,
          title: 'BÀI VIẾT',
          href: '/',
        },
      ],
    },
    footer: {
      service: [
        {
          title: 'Kiến trúc',
          href: '/',
        },
        {
          title: 'Hình ảnh',
          href: '/',
        },
        {
          title: 'Vẽ đồ họa',
          href: '/',
        },
        {
          title: 'Đường ống',
          href: '/',
        },
        {
          title: 'Sơ đồ điện',
          href: '/',
        },
      ],
      contact: [
        {
          icon: 'fa-regular fa-envelope',
          description: 'cautrucbinhchau@gmail.com',
        },
        {
          icon: 'fa-solid fa-phone',
          description: '0393583026<br>0393583026',
        },
        {
          icon: 'fa-solid fa-location-dot',
          description:
            'Số 24 Đường Lý Thường Kiệt<br>Phường Hòa Bình, Thành Phố Bắc Ninh',
        },
      ],
    },
  };
}
