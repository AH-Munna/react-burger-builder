import Ingredient from "../Ingredient/Ingredient";
import './Burger.css';

const Burger = props => {
    let ingredient = props.ingredients.map(item => {
        let itemAmount = [...Array(item.amount).keys()];
        return itemAmount.map(__ => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    }).reduce((arr, e) => {
        return arr.concat(e);
    }, []);

    if (!ingredient.length) ingredient = <p className="text-warning fs-4">Please add some ingredients.</p>

    return (
        <div className="Burger my-5">
            <Ingredient type='bread-top' />
            {ingredient}
            <Ingredient type='bread-bottom' />
        </div>
    );
}

export default Burger;