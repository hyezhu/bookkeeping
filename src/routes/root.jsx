import * as React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Root() {
  const urlAcc = "https://bookkeeping-23.herokuapp.com/accounts";
  const [accounts, setAccounts] = React.useState([]);

  const [receiverAccount, setReceiverAccount] = React.useState(null);
  const [senderAccount, setSenderAccount] = React.useState(null);
  const [answer, setAnswer] = React.useState("");

  const fetchAccounts = async () => {
    try {
      const response = await fetch(urlAcc);
      const jsonData = await response.json();
      setAccounts(jsonData);
    } catch (err) {
      console.error("Error fetching", err);
    }
  };

  React.useEffect(() => {
    fetchAccounts();
  }, []);

  const defaultProps = {
    options: accounts,
    getOptionLabel: (option) => `${option.id} ${option.name}`,
  };

  const handleRuleCheck = async () => {
    try {
      const response = await fetch(
        "https://bookkeeping-23.herokuapp.com/check-rule",
        {
          method: "POST",
          body: JSON.stringify({
            receiverAccount: receiverAccount.id,
            senderAccount: senderAccount.id,
          }),
        }
      );
      console.log(response);
      const data = await response.text();
      setAnswer(data);
    } catch (err) {
      console.error("Some error occurred", err);
    }
  };

  return (
    <>
      <Container className="container">
        <h1>Page 1</h1>
        <Link to="/next">Next page</Link>
        <h2>Rule Check</h2>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "500px" },
          }}
          margin="normal"
        >
          <Autocomplete
            {...defaultProps}
            id="pick-account"
            includeInputInList
            value={receiverAccount}
            onChange={(event, newValue) => {
              setReceiverAccount(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="input input-1"
                label="Pick Receiver Account"
                variant="standard"
                required
              />
            )}
          />
        </Box>

        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "500px" },
          }}
          margin="normal"
        >
          <Autocomplete
            {...defaultProps}
            id="pick-account"
            includeInputInList
            value={senderAccount}
            onChange={(event, newValue) => {
              setSenderAccount(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="input input-2"
                label="Pick Sender Account"
                variant="standard"
                required
              />
            )}
          />
        </Box>

        <Button className="btn" size="large" onClick={handleRuleCheck}>
          Check
        </Button>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "500px" },
          }}
          noValidate
          autoComplete="off"
          margin="normal"
        >
          <TextField
            id="answer"
            variant="standard"
            fullWidth
            readOnly
            value={answer}
          />
        </Box>
      </Container>
    </>
  );
}
