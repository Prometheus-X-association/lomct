import { CloseIcon, CommentInfoIcon } from '@src/assets/icons';

function Header() {
  return (
    <header className="p-2 flex items-center gap-x-2.5 bg-[#D2E8FF]">
      <CommentInfoIcon />
      <h1 className="text-sm font-bold">Welcome to your LOMCT!</h1>
      <button className="ml-auto" onClick={() => window.close()}>
        <CloseIcon />
      </button>
    </header>
  );
}

export default Header;
