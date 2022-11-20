export interface INewsList {
  news: INews[];
  totalCount: number;
}

export interface INews {
  id: number;
  title: string;
  description: string;
  publishedDate: Date;
  url: string;
  fullUrl: string;
  titleImageUrl: string;
  categoryType: string;
}

export interface INewsInformation {
  id: number;
  title: string;
  description: string;
  text: string;
  publishedDate: Date;
  url: string;
  fullUrl: string;
  titleImageUrl: string;
  categoryType: string;
}
