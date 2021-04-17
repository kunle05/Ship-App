import { useQuery } from "@apollo/client";
import Link from "next/link";
import styled from "styled-components";
import { DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown } from "reactstrap";
import { CURRENT_USER_QUERY } from "./user/CheckLogIn";
import SignOut from "./user/SignOut";

const StyledNavItems = styled.div`
    .dropdown-menu {
        width: max-content !important;
        min-width: 100%;
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
    const { data } = useQuery(CURRENT_USER_QUERY);

    return (
        <StyledNavItems>
            { data?.me && 
                <Nav>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                        Shipping
                        </DropdownToggle>
                        <DropdownMenu>
                            <Link href="/admin">
                                <a className="dropdown-item">New Package</a>
                            </Link>
                            <Link href="/admin/packages/shipping">
                                <a className="dropdown-item">Shipping</a>
                            </Link>
                            <Link href="/admin/packages/receiving">
                                <a className="dropdown-item">Receiving</a>
                            </Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    { data.me.permissions.includes("ADMIN") && <>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav>
                            Locations
                            </DropdownToggle>
                            <DropdownMenu>
                                <Link href="/admin/locations/">
                                    <a className="dropdown-item">{ data.me.permissions.includes("ADMIN") ? "Manage Locations" : "All Locations" }</a>
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
                    </> }
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                            <img className="rounded-circle mr-2" src={data.me.photo || "/static/person.png"} alt={data.me.username} height="25" />
                            Hi, {data.me.firstname}!
                        </DropdownToggle>
                        <DropdownMenu>
                            <Link href="/admin/users/account">
                                <a className="dropdown-item">My Account</a>
                            </Link>
                            <SignOut />
                        </DropdownMenu>
                    </UncontrolledDropdown> 
                </Nav>
            }
        </StyledNavItems>
    );
};

export default AdminNavItems;
