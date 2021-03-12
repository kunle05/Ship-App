import Link from "next/link";
import { Navbar } from 'reactstrap';
import { StyledHeader, Logo } from '../Header';
import NavItems from '../NavItems';

const AdminHeader = () => {
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

export default AdminHeader;