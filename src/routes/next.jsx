import * as React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Input from "@mui/material/Input";

import DeleteIcon from "@mui/icons-material/Delete";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function Next() {
  const urlAcc = "https://bookkeeping-23.herokuapp.com/accounts";
  const urlRules = "https://bookkeeping-23.herokuapp.com/rules";

  const [accounts, setAccounts] = React.useState([]);
  const [rule, setRule] = React.useState("");
  const [rules, setRules] = React.useState([]);

  const [receiverAccount, setReceiverAccount] = React.useState(null);
  const [senderAccount, setSenderAccount] = React.useState(null);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(urlAcc);
      const jsonData = await response.json();
      setAccounts(jsonData);
    } catch (err) {
      console.error("Error fetching", err);
    }
  };

  const fetchRules = async () => {
    try {
      const response = await fetch(urlRules);
      const jsonData = await response.json();
      setRules(Array.from(jsonData));
    } catch (err) {
      console.error("Error fetching", err);
    }
  };

  React.useEffect(() => {
    fetchAccounts();
    fetchRules();
  }, []);

  const defaultProps = {
    options: accounts,
    getOptionLabel: (option) => `${option.id} ${option.name}`,
  };

  const handleRuleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(urlRules, {
        method: "POST",
        // headers: {
        //   "Accept": "application/json, text/plain",
        //   "Content-Type": "application/json;charset=UTF-8",
        // },
        // mode: "no-cors",

        body: JSON.stringify({
          receiverAccount: receiverAccount.id,
          senderAccount: senderAccount.id,
          name: rule,
        }),
      });

      const data = await response.json();
      console.log(data);
      fetchRules();
      if (response.status === 200) {
        alert("Rule created successfully");
      }
    } catch (err) {
      console.error("Error submitting rule", err);
    }
  };

  const columns = [
    { id: "name", label: "Rule", minWidth: 30 },

    {
      id: "receiverAccount",
      label: "Receiver Account",
      minWidth: 30,
      align: "right",
      // format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "senderAccount",
      label: "Sender Account",
      minWidth: 30,
      align: "right",
      // format: (value) => value.toLocaleString("en-US"),
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`${urlRules}/${id}`, { method: "DELETE" });
      const data = await response.json();
      console.log(data);
      fetchRules();
      if (response.status === 200) {
        alert("Rule deleted successfully");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // const handleEdit = async (id) => {
  //   try {
  //     const response = await fetch(`${urlRules}/${id}`, {
  //       method: "PUT",
  //       body: { name: rule },
  //     });
  //     const data = await response.json();
  //     // setRules(data));
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  return (
    <>
      <Container className="container">
        <h1>Bookkeeping p.2</h1>
        <Link to="/">⬅️ Back</Link>

        <h2>Create new rule</h2>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "100%", maxWidth: 480 },
          }}
          margin="normal"
        >
          <Autocomplete
            {...defaultProps}
            id="receiver"
            includeInputInList
            value={receiverAccount}
            onChange={(event, newValue) => {
              setReceiverAccount(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="input"
                label="Pick Receiver Account"
                variant="standard"
                fullWidth
                required
              />
            )}
          />
        </Box>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "100%", maxWidth: 480 },
          }}
          margin="normal"
        >
          <Autocomplete
            {...defaultProps}
            id="sender"
            includeInputInList
            value={senderAccount}
            onChange={(event, newValue) => {
              setSenderAccount(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="input"
                label="Pick Sender Account"
                variant="standard"
                fullWidth
                required
              />
            )}
          />
        </Box>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%", maxWidth: 480 },
          }}
          noValidate
          autoComplete="off"
          margin="normal"
          onSubmit={handleRuleSubmit}
        >
          <Input
            id="rule"
            variant="filled"
            required
            fullWidth
            placeholder="create new rule here"
            onChange={(e) => setRule(e.target.value)}
          />
        </Box>
        <Button onClick={handleRuleSubmit} className="btn" size="large">
          Save rule
        </Button>

        <h2>List of Rules</h2>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  {/* <TableCell>Edit</TableCell> */}
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rules
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}

                        {/* <TableCell key={`edit${row.id}`}>
                         
                              <IconButton
                                type="button"
                  
                              >
                                {open ? (
                                  <CheckIcon
                                    onClick={() => {
                                      const id = row.id;
                                      handleEdit(id);
                                    }}
                                  />
                                ) : (
                                  <EditIcon />
                                )}
                              </IconButton>
                              {open && (
                                <label>
                                  Rule: <input type="text" />
                                </label>
                              )}
                        </TableCell> */}
                        <TableCell key={`delete${row.id}`}>
                          <IconButton
                            onClick={() => {
                              const id = row.id;
                              handleDelete(id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={Math.floor(rules.length / 10) + 1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
}
