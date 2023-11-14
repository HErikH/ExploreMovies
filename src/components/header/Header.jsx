import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

function Header() {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    function controlNavbar() {
        setLastScrollY(window.scrollY);
        if (!(window.scrollY > 200)) {
            setShow("top");
            return
        }
        // if (!(window.scrollY > lastScrollY) && !!mobileMenu) {
        //     setShow("show");
        //     return
        // }
        setShow("hide");
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)

        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY])

    useEffect(() => {
        const closeMobileMenu = (e) => {
            if (e.target.innerWidth > 768) setMobileMenu(false)
        }
        window.addEventListener("resize", closeMobileMenu)
        return () => {
            window.removeEventListener("resize", closeMobileMenu);
        };
    }, [])

    function searchQueryHandler(e) {
        if (e.key == "Enter" && query.length > 0) {
          navigate(`/search/${query}`)
          setTimeout(() => {
            setShowSearch(false);
          }, 1000);
        }
    }    

    function openSearch() {
        setMobileMenu(false);
        setShowSearch(true);
    };

    function openMobileMenu() {
        setMobileMenu(true);
        setShowSearch(false);
    };

    return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
        <ContentWrapper>
            <Link className="logo" to='/'>
                <img src={logo} alt="" />
            </Link>

            <ul className="menuItems">
                <Link 
                to="/explore/movie" 
                onClick={() => setMobileMenu(false)} 
                className="menuItems__item">
                    Movies
                </Link>
                <Link 
                to="/explore/tv" 
                onClick={() => setMobileMenu(false)} 
                className="menuItems__item">
                    TV Shows
                </Link>
                <li className="menuItems__item">
                    <HiOutlineSearch onClick={openSearch}/>
                </li>
            </ul>

            <div className="mobileMenuItems">
                <HiOutlineSearch  onClick={openSearch} />
                { mobileMenu ? 
                <VscChromeClose onClick={() => setMobileMenu(false)}/> : 
                <SlMenu onClick={openMobileMenu} /> }
            </div>
        </ContentWrapper>

        {showSearch && <div className="searchBar">
            <ContentWrapper>
                <div className="searchInput">
                    <input 
                    type="text" 
                    placeholder="Search for a movie or tv show..."
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                    />  
                    <VscChromeClose onClick={() => setShowSearch(false)}/>
                </div>
            </ContentWrapper>
        </div>}
    </header>)
};

export default Header;
