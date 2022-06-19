import { Row } from 'react-bootstrap';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import '../Ingredient/Ingredient.css';
import '../../../Header/NavigationBar.css';

const controls = [
    { label: "Meat", type: 'meat' },
    { label: "Salad", type: 'salad' },
    { label: "Cheese", type: 'cheese' },
];
const BuildControl = props => {
    return (
        <div className='d-flex justify-content-center'>
            <Row className='my-2'><div className='me-auto ms-3 fs-4 text-info text-center fw-bold'>{props.label}({props.iPrice[props.type]}/-)</div>
                <button
                    className='btn btn-outline-danger px-3 fw-bold fs-5 py-1 m-1 rounded-pill'
                    onClick={props.removeI}>Less</button>
                <button className='btn btn-outline-success px-3 fw-bold fs-5 py-1 m-1 rounded-pill' onClick={props.addIngredient}>More</button>
            </Row >
        </div>
    );
}

const Controls = props => {
    // debugger
    return (
        <Card className='my-5 shadow'>
            <CardHeader className='bg-danger text-white'><h4 className='text-center'>Add Ingredients</h4></CardHeader>
            <CardBody className='transparentBG'>
                {controls.map(item => <BuildControl
                    label={item.label}
                    type={item.type}
                    key={Math.random()}
                    addIngredient={() => props.ingredientsAdd(item.type)}
                    removeI={() => props.removeI(item.type)}
                    iPrice={props.iPrice} />)}
            </CardBody>
            <CardFooter className='bg-info text-white'><h5 className='text-center'>Price: <b className='fs-4'>{props.price}</b>/-</h5></CardFooter>
            <Button disabled={!props.purchase} color="outline-danger" className='fs-5 fw-bold' onClick={props.modalShow}>Order Now</Button>
        </Card>
    );
}

export default Controls;