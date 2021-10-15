import React, { useState, useEffect , useRef } from "react";
import styled from "styled-components";
import PaymentSettingsSVG from "../img/svg/settings.svg";
import ArrowLeft from "../img/svg/arrow-left.svg";
import OrderBottomBar from "./OrderBottomBar";
import OrderListItem from "./OrderListItem";
import PaymentSettingsCollapse from "./PaymentSettingsCollapse";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ShareVia from "./ShareVia";

const BackButton = styled.div`
    padding: 0.6em 0.8em 0;
    img {
        cursor: pointer;
    }
`;

const TitleBox = styled.div`
    padding: 0 0.8em;
    input,
    input:focus {
        border: none !important;
        outline-width: 0;
        color: #0f0f0f;
        font-weight: 400;
        font-size: 28px;
        line-height: 31px;
    }
`;

const Container = styled.div`
    max-width: 500px;
    width: 95%;
    margin: auto;
    /* padding: 0.6em 0.8em; */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;

    .paymentCollapse{
        background: #fff;
        position: fixed;
        width: 100%;
        max-width: 31.3rem;
        bottom: -500px;
        z-index: 100;
        transition: all 0.5s ease-out;
        padding: 1.6em;
        border-radius: 16px 16px 0 0;
    }
    
    .shareCollapse{
        background: #fff;
        position: fixed;
        width: 100%;
        max-width: 31.3rem;
        bottom: -500px;
        z-index: 100;
        transition: all 0.5s ease-out;
        padding: 0.6em;
        border-radius: 16px 16px 0 0;

    }

`;

const InputRowBox = styled.div`
    padding: 0 1.3em;
    min-height: 5vh;
    --placeholder-color: rgba(15, 15, 15, 0.15);

    * {
        width: 100%;
        border: none !important;
        outline-width: 0;
        height: 40px;
    }

    input::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: var(--placeholder-color) !important;
        font-weight: 400 !important;
        font-size: 32px !important;
        line-height: 31px !important;
    }
    input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: var(--placeholder-color) !important;
        font-weight: 400 !important;
        font-size: 32px !important;
        line-height: 31px !important;
    }
    input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: var(--placeholder-color) !important;
        font-weight: 400 !important;
        font-size: 32px !important;
        line-height: 31px !important;
    }
    input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: var(--placeholder-color) !important;
        font-weight: 400 !important;
        font-size: 32px !important;
        line-height: 31px !important;
    }
    input::-ms-input-placeholder {
        /* Microsoft Edge */
        color: var(--placeholder-color) !important;
        font-weight: 400 !important;
        font-size: 32px !important;
        line-height: 31px !important;
    }

    input::placeholder {
        /* Most modern browsers support this now. */
        color: var(--placeholder-color) !important;
        font-weight: 400 !important;
        font-size: 32px !important;
        line-height: 31px !important;
    }
`;

const ListingBox = styled.div`
    min-height: 3vh;
    padding: 0 0.8em;
`;

const Overlay = styled.div`
    position: absolute;
    
    background-color: rgba(0,0,0,0.7);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
`;

const OrderListing = () => {
    // to store whole as object
    /* {
        title: "Aryan's Order",
        items: [ {
            name : "Snickers" ,
            quantity : 3 ,
            price: 20
        } ,
        {
            name : "Namkeen" ,
            quantity : 2 ,
            price: 10

        } 
        ]
    }*/

    const [title, setTitle] = useState("");
    const [orderItems, setOrderItems] = useState([]);
    const [paymentSettingsVisibility, setPaymentSettingsVisibility] =
        useState(false);
    const [overlay , setOverlay] = useState(null);
    const paymentRef = useRef(null);
    const shareRef = useRef(null);
    const history = useHistory();
    const host = process.env.REACT_APP_SERVER_DOMAIN;

    // redirect if phone is not in localStorage
    if (!localStorage.getItem("phone")) {
        history.push("/");
    }

    const isQty = num => {
        const regQty = /^([0-9]){1,}$/;
        return regQty.test(num);
    };

    const isPrice = num => {
        const reg = /^([0-9]){0,}\.{0,1}([0-9]){1,}$/;
        return reg.test(num);
    };

    useEffect(() => {
        if (localStorage.getItem("phone")) {
            document.getElementById("title").focus();

            document.getElementById("item").addEventListener("keydown", e => {
                if (e.key === "Enter") {
                    document.getElementById("quantity").focus();
                }
            });

            document
                .getElementById("quantity")
                .addEventListener("keydown", e => {
                    if (e.key === "Enter") {
                        document.getElementById("pricePerItem").focus();
                    }
                });

            document
                .getElementById("pricePerItem")
                .addEventListener("keydown", e => {
                    if (e.key === "Enter") {
                        const itemName = document.getElementById("item");
                        const quantity = document.getElementById("quantity");
                        const pricePerItem =
                            document.getElementById("pricePerItem");

                        const name = itemName.value;
                        const qty = isQty(quantity.value.trim())
                            ? Number(quantity.value.trim())
                            : 0;
                        const price =
                            qty *
                            (isPrice(pricePerItem.value.trim())
                                ? Number(pricePerItem.value.trim())
                                : 0);

                        itemName.value = "";
                        quantity.value = "";
                        pricePerItem.value = "";
                        itemName.focus();

                        setOrderItems(prev =>
                            prev.concat({
                                name: name,
                                quantity: qty,
                                price: price,
                            })
                        );
                        console.log("I am fired");
                    }
                });
        }
    }, []);

    const handleOnChangeTitle = event => {
        setTitle(event.target.value);
    };

    const handleOnSave = async () => {
        console.log("saved");
        // Make API request here

        const data = {
            title , 
            phone: localStorage.getItem("phone"),
            items: orderItems 
        }

        const response = await axios({
            method: "post",
            url: `${host}/api/orders/create`,
            headers: {
                "Content-Type": "application/json"
            },
            data
        });
        console.log(response);

        history.push("/home");

    };

    const handlePaymentClick = () => {
        setTimeout(() => {
            setOverlay(prev => true);
        } , 100);
        setPaymentSettingsVisibility(prev => true);
        paymentRef.current.style.bottom = "0";
    };
    
    const closeOverlay = () => {
        setOverlay(prev => false);
        setPaymentSettingsVisibility(prev => false);
        paymentRef.current.style.bottom = "-500px";
        shareRef.current.style.bottom = "-500px";
    };
    
    const handleShare = () => {
        setTimeout(() => {
            setOverlay(prev => true);
        } , 100);
        setPaymentSettingsVisibility(prev => true);
        shareRef.current.style.bottom = "0";
        
    };

    return (
        <>
            <Container className="">
                <BackButton className="mt-3 mb-4 d-flex align-items-center justify-content-between">
                    <img src={ArrowLeft} alt="arrow-left" onClick={() => history.goBack()} />
                    <img
                        src={PaymentSettingsSVG}
                        alt="payment-settings-svg"
                        onClick={ handlePaymentClick }
                    />
                </BackButton>

                <TitleBox>
                    <input
                        type="text"
                        id="title"
                        className="px-2 py-1"
                        placeholder="Order Title"
                        name="title"
                        value={title}
                        onChange={handleOnChangeTitle}
                        autoComplete="off"
                    />
                </TitleBox>

                <InputRowBox className="d-flex justify-content-between gap-4 mt-3 py-2">
                    <input
                        type="text"
                        placeholder="Item"
                        name="item"
                        id="item"
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        placeholder="Quantity"
                        name="quantity"
                        id="quantity"
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        name="pricePerItem"
                        id="pricePerItem"
                        autoComplete="off"
                    />
                </InputRowBox>

                <ListingBox className="my-5">
                    {orderItems.map((item, idx) => {
                        return (
                            <OrderListItem
                                key={`item${idx}`}
                                sno={idx + 1}
                                name={item.name}
                                quantity={item.quantity}
                                price={item.price}
                            />
                        );
                    })}
                </ListingBox>

                
                {!paymentSettingsVisibility && <OrderBottomBar className="mt-auto" handleShare={ handleShare } />}
                
                <div className="paymentCollapse" ref = {paymentRef}>
                    <PaymentSettingsCollapse
                        handleOnSave={ handleOnSave }
                        closeOverlay={ closeOverlay }
                    />
                </div>
                <div className="shareCollapse" ref = { shareRef }>
                    <ShareVia />
                </div>
                {overlay && <Overlay onClick={ closeOverlay }></Overlay>}
            </Container>
        </>
    );
}

export default OrderListing;