interface IRoute {
  name: string;
  path: string;
}
const getRootPath = () => location.pathname;
const routes: IRoute[] = [
  {name: "home", path: `${getRootPath()}`}
];

export default routes;
