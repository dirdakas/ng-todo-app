export interface IMenu extends IMenuLevel {
  subLevel?: ISubMenuLevel[];
}

export interface IMenuLevel {
  title: string;
  route: string;
}

export interface ISubMenuLevel {
  title: string;
  route: string;
}
