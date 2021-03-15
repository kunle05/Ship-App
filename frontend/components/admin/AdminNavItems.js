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

const AdminNavItems = () => {
    return (
        <StyledNavItems>
            <Nav>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                    Shipping
                    </DropdownToggle>
                    <DropdownMenu>
                        <Link href="/">
                            <a className="dropdown-item">Option 1</a>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                    Locations
                    </DropdownToggle>
                    <DropdownMenu>
                        <Link href="/admin/locations/">
                            <a className="dropdown-item">Manage Locations</a>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                    Users
                    </DropdownToggle>
                    <DropdownMenu>
                        <Link href="/admin/users/add">
                            <a className="dropdown-item">Add User</a>
                        </Link>
                        <Link href="/admin/users/">
                            <a className="dropdown-item">Manage Users</a>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </StyledNavItems>
    );
};

export default AdminNavItems;
