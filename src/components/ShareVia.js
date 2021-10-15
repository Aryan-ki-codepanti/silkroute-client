import React, { useState } from "react";
import styled from "styled-components";
import whatsappPNG from "../img/whatsapp.png";
import smsPNG from "../img/sms.png";
import emailPNG from "../img/email.png";
import telegramPNG from "../img/telegram.png";
import copySVG from "../img/svg/copy.svg";

// styled components

const Wrapper = styled.div`
    background: #fff;
    padding: 35px 17px;
    h3 {
        font-weight: 700;
        font-size: 21px;
        line-height: 31px;
        color: #0f0f0f;
    }

    img {
        cursor: pointer;
    }
`;

const PillBox = styled.div`
    span {
        font-weight: 400;
        line-height: 22px;
        font-size: 12px;
    }
`;

const ContentBox = styled.div`
    p:nth-of-type(1) {
        font-weight: 900;
        font-size: 10px;
        line-height: 22px;
        color: #4a4a4a;
        text-transform: uppercase;
    }

    .shareBox {
        background: rgba(116, 116, 116, 0.08);
        border-radius: 4px;
    }

    .shareBox p {
        color: #2a6059;
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        text-transform: none;
    }
`;

const ShareVia = () => {
    const [shareUrl, setShareUrl] = useState(
        "https://web.robinstore.com/aditya"
    );

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
    };

    return (
        <div
            style={{ borderRadius: "16px 16px 0 0", zIndex: "2000" }}
            className="mt-auto"
        >
            <Wrapper>
                <div>
                    <h3> Share Via </h3>

                    <PillBox className="d-flex mt-5 justify-content-between">
                        <div className="d-flex flex-column justify-content-center gap-2">
                            <a
                                rel="noreferrer"
                                target="_blank"
                                href={`https://web.whatsapp.com/send?text=Hello , Check your order at ${shareUrl}`}
                            >
                                <img
                                    width="60px"
                                    src={whatsappPNG}
                                    alt="whatsapp-png"
                                />
                            </a>
                            <span className="text-center">Whatsapp</span>
                        </div>
                        <div className="d-flex flex-column justify-content-center gap-1">
                            <a href={`sms://+91664504185&body=Hello , Check your order at ${shareUrl}`}>
                                <img
                                    width="60px"
                                    src={smsPNG}
                                    alt="sms-png"
                                />
                            </a>
                            <span className="text-center">SMS</span>
                        </div>
                        <div className="d-flex flex-column justify-content-center gap-1">
                            <a href={`mailto:enteremail@gmail.com&body=Hello , Check your order at ${shareUrl}`}>
                                <img
                                    width="60px"
                                    src={emailPNG}
                                    alt="mail-png"
                                />
                            </a>
                            <span className="text-center">Mail</span>
                        </div>
                        <div className="d-flex flex-column justify-content-center gap-1">
                            <a href={`https://telegram.me/share/url?url=${shareUrl}&text=Hello , Check your order here`}>
                                <img
                                    width="60px"
                                    src={telegramPNG}
                                    alt="telegram-png"
                                />
                            </a>
                            <span className="text-center">Telegram</span>
                        </div>
                    </PillBox>

                    <ContentBox className="mt-5">
                        <p className="mb-1"> Copy Link </p>
                        <div className="shareBox d-flex justify-content-between py-2 px-1 align-items-center">
                            <p className="mb-0"> {shareUrl} </p>
                            <img
                                src={copySVG}
                                alt="copy-svg"
                                onClick={handleCopyToClipboard}
                            />
                        </div>
                    </ContentBox>
                </div>
            </Wrapper>
        </div>
    );
};

export default ShareVia;
