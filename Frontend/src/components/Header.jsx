import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center px-4 py-4">
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-700 hover:opacity-80"
        >
          사당새집연구소
        </Link>
        <ul className="flex space-x-6 text-sm font-medium text-gray-700">
          <li className="group relative hover:bg-gray-50">
            <span className="hover:text-blue-600 cursor-pointer px-2 py-1 inline-block">
              홈 청소
            </span>
            <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white border border-gray-200 shadow-lg mt-2 rounded-md w-44 flex-col z-10 pt-2 pb-2">
              <Link
                to="/home-cleaning/move-in"
                className="block px-4 py-2 hover:bg-blue-50"
              >
                입주청소
              </Link>
              <Link
                to="/home-cleaning/interior"
                className="block px-4 py-2 hover:bg-blue-50"
              >
                인테리어 청소
              </Link>
            </div>
          </li>
          <li className="group relative hover:bg-gray-50">
            <span className="hover:text-blue-600 cursor-pointer px-2 py-1 inline-block">
              사업장 청소
            </span>
            <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white border border-gray-200 shadow-lg mt-2 rounded-md w-44 flex-col z-10 pt-2 pb-2">
              <Link
                to="/business-cleaning/construction"
                className="block px-4 py-2 hover:bg-blue-50"
              >
                준공청소
              </Link>
            </div>
          </li>
          <li className="group relative hover:bg-gray-50">
            <span className="hover:text-blue-600 cursor-pointer px-2 py-1 inline-block">
              특수 청소
            </span>
            <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white border border-gray-200 shadow-lg mt-2 rounded-md w-44 flex-col z-10 pt-2 pb-2">
              <Link
                to="/special-cleaning/carpet"
                className="block px-4 py-2 hover:bg-blue-50"
              >
                카펫청소
              </Link>
              <Link
                to="/special-cleaning/wall"
                className="block px-4 py-2 hover:bg-blue-50"
              >
                외벽청소
              </Link>
            </div>
          </li>
          <li className="group relative hover:bg-gray-50">
            <span className="hover:text-blue-600 cursor-pointer px-2 py-1 inline-block">
              문의하기
            </span>
            <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white border border-gray-200 shadow-lg mt-2 rounded-md w-44 flex-col z-10 pt-2 pb-2">
              <Link
                to="/contact/quote"
                className="block px-4 py-2 hover:bg-blue-50"
              >
                견적문의
              </Link>
            </div>
          </li>
          <li>
            <Link to="/gallery" className="hover:text-blue-600">
              갤러리
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
