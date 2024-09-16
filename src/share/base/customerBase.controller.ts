import { CustomerPage } from '../enum/customer-page';
import { CustomerUI } from '../interfaces/customer-UI';

export class CustomerBaseController {
  // Thông tin navbar
  public customerUI: CustomerUI = {
    header: {
      navBar: [
        {
          id: 1,
          page: CustomerPage.Home,
          level: 1,
          title: 'TRANG CHỦ',
          href: '/',
        },
        {
          id: 2,
          page: CustomerPage.About,
          level: 1,
          title: 'GIỚI THIỆU',
          href: '/',
        },
        {
          id: 3,
          page: CustomerPage.Project,
          level: 1,
          title: 'DỰ ÁN',
          href: '/',
        },
        {
          id: 4,
          page: CustomerPage.Product,
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
          id: 5,
          page: CustomerPage.Post,
          level: 1,
          title: 'BÀI VIẾT',
          href: '/',
        },
        {
          id: 6,
          page: CustomerPage.Contact,
          level: 1,
          title: 'LIÊN HỆ',
          href: '/contact',
        },
      ],
      isOtherHome: true,
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

  /**
   * imgUrl: ảnh banner cho trang 
   * page: trang nào
   * Created By: Nguyễn Văn Thịnh (15/09/2024)
   */
  public constructor(page: CustomerPage, imgUrl: string = "") {
    // Cấu hình giao diện trang web
    if(page === CustomerPage.Home) {
      this.customerUI.header.isOtherHome = false;
    } else {
      this.customerUI.header.imgUrl = imgUrl;
      const navItem = this.customerUI.header.navBar.find(item => item.id === page);
      if(navItem) {
        this.customerUI.header.navItemID = navItem.id;
        this.customerUI.header.navItemName = navItem.title;
      }
    }
  }
}
