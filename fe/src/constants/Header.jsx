import { LOGIN, MAIN } from "./page_constants";

export default function Header() {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href={MAIN}>Shop</a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/admin/item/new">상품 등록</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/items">상품 관리</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cart">장바구니</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/orders">구매이력</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={LOGIN}>로그인</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/members/logout">로그아웃</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0" method="get">
            <input name="searchQuery" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  );
}