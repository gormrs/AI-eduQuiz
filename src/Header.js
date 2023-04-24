
function Header() {
    return (
      <header className="bg-zinc-900 p-4 flex justify-between ">
        <h1 className="text-3xl font-bold">
          Sammendrag og quiz-generator for ONH
        </h1>
        <a className= "bg-white p-2 rounded-md"
          href="https://github.com/gormrs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
          src={`${process.env.PUBLIC_URL}/github-mark.svg`}
          alt="GitHub"
          width="34"
          height="34"
        />
        </a>
      </header>
    );
  }

export default Header;