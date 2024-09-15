import { CustomerPage } from "../enum/customer-page";

export interface CustomerUI {
  header: CustomerHeader; // Thông tin header
  footer: CustomerFooter; // Thông tin footer
}

export interface CustomerNav {
  id?: number; // định danh item navbar
  page?: CustomerPage, // page của nav
  level: number; // level của item navbar
  title: string; // Text của navbar
  href: string; // link đi đâu
  subNav?: CustomerNav[]; // sub item của navbar
}

export interface CustomerHeader {
  navBar: CustomerNav[]; // thông tin navbar
  isOtherHome: boolean; // Có phải home không
  navItemID?: number; // id của item nav
  navItemName?: string; // Tên của item hiện tại
  imgUrl?: string; // url của ảnh trong từng màn hình 
}

export interface CustomerFooter {
  service: CustomerServiceFooter[]; // Dịch vụ
  contact: CustomerContactFooter[]; // thông tin liên hệ
}

export interface CustomerContactFooter {
  icon: string; // icon
  description: string // thông tin
}

export interface CustomerServiceFooter {
  href: string, // link đến đâu
  title: string, // text hiển thị
}