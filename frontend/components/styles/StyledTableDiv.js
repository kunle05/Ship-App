import styled from 'styled-components';

const StyledTableDiv = styled.div`
    margin: 5rem;
    a {
        color: var(--blue);
        font-weight: bold;
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
            @media (max-width: 1025px) {
                font-size: 1.6rem;
                margin-bottom: 2rem;
            }
        }
    }
    .pkg-tab {
        border: 1px solid var(--blue);
        border-radius: 1rem;
        margin-bottom: 1rem;
        .d-flex {
            background: var(--blue);
            color: var(--white);
            border-radius: 1rem 1rem 0 0;
            padding: .8rem 1.5rem;
            align-items: center;
            span {
                background: #6f7782;
                padding: 0 1rem;
                border-radius: 50%;
            }
            input {
                height: 1.5rem;
                width: 1.5rem;
                margin-right: 1.5rem;
            }
        }
        .d-flex.closed, tr {
            border-radius: 1rem;
        }
        table {
            box-shadow: none;
            margin: 0;
            tbody {
                font-weight: bold;
                td:first-child {
                    width: 2rem;
                    padding-left: 1.6rem;
                }
                td:nth-child(2) {
                    width: 20rem;
                }
            }
        }
    }
    @media (max-width: 1025px) {
        margin: 1.5rem;
    }
    @media (max-width: 1025px) {
    
    }
`;

export default StyledTableDiv;