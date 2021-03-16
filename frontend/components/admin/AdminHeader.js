import Link from "next/link";
import { Navbar } from 'reactstrap';
import { StyledHeader, Logo } from '../Header';
import AdminNavItems from "./AdminNavItems";

const AdminHeader = () => {
    return (
        <StyledHeader>
            <Navbar>
                <Logo>
                    <Link href="/admin/">Ship Safe</Link>
                </Logo>
                <AdminNavItems />
            </Navbar>
        </StyledHeader>
    );
};

export default AdminHeader;