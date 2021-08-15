import { SideBar } from './lines/SideBar';
import { NewImage } from './lines/NewImage';

export function Header() {
  return (
    <div>
      <SideBar></SideBar>
      <NewImage></NewImage>
    </div>
  );
}