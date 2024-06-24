export interface Service {
  id: number;
  uid: string;
  uniqueKey: string;
  title: string;
  description: string;
  image: string;
  favorite: boolean;
}

export interface UserProfile {
  userId: number;
  email: string;
  username: string;
  initials: string;
  greetingName: string;
}

export interface UpdateFavorite {
  favorite: boolean;
  uid: string;
}

export interface Attribute {
  class?: string;
  style?: string;
}

export interface Child {
  type: string;
  value?: string;
  attributes?: Attribute;
  children?: Child[];
}

export interface Element {
  type: string;
  attributes?: Attribute;
  children?: Child[];
}

export type ContentStructure = (Element | Child)[];

export interface Notification {
  id: number;
  title: string;
  description: string;
  content: ContentStructure;
}
