
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const heebo = readFileSync(`${__dirname}/../_fonts/Heebo-Bold.ttf`).toString('base64');

function getCss() {
    return `   
      @font-face {
        font-family: 'Heebo';
        font-style: normal;
        font-weight: bold;
        src: url(data:font/ttf;charset=utf-8;base64,${heebo})  format("ttf");
      }

    body {
        background: white;
        background-image: url('https://images.workchain.co.uk/og-image/background.jpg');
        background-size: cover;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .main {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        flex-direction: column;
    }

    .logo {
        margin: 0 0 50px 0;
        position: relative; 
        z-index: 10;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .url {
        font-size: 30px;
        font-weight: bold;
        color: white;
        font-family: 'Heebo', sans-serif;
    }
    
    .jobTitle, .location {
        font-family: 'Heebo', sans-serif;
        font-style: normal;
        color: white;
        font-weight: bold;
        font-size: 62px;
        line-height: 1.4;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { title, location } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="main">
            <div class="logo-wrapper">
                <img
                    class="logo"
                    alt="Generated Image"
                    src="https://www.workchain.co.uk/assets/img/workchain-logo-white.svg"
                    width="auto"
                    height="40"
                />
            </div>
            
            <div class="jobTitle">
                ${sanitizeHtml(title)}
            </div>
            <div class="location">
                in ${sanitizeHtml(location)}
            </div>

            <div class="apply-now">
                <img
                    class="logo"
                    alt="Apply Now"
                    src="https://images.workchain.co.uk/og-image/apply-now.png"
                    width="266"
                />
            </div>

            <div class="url">
                workchain.co.uk/jobs
            </div>
        </div>
    </body>
</html>`;
}