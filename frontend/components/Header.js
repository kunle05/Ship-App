import Link from "next/link";
import { Navbar } from 'reactstrap';
import styled from "styled-components";
import NavItems from "./NavItems";

export const StyledHeader = styled.header`
    padding: 2rem 12rem;
    border-bottom: 1rem solid var(--blue);
    .nav-item .nav-link {
        padding: 1rem 2rem;
        font-size: 2rem;
        font-weight: bolder;
        color: var(--black);
    }
    .nav-item .dropdown-menu.show {
        display: none !important;
    }
    .nav-item:hover .dropdown-menu,  .nav-item:hover .dropdown-menu.show {
        display: block !important;
        width: 100%; 
        padding: 0;
        border: 0;
        box-shadow: 0 50px 100px rgb(50 50 93 / 10%), 0 15px 35px rgb(50 50 93 / 15%), 0 5px 15px rgb(0 0 0 / 10%);
        border-top: .2rem solid var(--blue);
    }
    @media (max-width: 992px) {
        padding: 1.5rem;
    }
    @media (max-width: 720px) {
        padding: 1rem;
        grid-template-columns: 1fr;
        justify-content: center;
        padding-bottom: 0;
        .navbar {
            display: block;
        }
    }
`;

export const Logo = styled.h2`
    font-size: 4rem;
    transform: skew(-8deg);
    a {
        color: white;
        background: var(--blue);
        text-decoration: none;
        text-transform: uppercase;
        padding: 0.5rem 1rem;
        :hover {
            color: white !important;
        }
    }
    @media (max-width: 992px) {
        font-size: revert;
    }
    @media (max-width: 720px) {
        text-align: center;
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <Navbar>
                <Logo>
                    <Link href="/">Ship Safe</Link>
                </Logo>
                <NavItems />
            </Navbar>
        </StyledHeader>
    );
};

export default Header;