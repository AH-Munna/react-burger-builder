import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import OrderSummery from "./OrderSummery/OrderSummery";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { addIngredient, purchase, removeIngredient } from "../../../redux/ActionCreator";
import { INGREDIENT_PRICE } from "../../../redux/Reducer";

const mapStateToProps = state => {
    return {
        ingredients: state.state.ingredients,
        totalPrice: state.state.totalPrice,
        purchaseProps: state.state.purchase,
        ingredientPrice: INGREDIENT_PRICE,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addI: itemType => dispatch(addIngredient(itemType)),
        removeI: itemType => dispatch(removeIngredient(itemType)),
        purchase: () => dispatch(purchase()),
    }
}

class BurgerBuilders extends Component {
    state = { modalShow: false };

    modalShowHandle = () => { this.setState({ modalShow: true }) }
    modalHideHandle = () => { this.setState({ modalShow: false }) }
    addIngredient = type => {
        this.props.addI(type);
        this.props.purchase();
    }
    removeIngredient = type => {
        this.props.removeI(type);
        this.props.purchase();
    }
    checkout = () => { this.props.navigation('/checkout') }

    render() {
        return (
            <>
                <Modal isOpen={this.state.modalShow}>
                    <ModalHeader className="d-flex justify-content-center text-danger"><span className="fs-3">Your Order Summery</span></ModalHeader>
                    <ModalBody>
                        <div className="text-info fw-bold fs-4">Order amount</div>
                        <OrderSummery orders={this.props.ingredients} />
                        <h5 className="text-warning"> Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: '#D70F64' }} onClick={this.checkout}>Continue to checkout</Button>
                        <Button color="secondary" onClick={this.modalHideHandle}>Close</Button>
                    </ModalFooter>
                </Modal>
                <Row>
                    <Col lg={8}>
                        <Burger ingredients={this.props.ingredients} />
                    </Col>
                    <Col lg={4}>
                        <Controls
                            ingredientsAdd={this.addIngredient}
                            removeI={this.removeIngredient}
                            price={this.props.totalPrice}
                            modalShow={this.modalShowHandle}
                            iPrice={this.props.ingredientPrice}
                            purchase={this.props.purchaseProps} />
                    </Col>
                </Row>
            </>
        );
    }
}

// Wrapping for hook use in class
const BurgerBuilder = props => {
    const navigate = useNavigate();

    return <BurgerBuilders {...props} navigation={navigate} />;
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);