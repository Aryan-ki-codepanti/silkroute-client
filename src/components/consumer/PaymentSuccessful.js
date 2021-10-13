import React from 'react'
import styled from 'styled-components';
import PaymentSuccessfulImg from '../../img/payment-successful.png';


// styled components
const Container = styled.div`
        max-width: 500px;
        margin: auto;
        padding: 1em 2em;
        
    `;


const ImgBox = styled.div`
    img{
        max-width: 344px;
        user-select: none;
        padding: 0 1.5em;
    }
`;

const TopBox = styled.div`
    h1{
        font-weight: 700;
        font-size: 30px;
        line-height: 47px;
        text-align: center;
        color: #2A6059;
    }

    p{
        color: #1C2A32;
        font-weight: 300;
        font-size: 14px;
        line-height: 22px;
    }
    `;

const BottomBox = styled.div`

    span{
        color: #9B9B9B;
        font-weight: 300;
        font-size: 14px;
        line-height: 22px;

    }

    p{
        color: #1C2A32;
        font-weight: 300;
        font-size: 14px;
        line-height: 22px;
    }
`;


const PaymentSuccessful = (props) => {

    const {name , address} = props;
    return (
        <Container className="d-flex flex-column align-items-center  justify-content-center gap-5">
            <TopBox className="text-center">
                <h1> Payment Successful </h1>
                <p> You can also create your own order and <br /> share with {name} </p>
            </TopBox>

            <ImgBox>
                <img src={PaymentSuccessfulImg} alt="payment-successful-png" />
            </ImgBox>

            <BottomBox className=" text-center">
                <span> Delivery at </span>
                <p> {address} </p>
            </BottomBox>

        </Container>
    )
}

export default PaymentSuccessful;

PaymentSuccessful.defaultProps = {
    name: "Aryan", 
    address: "B-4 , 174 Pitampura , America"
}
