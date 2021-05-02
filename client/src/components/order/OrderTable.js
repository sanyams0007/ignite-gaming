import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

const columns = [
  { id: "OrderID", label: "OrderID", minWidth: 170 },
  { id: "ItemCount", label: "Num of Items", minWidth: 50 },
  {
    id: "Amount",
    label: "Amount",
    minWidth: 100,
    align: "left",
    format: (value) => `$ ${value.toLocaleString("en-US")}`,
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 100,
    align: "right",
    format: (value) =>
      String(value).includes("Delivered") ? (
        <span style={{ color: "green" }}>{value.toLocaleString("en-US")}</span>
      ) : (
        <span style={{ color: "red" }}>{value.toLocaleString("en-US")}</span>
      ),
  },
  {
    id: "Date",
    label: "Placed On",
    minWidth: 100,
    align: "right",
    format: (value) => new Date(value).toLocaleDateString(),
  },
  {
    id: "Detail",
    label: "More Info.",
    minWidth: 100,
    align: "right",
    format: (value) => <Link to={value}>Detail</Link>,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    border: "1px solid gray",
    "& .MuiListItem-root.Mui-selected": {
      color: "#fff",
    },
  },
  container: {
    minHeight: "50vh",
  },
  pagination: {
    "& .MuiSelect-root": {
      color: "#fff",
    },
    "& .MuiSvgIcon-root": {
      fill: "#fff",
    },
    "& .MuiListItem-root.Mui-selected": {
      backgroundColor: "#fff",
    },
  },
}));

export default function StickyHeadTable({ rows }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[7, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
