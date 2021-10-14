import React , { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SideMenuSvg from "../img/svg/side-menu.svg";


// styled components
const LinkList = styled.ul`
    li{
        list-style: none;
        color: #2A6059;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
    }
`;

const SideMenu = (props) => {
    const history = useHistory();
    const launchBtn = useRef(null);

    const handleSideImgClick = () => {
        launchBtn.current.click();
    };
    
    // dangerous
    const handleLogout = () => {
        launchBtn.current.click();
        localStorage.removeItem("phone");
        history.push("/");
    }
    
    const handleAddOrder = () => {
        launchBtn.current.click();
        history.push("/orderlisting");
    };

    return (
        <>
        <div>
            <img width="24px" style={{cursor: "pointer"}} src={SideMenuSvg} alt="side-menu-svg" onClick={handleSideImgClick}/>
        </div>
                {/* <!-- Button trigger modal --> */}
        <button ref={launchBtn} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header d-flex">
                <h5 className="flex-grow-1 modal-title text-center" id="exampleModalLabel"> My Actions</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <LinkList>
                    <li onClick={handleAddOrder}>  Add New Order   </li>
                    
                </LinkList>
            </div>
            <div className="modal-footer">
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default SideMenu
