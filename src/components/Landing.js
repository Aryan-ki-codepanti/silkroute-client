import React , { useEffect } from 'react'
import styled from 'styled-components';
import HelloThere from './HelloThere'
import HeroLanding from '../img/hero-signup.png';
import AddOrder from '../img/svg/add.svg';
import SideMenu from './SideMenu';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


// styled components
const Container = styled.div`
        max-width: 500px;
        margin: auto;
        padding: 1em 2em;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    `;


const ImgBox = styled.div`
    img{
        max-width: 344px;
        user-select: none;
        padding: 0 1.5em;
    }
`;

const HeroText = styled.div`
    h1{
        font-weight: 300;
        font-size: 36px;
        line-height: 56px;
        letter-spacing: .04em;
    }
    span{
        font-weight: 400;
        color: #2A6059;
        text-decoration: underline;
    }

`;

const AddBtnBox = styled.div`
    img{
        cursor: pointer;
        user-select: none;
    }
`;


export default function Landing(props) {
    const history = useHistory();
    const host = process.env.REACT_APP_SERVER_DOMAIN;

    

    const {username} =  props;
    // redirect if mobile is not in localStorage
    if (!localStorage.getItem("phone")){
        history.push("/");
    }

    useEffect(() => {

        const doRedirect = async () => {
            // redirect if there are orders
            if (localStorage.getItem("phone")){
                const data = await axios({
                    method: "post",
                    url: `${host}/api/orders`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        phone: localStorage.getItem("phone")
                    }
                });
                console.log("land -> " , data.data);
                if (data.data.length > 0){
                    console.log("To home");
                    history.push("/home");
                }
            }
        }

        doRedirect();

    }, []); //eslint-disable-line

    const handleAddOrderLanding = () => {
        history.push("/orderlisting");
    }

    return (
        <Container>
            <div className="mt-3 mb-4">
                <SideMenu />
            </div>
            <HelloThere name={username} />

            <ImgBox className="d-flex justify-content-center align-items-center">
                <img src={HeroLanding} alt="hero-landing-png" />
            </ImgBox>

            <HeroText className="mt-1 mb-5">
                <h1 className="text-center">
                    Start Taking <br />
                    <span className="mx-2">Orders</span>    
                     Today
                </h1>
            </HeroText>

            <AddBtnBox className="d-flex justify-content-center align-items-center mb-2">
                <img src={AddOrder} onClick={handleAddOrderLanding} alt="add-order-png" />
            </AddBtnBox>

        </Container>
    )
}

Landing.defaultProps = {
    username: "Aryan"
}
