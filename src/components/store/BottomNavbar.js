import React from "react";
import styled from "styled-components";

// styled sub-components
const NavContainer = styled.div`
    background: #fff ;
    position: relative;
    margin-top: 39em;
    /* z-index: 0; */
`;


const AddButtonCircle = styled.div`
    background-color: #000;
    outline: 3px solid #fff;
    position: absolute;
    border-radius: 50%;
    padding: 15px 27px;
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.04em;
    line-height: 154.3%;
    cursor: pointer;
    color: #fff;
    
    /* Positioning */
    transform: translateX(-50%);
    left: 50%;
    z-index: 1000;
    bottom: 25%;
`;

const Navbar = styled.div`
    background-color: #000;

    p{
        margin-bottom: 0;
        color: rgba(255, 255, 255, 0.56);
        font-size: 1rem;
        letter-spacing: 0.04em;
        mix-blend-mode: luminosity;
        cursor: pointer;
        font-weight: 400;
        padding: 13px 21px;
    }

    p.border-right{
        border-right: 0.5px solid #C4C4C4;
    }

    p.active{
        color: #fff;
        font-weight: 900;
    }
`;


const BottomNavbar = () => {
    return (
    <NavContainer>
        <AddButtonCircle>
            +
        </AddButtonCircle>
        <Navbar className="d-flex justify-content-between" >
            {/* Left Portion */}

            <div className="d-flex">
                <p className="active border-right"> Home </p>
                <p > Lorem </p>
            </div>

            <div className="d-flex">
                <p className="border-right"> Payments </p>
                <p > Store </p>
            </div>
        </Navbar>
    </NavContainer>
    );
};

export default BottomNavbar;
