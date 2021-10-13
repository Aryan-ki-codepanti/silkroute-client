import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideMenu from "./SideMenu";
import HelloThere from "./HelloThere";
import PaymentCard from "./PaymentCard";
import OrderSummaryListItem from "./OrderSummaryListItem";
import axios from "axios";
import { useHistory } from "react-router-dom";

// styled components
const Container = styled.div`
    max-width: 500px;
    margin: auto;
    padding: 1em 2em;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const OrdersBox = styled.div`
    
`;

const OrderListingStatus = styled.div`


    ul li {
        list-style: none;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        letter-spacing: 0.04em;
        color: rgba(0, 0, 0, 0.4);
        cursor: pointer;
    }

    ul .active {
        font-weight: 700 !important;
        color: #2A6059 !important;
    }


`;

const Home = (props) => {
    const { username } = props;
    const history = useHistory();
    const host = process.env.REACT_APP_SERVER_DOMAIN;

    // redirect if mobile is not in localStorage
    if (!localStorage.getItem("phone")){
        history.push("/");
    }



    
    const [orderListingStatus, setOrderListingStatus] = useState("pending");
    const [orders , setOrders] = useState([]);
    const [pendingPayment , setPendingPayment] = useState(0);
    const [todaySale , setTodaySale] = useState(0);
    const [paidOrders, setPaidOrders] = useState([]);
    const [billedOrders, setBilledOrders] = useState([]);

    const handlePendingPayment = (orderList) => {
        const billedOrders = orderList.filter(order => order.status === "billed");
        if (billedOrders.length === 0){
            return
        }
        const pendingAmt = billedOrders.map(x => x.amount).reduce((x,y) => x + y);
        setPendingPayment(prev => pendingAmt);

    }

    const handleTodaySale = (orderList) => {
        const todayDate = new Date();
        const todayOrders = orderList.filter(order => {
            const orderDate = new Date(order.date);
            return (orderDate.getDate() === todayDate.getDate() 
                && orderDate.getMonth() === todayDate.getMonth()
                && orderDate.getFullYear() === todayDate.getFullYear()) ;
        });
        if (todayOrders.length === 0){
            return
        }
        const todayAmt = todayOrders.map(x => x.amount).reduce((x,y) => x + y);
        setTodaySale(prev => todayAmt);
    };

    const handlePaidOrders = (orderList) => {
        setPaidOrders(prev => orderList.filter(order => order.status === "paid"));
    };

    const handleBilledOrders = (orderList) => {
        setBilledOrders(prev => orderList.filter(order => order.status === "billed"));
    };
    
    useEffect(() => {
        const getOrders = async (phone)=>{
            const data = await axios({
                method: "post",
                url: `${host}/api/orders`,
                data: {phone}
            });

            // setting orders
            setOrders(prevOrders => data.data);
            console.log( "orders -> ",  data.data);
            
            if (data.data.length !== 0){
                //TODO handle pending payment and today Sale
                console.log("Ran");
                handlePendingPayment(data.data);
                handleTodaySale(data.data);
    
                // setting billed and paid states
                handlePaidOrders(data.data);
                handleBilledOrders(data.data);
            }


        }
        
        if (localStorage.getItem("phone")){
            getOrders(localStorage.getItem("phone"));
        }



    }, []); //eslint-disable-line
    
    

    
    return (
        <Container>
            <div className="mt-3 mb-4">
                <SideMenu />
            </div>

            <HelloThere name={username} />
            <div className="d-flex gap-4 my-3">
                <PaymentCard status="sale" message="Today's sale" amount={todaySale}/>
                <PaymentCard status="pending" message="pending payment" amount={pendingPayment} />
            </div>


            <OrderListingStatus>
                <ul className="p-0 m-0 d-flex gap-5">
                    <li className={orderListingStatus === "pending" ? "active" : ""} onClick={() => setOrderListingStatus(prev => "pending")}> Pending Orders  </li>
                    <li className={orderListingStatus === "all" ? "active" : ""} onClick={() => setOrderListingStatus(prev => "all")}> All Orders  </li>
                    <li className={orderListingStatus === "update" ? "active" : ""} onClick={() => setOrderListingStatus(prev => "update")}> Update Orders  </li>
                </ul>
            </OrderListingStatus>


            {/* render orders acc to listing status all (billed + paid) pending -> "billed" update -> "Paid"  */}
            <OrdersBox className="d-flex flex-column gap-3 my-3">
                {
                    orderListingStatus === "all" ? (
                        
                        orders?.length === 0 
                        ? "NO  orders till now :(" 
                        : orders.map(order => {
                            return (
                                <OrderSummaryListItem key={order._id} title={order.title} amount={order.amount} status={order.status} itemNumber={order.items.length} />
                            )
                        }) ) 
                    :
                    (orderListingStatus === "pending" ? (
                        billedOrders?.length === 0 
                        ? "NO billed orders  :(" 
                        : billedOrders.map(order => {
                            return (
                                <OrderSummaryListItem key={order._id} title={order.title} amount={order.amount} status={order.status} itemNumber={order.items.length} />
                            )
                        })
                        
                    )
                    :
                        paidOrders?.length === 0 
                        ? "No paid orders  :(" 
                        : paidOrders.map(order => {
                                return (
                                    <OrderSummaryListItem key={order._id} title={order.title} amount={order.amount} status={order.status} itemNumber={order.items.length} />
                                )
                            }) // paid in update
                    )
                }
            </OrdersBox>

        </Container>
    );
};

export default Home;

Home.defaultProps = {
    username: "Aryan",
};
