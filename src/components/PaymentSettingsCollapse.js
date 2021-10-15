import React , {useState} from 'react'
import styled from 'styled-components';
import PayNow from './PayNow';
import PayLater from './PayLater';
// styled components 

const Wrapper = styled.div`

    h3{
       font-weight : 700;
       font-size: 21px;
       line-height: 31px;
       color: #0F0F0F;
    }
`;

const PillBox = styled.div`

    gap:12px;

    button{
        background-color: #fff;
        border: 1px solid #DEDEDE;
        border-radius: 16px;
        letter-spacing: 0.015em;
        color: #0F0F0F;
        font-weight: 400;
        font-size: 14px;
        line-height: 15px;
        padding: 8.5px 12px;
    }

    .btn-active{
        color: #2A6059;
        background: #EAEFEE;
        border: 1px solid #2A6059;
    }


`;

const ContentBox = styled.div`
    min-height: 75px;
`;

const ButtonBox = styled.div`
    background-color: #fff;
    button{
        text-transform: uppercase;
        font-weight: 900;
        font-size: 15px;
        line-height: 18px;
        letter-spacing: 0.25px;
        border-radius: 8px;
        padding: 15px 0; 
    }

    .cancelBtn {
        background: #FFFFFF;
        border: 1.5px solid #2A6059;
        color: #2A6059;
    }
    
    .saveBtn{
        color: #FFFFFF;
        background: #2A6059;
    }

`;


const PaymentSettingsCollapse = ({ handleOnSave , closeOverlay }) => {

    const [payTime , setPayTime] = useState("now");
    return (
        <>
        
        <div style={{borderRadius: "16px 16px 0 0" , zIndex: "2000" , background: "white"}} className="mt-auto" >
            <Wrapper>
                <div>
                    <h3>Payment Settings</h3>
                    <PillBox className="d-flex mt-5">
                        <button onClick={() => setPayTime("now")} className={ payTime === "now" ? "btn-active": ""}> Pay Now </button>
                        <button onClick={() => setPayTime("later")} className={ payTime === "later" ? "btn-active": ""} > Pay Later </button>
                    </PillBox>

                    <ContentBox > 

                        { payTime === "now" ? (<PayNow />) : (<PayLater />)}
                        
                    </ContentBox>

                    <ButtonBox className="d-flex gap-3 mt-4">
                        <button 
                            className="btn cancelBtn w-100" 
                            onClick={ closeOverlay }
                        >
                            Cancel
                        </button>
                        <button 
                            className="btn saveBtn w-100" 
                            onClick={ handleOnSave }
                        >
                            Save
                        </button>
                    </ButtonBox>
                </div>

            </Wrapper>
        </div>
        
        </>
    )
}

export default PaymentSettingsCollapse;