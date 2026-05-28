export interface AboutResponseDto {
  id: number;
  name: string;
  url: string;
  shortDescription: string;
  content: string;
  description: string[];
  otherOptions: AboutOptions[];
  sortIndex: 1;
  active: true;
  type: "ABOUT";
  parentId: null;
  sections: AboutSection[];
  createdAt: string;
  updatedAt: string;
}

interface AboutSection {
  id: number;
  pageId: number;
  pageTitle: string;
  title: string;
  description: AboutDescription[];
  images: string[];
  sortIndex: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AboutOptions {
  icon: string;
  type: string;
  content: string;
}

interface AboutDescription {
  icon: string;
  text: string;
}
