import styled from 'styled-components';

const LocationTable = styled.div`
    margin: 5rem;
    a {
        color: var(--blue);
    }
    button {
        padding: 1.2rem;
        margin-bottom: 3rem;
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
    }
    svg {
        height: 1.5rem;
        margin-right: 1rem;
    }
    @media (max-width: 1025px) {
        margin: 1.5rem;
    }
`;

export default LocationTable;