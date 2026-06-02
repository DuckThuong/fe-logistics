export interface PolicyOtherOptionDto {
  icon: string;
  image: string;
  type: string;
  value: string;
}

export interface PolicySectionDescriptionDto {
  type: string;
  icon: string;
  img: string | null;
  text: string;
  boldParts: string[] | null;
  headers: string[];
  cellRows: unknown[];
}

export interface PolicySectionDto {
  id: number;
  pageId: number;
  pageTitle: string;
  title: string;
  description: PolicySectionDescriptionDto[];
  images: unknown[];
  sortIndex: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PolicyChildDto {
  id: number;
  name: string;
  url: string;
  shortDescription: string;
  image: string;
  description: string[];
  content: string;
  otherOptions: PolicyOtherOptionDto[];
  sortIndex: number;
  active: boolean;
  type: string;
  parentId: number;
  updatedAt: string;
  createdAt: string;
}

export interface PolicyContentDto {
  id: number;
  name: string;
  url: string;
  shortDescription: string;
  image: string;
  description: string[];
  content: string;
  otherOptions: PolicyOtherOptionDto[];
  sortIndex: number;
  active: boolean;
  type: string;
  parentId: number | null;
  children: PolicyChildDto[];
  sections: PolicySectionDto[];
  createdAt: string;
  updatedAt: string;
}

