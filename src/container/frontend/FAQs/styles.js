import { makeStyles } from "@material-ui/core";
import { borderRadius } from "@material-ui/system";

export const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
    },
    heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
    },
    datatableContainer1: {
        top: '60px',
        position: 'relative',
        margin: '0 20px',
        background: '#fff',
        borderRadius: '12px',
        padding: '0px 15px 0px 15px',
        minHeight: '65vh',
    },
    backgroundAccordin: {
        width: '1007px',
        height: '81px',
        background:' rgba(217, 217, 217, 0.2)',
        borderRadius: '20px !important'
}
}));