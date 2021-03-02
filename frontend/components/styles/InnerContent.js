import styled from "styled-components";

const InnerContent = styled.div`
    padding: 0 1.5rem;
    margin: auto auto 12rem;
    img {
        max-width: 100%;
        border-radius: 1rem;
        box-shadow: 0 50px 100px rgb(50 50 93 / 10%), 0 15px 35px rgb(50 50 93 / 15%), 0 5px 15px rgb(0 0 0 / 10%);
    }
    .row {
        align-items: center;
    }
    .col-md-6 {
        padding: 0;
        margin: 0 5rem 0 2rem;
        &[right] {
            order: 2;
            margin-right: 0;
            margin-left: 7rem;
            @media (max-width: 765px) {
                order: revert;
            }
        }
    }
    .col-md-5 {
        margin-left: 2rem;
    }
    h4 {
        font-size: 2.5rem;
        line-height: 3.5rem;
        margin-bottom: 3rem;
    }
    p {
        font-weight: 300;
    }
    .btn {
        background: var(--blue);
        color: var(--white);
        font-weight: bold;
        padding: 1rem 2rem;
        text-transform: uppercase;
        font-size: 2rem;
        border-radius: .5rem;
        transition: all 0.5s;
        :hover {
            transform: scale(1.1);
        }
    }

    @media (max-width: 1025px) {
        margin-bottom: 4rem;
        .col-md-6 {
            margin: 0 !important;
            display: flex;
            justify-content: center;
            img {
                height: 250px;
            }
        }
        .col-md-5 {
            margin: 2.5rem auto;
            h4 {
                font-size: 1.8rem;
                line-height: 2.5rem;
                margin-bottom: 1.5rem;
            }
            p {
                font-size: 1.5rem;
                margin-bottom: 1.8rem;
            }
            .btn {
                font-size: 1.5rem;
                padding: .5rem 1rem;
            }
        }
    }
    @media (max-width: 765px) {
        .col-md-5 {
            text-align: center;
        }
    }
`;

export default InnerContent;