import axios from "axios";
import React, { useEffect , useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import walletPNG from "../../img/wallet-1.png";
import OrderListItem from "../OrderListItem";


// styled components
const Container = styled.div`
    position: relative;
    max-width: 500px;
    margin: auto;
    padding: 1em 2em;
    min-height: calc(100vh - 137px);
    display: flex;
    flex-direction: column;
`;

const OrderInfo = styled.div`
    background-color: #2a6059;
    background-image: url(${walletPNG});
    background-repeat: no-repeat;
    background-position: right bottom;
    padding: 1.4em 1.2em;
    border-radius: 0px 0px 15px 15px;

    @media (min-width: 768px) {
        width: 70%;
        max-width: 500px;
        margin: auto;
    }

    .heading {
        font-weight: 400;
        font-size: 12px;
        line-height: 13px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.4);
    }

    .order-amount {
        font-weight: 700;
        font-size: 24px;
        line-height: 26px;
        color: #fff;
    }

    .order-address {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #fff;
    }
`;

const StoreHead = styled.h1`
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 31px;
    color: #0f0f0f;
    text-transform: capitalize;
`;

const Footer = styled.div`
    /* margin-top: auto; */
    background-color: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 0.6em 0.5em;
    z-index: 100;

    @media (min-height: 1000px) {
        bottom: 21vh;
    }

    textarea{
        background: rgba(116, 116, 116, 0.08);
        border-radius: 8px;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #878787;
        width: 100%;
        border: none;
    }

    textarea:focus{
        outline: none;
    }

    button{
        text-transform: uppercase;
        color: #fff;
        font-weight: 900;
        font-size: 15px;
        line-height: 18px;
        letter-spacing: 0.25px;
        width: 100%;
        background-color: #2A6059;
        border: none;
        border-radius: 8px;
        padding: 1em;
    }

`;

const StoreName = ({ name }) => {
    return <StoreHead className="order-store-name my-3"> {name} </StoreHead>;
};

const OrderTop = ({ amount, address }) => {
    return (
        <OrderInfo>
            <p className="mb-0 heading">bill amount</p>
            <p className="order-amount"> &#8377; {amount}</p>

            <p className="mb-0 heading">delivery address</p>
            <span className="order-address">{address}</span>
        </OrderInfo>
    );
};

const ListOrderBox = ({ orderItems }) => {
    return orderItems.map((item, idx) => (
        <OrderListItem key={`item${idx}`} sno={idx + 1} {...item} />
    ));
};

const OrderScreen = ({ match }) => {
    const host = "http://localhost:3001";

    const [amount , setAmount] = useState(0);
    const [address , setAddress] = useState("D 49 , Asian Games Village");
    const [orderItems , setOrderItems] = useState([]);
    const [storeName , setStoreName] = useState("Robin Store");
    const [userNote , setUserNote] = useState("");


    const handleNoteChange = event => {
        setUserNote(prev => event.target.value);
    };

    useEffect(() => {

        const fetchId = match.params.id;

        const getData = async () => {
            try{
                const data = await axios({
                    method: "GET",
                    url: `${host}/api/orders/order/${fetchId}`,
                });
                const {amount , items} =  data.data;
                // Setting states
                setAmount(prev => amount);
                setOrderItems(prev => items);
                //TODO: Set address and store name
                
            }
            catch(error){
                // TODO: Handle error
                console.log(error);
            }
        }
        getData();
    }, []);//eslint-disable-line

    return (
        <>
            <OrderTop amount={ amount } address={ address } />
            <Container className="position-relative"> 
                <StoreName name={ storeName } />

                <ListOrderBox orderItems={ orderItems } />

                <Footer className="position-absolute">
                    <textarea 
                        name="note" 
                        id="note" 
                        rows="3"
                        placeholder="Add Note"
                        className="px-3 py-2 my-2"
                        value={ userNote }
                        onChange={ handleNoteChange }
                    >

                    </textarea>
                    <button> Pay &#8377; { amount } now </button>
                </Footer>
            </Container>
        </>
    );
};

export default withRouter(OrderScreen);
