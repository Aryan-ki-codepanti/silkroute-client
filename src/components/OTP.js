import React, { useState , useEffect } from 'react'
import styled from 'styled-components'
import otpImg from '../img/OTP.png'
import pencil from '../img/svg/pencil.svg'
import axios from 'axios'


const Container = styled.div`
        max-width: 500px;
        margin: auto;
        padding: 2em;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    `;

const ImgBox = styled.div`
    img{
        max-width: 276px;
    }
`;

const ContentBox = styled.div`
    text-align: center;


    p {
        font-weight: 300;
        font-size: 14px;
        line-height: 22px;
        color: #1C2A32;
    }

    span{
        color: #567DF4;
        font-weight: 400;
        font-size: 16px;
        cursor: pointer;
    }

`;

const InputNums = styled.div`
    input {
        max-width: 55px;
        border: 1px solid #DFE7E6;
        box-sizing: border-box;
        border-radius: 10px;
        padding: 0.5em;
        text-align: center;
    }
` ;

const VerifyBtn = styled.div`
    button{
        background-color: #2A6059;
        text-align: center;
        color: #fff;
        font-weight: 700;
        line-height: 25px;
        letter-spacing: 0.04em;
        border: none;
        border-radius: 10px;
        padding: 0.5em 7.5em;
    }

` ;
const OTPReceive = styled.div`
    p{
        font-weight: 300;
        font-size: 14px;
        line-height: 22px;
        color: #7C7C7C; 
    }
    
    span{
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        color: #2A6059; 
        text-transform: uppercase;

    }
` ;

const Wrapper = styled.div``;


export default function OTP(props) {
    const host = process.env.REACT_APP_SERVER_DOMAIN;


    const [input , setInput] = useState({
        num1: '',
        num2: '',
        num3: '',
        num4: ''
    });
    const [ userOTP , setOTP] = useState('');

    const handleOnChange = (event)=>{

        let reg = /^([0-9])$/;
        if (reg.test(event.target.value) || event.target.value.length === 0){
            const {name , value} = event.target;
            setInput({
                ...input ,
                [name] : value
            });
            
            let inputNum = Number(event.target.id.slice(3,));
            if (inputNum < 4 && reg.test(event.target.value)){
                document.getElementById(`num${inputNum+1}`).focus();
            }
            else{
                document.getElementById("verifyBtn").focus();
            }            
        }
    }
    
    const createUserIfExists = async(phone) => {
        // API Call
        await axios({
            method: "post",
            url: `${host}/api/users/create`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                phone: phone
            }
        });
    }

    const handleVerifyClick = ()=>{
        setOTP(Object.values(input).join(""));

        let phone = localStorage.getItem("phone");
        
        axios.get(`http://localhost:3001/verify?phone=${phone}&code=${userOTP}`)
                                                                .then(res => {
                                                                    const success = res.data.valid;
                                                                    if (success){
                                                                        // create user if not exists
                                                                        createUserIfExists(phone);
                                                                        // redirect to landing
                                                                        // setRedirect(prev => true);
                                                                        document.location = "/landing";
                                                                        // history.push("/landing");
                                                                    }
                                                                    else{
                                                                        alert("Invalid OTP!!! Try again");
                                                                    }
                                                                }).catch(err => {
                                                                    console.log(err);
                                                                    alert("Invalid OTP!!! Try again");
                                                                });

    }
    
    const handleOnInput = ()=>{
        setOTP(Object.values(input).join(""));
    }
    
    useEffect(()=>{
        setOTP(Object.values(input).join(""));
    } , [input.num1 , input.num2 , input.num3 , input.num4]); // eslint-disable-line
    
    
    useEffect(() => {
        let phone = localStorage.getItem("phone");
        axios.get(`http://localhost:3001/login?phone=${phone}`).then().catch(err => {
            console.log(err);
        });
    }, []);

    // fetch phone number from localStorage
    const phone = localStorage.getItem("phone"); 
    
    return (
        <Container>

            <ImgBox className="d-flex justify-content-center align-items-center px-3">
                <img src={otpImg} alt="otp-img" />
            </ImgBox>

            <ContentBox className="my-5">
                <p>We have a sent a verification code to <br /> your registered phone number</p>
                <span  className="d-flex justify-content-center align-items-center">{phone} <img src={pencil} alt="pencil-svg" /> </span>
            </ContentBox>

            <Wrapper className="px-3">
                <InputNums className="d-flex justify-content-center gap-4">
                    <input autoComplete="off" onInput={handleOnInput} type="tel" name="num1"  value={input.num1} id="num1" onChange={handleOnChange}/>
                    <input autoComplete="off" onInput={handleOnInput} type="tel" name="num2"  value={input.num2} id="num2" onChange={handleOnChange}/>
                    <input autoComplete="off" onInput={handleOnInput} type="tel" name="num3"  value={input.num3} id="num3" onChange={handleOnChange}/>
                    <input autoComplete="off" onInput={handleOnInput} type="tel" name="num4"  value={input.num4} id="num4" onChange={handleOnChange}/>
                </InputNums>
            </Wrapper>

            <VerifyBtn className="d-flex justify-content-center align-items-center my-4 mx-2">
                <button id="verifyBtn"  type="button" onClick={handleVerifyClick}>Verify</button>
            </VerifyBtn>

            <OTPReceive className="text-center px-4">    
                <p className="mb-1">Didn't receive OTP</p>
                <span>Resend</span>
            </OTPReceive>

        </Container>
    
    )
}
