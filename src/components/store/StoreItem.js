import React from "react";
import styled from "styled-components";

// styled components
const TopRow = styled.div`
    h3 {
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.0028em;
    }
`;

const BottomRow = styled.div`
    span {
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        letter-spacing: 0.0028em;
    }

    p {
        font-size: 12px;
        font-family: "DM Sans" !important;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: -0.02em;
        border-radius: 58px;
        padding: 3px 8px;
    }

    .status-paid {
        color: #05cd99;
        background: rgba(5, 205, 153, 0.1);
    }

    .status-billed {
        color: #f8ac42;
        background: rgba(255, 201, 126, 0.4);
    }
`;

const Wrapper = styled.div`
    background: #ffffff;
    box-shadow: 0px 6px 10px rgba(112, 144, 176, 0.09);
    border-radius: 8px;
    min-width: 19rem;
    padding: 10px 12px;
`;

const CatalogueItem = ({ title, amount, status, itemNumber }) => (
    <div>
        <Wrapper>
            <TopRow className="d-flex justify-content-between align-items-center mb-1">
                <h3 className="mb-0">{title}</h3>
                <h3 className="mb-0">
                    &#8377;<span className="ms-1">{amount}</span>
                </h3>
            </TopRow>
            <BottomRow className="d-flex justify-content-between align-items-center">
                <span>{itemNumber} Items</span>
                <p className={`status-${status.toLowerCase()} mb-0`}>
                    {status}
                </p>
            </BottomRow>
        </Wrapper>
    </div>
);

export default CatalogueItem;

CatalogueItem.defaultProps = {
    title: "Aryan's Order" , 
    amount: 800 ,
    status: "Paid" ,
    itemNumber: 4
};