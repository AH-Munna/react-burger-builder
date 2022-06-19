import { Navigate, Route, Routes } from 'react-router-dom';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder.js';
import Orders from './Orders/Orders.js';
import Checkout from './Orders/Checkout/Checkout.js';
import Auth from '../Auth/Auth.js';
import LogOut from '../Auth/logout.js';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.state.auth.token,
        userId: state.state.auth.userId,
    }
}

const Body = props => {
    let authRoute = null;
    if (props.token && props.userId) {
        authRoute = <Routes>
            <Route exact path="/burger" element={<BurgerBuilder />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/logout" element={<LogOut />} />
            <Route exact path="/" element={<Navigate replace to="/burger" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    } else {
        authRoute = <Routes>
            <Route exact path="/auth" element={<Auth />} />
            <Route exact path="/" element={<Navigate replace to="/auth" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    }
    return (
        <div className='py-4'>
            {authRoute}
        </div>
    );
}

export default connect(mapStateToProps)(Body);