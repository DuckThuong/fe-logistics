export interface ServiceResponseDto {
  id: number;
  name: string;
  url: string;
  shortDescription: string;
  content: string;
  description: string[];
  children: ServiceFeatured[];
  otherOptions: ServiceOptions[];
  sortIndex: 1;
  active: true;
  type: "ABOUT";
  parentId: null;
  sections: ServiceSection[];
  createdAt: string;
  updatedAt: string;
}

interface ServiceSection {
  id: number;
  pageId: number;
  pageTitle: string;
  title: string;
  description: ServiceDescription[];
  images: string[];
  sortIndex: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServiceOptions {
  icon: string;
  type: string;
  value: string;
}

interface ServiceDescription {
  icon: string;
  text: string;
}

interface ServiceFeatured {
  active: boolean;
  content: string;
  description: [];
  id: 11;
  image: "https://hongkylogistics.vn/img/cs.jpg";
  name: "Dịch vụ";
  otherOptions: [];
  parentId: 10;
  shortDescription: "Đặt hàng Trung Quốc";
  sortIndex: 1;
  type: "SERVICE";
  url: "dat-hang-trung-quoc";
}
