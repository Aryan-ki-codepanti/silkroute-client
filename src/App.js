import "./App.css";
import Home from "./components/Home";
import Landing from "./components/Landing";
// import OTP from "./components/OTP";
import OrderListing from "./components/OrderListing";
// import SignUp from "./components/SignUp";
import "./css/SignUp.css";
import "./css/utils.css";
import { BrowserRouter , Route , Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import OrderScreen from "./components/consumer/OrderScreen";
import PaymentSuccessful from "./components/consumer/PaymentSuccessful";
import StoreItem from "./components/store/StoreItem";
import BottomNavbar from "./components/store/BottomNavbar";
import AddOrderBtn from "./components/AddOrderBtn";


function App() {
    return (
        <div style={{minHeight: "100vh"}} className="">
            
            {/* <OrderListing /> */}
            {/* <div className="container px-4 border border-2 py-5" style={{width: "500px", position: "relative"}}> */}
                {/* <OrderSummaryListItem
                    title="Aditya's Order"
                    amount="670"
                    itemNumber="3"
                    status="Paid"
                />
                <OrderSummaryListItem
                    title="Shanti Niketan , Model Town"
                    amount="1220"
                    status="Billed"
                    itemNumber="12"
                /> */}
                {/* <SideMenu /> */}

                {/* <PaymentCard 
                    status="sale"
                    amount="1500"
                    message="Today's sale"
                />

                <PaymentCard 
                    status="pending"
                    amount="2000"
                    message="Pending payment"
                /> */}
                {/* <StoreItem />
                
                <BottomNavbar />
                
            </div> */}


            {/* <Landing name="Aryan" /> */}
            {/* <OTP></OTP> */}
            {/* <Home /> */}
            {/* <SignUp /> */}
            {/* <PaymentSuccessful/> */}
            {/* <OrderListing /> */}
            {/* <SignUp /> */}
            {/* <OTP phone="8700740353" /> */}
            

            {/* Router setup */}
                


            <BrowserRouter>
                <Switch>
                    <Route  path="/" exact component={SignUp} />
                    <Route  path="/landing" exact component={Landing} />
                    <Route  path="/home" exact component={Home} />
                    <Route  path="/paymentsuccessful" exact component={PaymentSuccessful} />
                    <Route  path="/orderlisting" exact component={OrderListing} />
                    <Route path="/orderview/:id" exact component={OrderScreen} />
                </Switch>
            </BrowserRouter>
            
        </div>
    );
}

export default App;
