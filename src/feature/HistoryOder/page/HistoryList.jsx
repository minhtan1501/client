import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Paper,
  Table,
  TableBody,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import userApi from "../../../api/userApi";
import HistoryItem from "../components/HistoryItem";
import CircularProgress from "@mui/material/CircularProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(5),
  },
  table: {
    maxHeight: "60vh",
    overflowY: "auto",
    boxShadow: "1px 0px 10px #e1dbdb",
  },
  item: {
    fontWeight: "bold",
  },
  header: {
    padding: theme.spacing(3, 0),
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));
function HistoryList(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      try {
        if (user?.token) {
          console.log(user.token);
          const res = await userApi.getHistory({ token: user?.token });
          setData(res);
          setLoading(false);
        }
      } catch (err) {}
    })();
  }, [user]);
  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  console.log(data);
  return (
    <Container component={Paper} className={classes.root}>
      <Typography variant="h4" align="center" className={classes.header}>
        HISTORY ODER
      </Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left" className={classes.item}>
                OderID
              </TableCell>
              <TableCell align="center" className={classes.item}>
                Date Of Purchased
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <HistoryItem key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

HistoryList.propTypes = {};

export default HistoryList;
