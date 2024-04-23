import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LOGIN_PAGE, MAIN } from './page_constants';

function Header() {
  return (
    <>{
      <div class="header">
        <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
          <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href={MAIN}>Shop</a>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="/admin/item/new">상품 등록</a>
              </li>
              <li class="nav-item" >
                <a class="nav-link" href="/admin/items">상품 관리</a>
              </li>
              <li class="nav-item" >
                <a class="nav-link" href="/cart">장바구니</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/orders">구매이력</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href={LOGIN_PAGE}>로그인</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/members/logout">로그아웃</a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0" action="@{/}" method="get">
              <input name="searchQuery" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </div>
    }

    </>
  );
}

export default Header;