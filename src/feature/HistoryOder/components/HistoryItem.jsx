import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatPrice } from "../../../utils";
const useStyles = makeStyles((theme) => ({
  item: {
    fontWeight: "bold",
  },
}));
function HistoryItem(props) {
  const classes = useStyles();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.paymentID}
        </TableCell>
        <TableCell align="center">
          {new Date(row.createdAt).toLocaleDateString("vi-VN")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.item}>Name</TableCell>
                    <TableCell className={classes.item} align="center">
                      Amount
                    </TableCell>
                    <TableCell className={classes.item} align="center">
                      Price
                    </TableCell>
                    <TableCell className={classes.item} align="center">
                      Total price ($)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.cart.map((historyRow) => (
                    <TableRow key={historyRow.product._id}>
                      <TableCell component="th" scope="row">
                        {historyRow.product.title}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.quantity}
                      </TableCell>
                      <TableCell align="center">
                        {formatPrice(historyRow.product.price)}
                      </TableCell>
                      <TableCell align="center">
                        {formatPrice(
                          Math.round(
                            historyRow.quantity * historyRow.product.price * 100
                          ) / 100
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

HistoryItem.propTypes = {};

export default HistoryItem;
