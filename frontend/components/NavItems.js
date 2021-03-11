import Link from "next/link";
import { DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown } from "reactstrap"
import styled from "styled-components";

const StyledNavItems = styled.div`
    .dropdown-menu {
        width: max-content !important;
    }
    .dropdown-item {
        padding: 1rem;
        font-size: 1.5rem;
    }
    @media (max-width: 720px) {
        .nav {
            justify-content: center;
        }
        .nav-link {
            font-size: 1.5rem !important;
        }
        .dropdown-item {
            padding: .5rem 1rem;
        }
    }
`;

const NavItems = () => {
    return (
        <StyledNavItems>
            <Nav>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                    Tracking
                    </DropdownToggle>
                    <DropdownMenu>
                        <Link href="/">
                            <a className="dropdown-item">Option 1</a>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                    Location
                    </DropdownToggle>
                    <DropdownMenu>
                        <Link href="/locations">
                            <a className="dropdown-item">All Locations</a>
                        </Link>
                        <Link href="/admin/locations/">
                            <a className="dropdown-item">Manage Locations</a>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                    Support
                    </DropdownToggle>
                    <DropdownMenu>
                        <Link href="/">
                            <a className="dropdown-item">Option 1</a>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </StyledNavItems>
    );
};

export default NavItems;
