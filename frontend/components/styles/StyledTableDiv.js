import styled from 'styled-components';

const StyledTableDiv = styled.div`
    margin: 5rem;
    a {
        color: var(--blue);
    }
    button {
        padding: 1.2rem;
        margin-bottom: 3rem;
    }
    .btn {
        background: var(--blue);
        color: var(--white);
        padding: .5rem 1rem;
        font-size: 2rem;
        border-radius: .5rem;
        transition: all 0.5s;
        margin-bottom: 3.5rem;
        :hover {
            transform: scale(1.1);
        }
    }
    table {
        box-shadow: var(--bs);
    }
    thead {
        background: var(--blue);
        color: var(--white);
    }
    tbody {
        font-size: 1.6rem;
        tr:hover {
            background: var(--bgBlue);
        }
        td {
            vertical-align: middle;
        }
        .desc {
            width: 30rem;
        }
        button {
            width: 100%;
            padding: .5rem;
            margin-bottom: 0;
        }
        .clickable {
            cursor: pointer; 
        }
    }
    svg {
        height: 1.5rem;
        margin-right: 1rem;
    }
    .row {
        margin: auto 0 3rem;
        border-bottom: 1px solid var(--lightGrey);
        h2 {
            font-size: 3rem;
            font-weight: bold;
        }
        p {
            margin-bottom: 0;
            font-size: 1.8rem;
        }
    }
    @media (max-width: 1025px) {
        margin: 1.5rem;
    }
`;

export default StyledTableDiv;