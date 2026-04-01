
import { Button } from "@material-ui/core";
import "../scss/general.scss";
import "../scss/booking.scss";

function PayBtn(props) {
    const classes = useStyles();
    return (
        <>
            <Button disabled={props.disabled} className={`btn-pay-now ${classes.buttonNoHover}`} variant="contained" onClick={props.Onclick} type="button">Pay Now</Button>
        </>
    );
};

export default PayBtn;
