import styled from 'styled-components';

const SingleItemDiv = styled.div`
    padding: 4rem;
    .col-md-6 {
        box-shadow: var(--bs);
    }
    .title_header {
        border-bottom: 1px solid var(--lightGrey);
        padding: 3rem 3rem 0;
        h2 {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 0;
            a {
                color: var(--blue);
            }
            svg {
                height: 2rem;
                margin: auto 1.5rem;
            }
        }
        p {
            font-size: 1.8rem;
            font-weight: 300;
            margin-bottom: 1rem;
        }
    }
    .text-center {
        margin-top: 2rem;
        .info {
            margin-bottom: 0;
            font-size: 1.8rem;
            span {
                font-weight: 300;
            }
        }
        h3 {
            font-size: 2.4rem;
            margin: 1rem 1.5rem;
        }
        button {
            margin-top: 2.5rem;
        }
        img {
            object-fit: fill;
        }
        svg {
            height: 2rem;
            color: var(--blue);
            position: absolute;
            top: 255px;
        }
        img:hover, svg:hover {
            cursor: pointer;
            transform: scale(1.1);
            transition: all 0.5s;
        }
    }
    @media (max-width: 1025px) {
        .col-md-6 {
            max-width: 90%;
        }
        form {
            max-width: 100%;
        }
    }
    @media (max-width: 420px) {
        padding: 2rem 0;
        h2 {
            font-size: 2.2rem !important;
        }
        .col-md-6 {
            max-width: 100%;
        }
        .title_header {
            padding: 0;
        }
    }
`;

export default SingleItemDiv;