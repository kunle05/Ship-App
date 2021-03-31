import styled, { createGlobalStyle } from "styled-components";
import Meta from "./Meta";

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'radnika_next';
        src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    :root {
        --red: #b31515;
        --black: #393939;
        --lightBlack: #3B3B3B;
        --blue: #002f60;
        --bgBlue: #e6f2ff;
        --grey: #3A3A3A;
        --gray: var(--grey);
        --lightGrey: #e1e1e1;
        --lightGray: var(--lightGrey);
        --offWhite: #ededed;
        --maxWidth: 100%;
        --bs: 0 6px 24px 0 rgba(0,0,0,0.09);
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 0;
        margin: 0;
        font-size: 2rem;
        line-height: 1.5;
    }
    a {
        text-decoration: none;
        color: var(--black);
    }
    p {
        margin-bottom: 3rem;
    }
    .modal {
        top: calc(25% - 50px);
    }
    .modal-dialog {
        max-width: 680px;
    }
    .modal-header {
        border: 0;
        button {
            font-size: 3rem;
            color: var(--red);
            opacity: 1;
        }
    }
    .modal-body {
        form {
            padding: 1.5rem;
        }
    }
    .modal-backdrop
    {
        opacity:0.6 !important;
    }
    .safelink {
        cursor: pointer;
        :hover {
            text-decoration: underline;
        }
    }
`;

const PageContent= styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 2rem;;
`;

const Page = props => {
    return (
        <div className="content">
            <GlobalStyles />
            <Meta />
            {props.children}
        </div>
    );
};

export default Page;