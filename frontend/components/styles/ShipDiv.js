import styled from 'styled-components';

const ShipDiv = styled.div`
    padding: .5rem;
    margin: 3rem auto;
    font-size: 1.8rem;
    .title_header {
        padding: 0 3rem;
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
    form {
        margin-top: 0;
    }
    .row, label {
        margin: auto 0;
    }
    h2 {
        font-size: 3.5rem;
    }
    .section-1 {
        border-left: .3rem solid var(--lightGray);
    }
    .section {
        border-right: .3rem solid var(--lightGray);
        border-bottom: .3rem solid var(--lightGray);
        padding: 2rem;
    }
    input, select {
        font-size: 1.3rem;
    }
    .pkgCount {
        display: inline-block;
        margin: 0 .8rem;
        height: 2rem;
        padding: 0;
        vertical-align: text-bottom;
    }
    .bottom {
        padding: 1rem;
    }
    .footer {
        bottom: 0;
        position: absolute;
        width: inherit;
        padding-bottom: 1rem;
        padding-right: 1rem;
        .form-row {
            align-items: flex-end;
        }
    }
    button {
        margin: 0;
    }
    label span {
        color: var(--blue);
    }
`;

export default ShipDiv;