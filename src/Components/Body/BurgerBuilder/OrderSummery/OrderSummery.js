const OrderSummery = props => {
    const summery = props.orders.map(item => {
        return (
            <li key={item.type}>
                <span className="text-success fs-5" style={{ textTransform: "capitalize" }}>{item.type}: {item.amount}</span>
            </li>
        );
    })
    return (
        <>
            <ul className="mb-4">
                {summery}
            </ul>
        </>
    );
}

export default OrderSummery;