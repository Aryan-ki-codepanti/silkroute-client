import React from 'react'
import { useHistory } from 'react-router-dom';


const AddStyles = {
    backgroundColor: "#2A6059",
    outline: "3px solid #fff",
    position: "absolute",
    borderRadius: "50%",
    padding: "15px 27px",
    fontWeight: "600",
    fontSize: "24px",
    letterSpacing: "0.04em",
    lineHeight: "154.3%",
    cursor: "pointer",
    color: "#fff"
};

const AddOrderBtn = () => {
    const history = useHistory();

    return (
        <div 
            style={ AddStyles } 
            onClick={ () => history.push("/orderlisting") } 
        >
            +
        </div>
    );
};

export default AddOrderBtn;
