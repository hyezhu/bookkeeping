import * as React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import Input from "@mui/material/Input";

export default function Next() {
  const urlAcc = "https://bookkeeping-23.herokuapp.com/accounts";
  const urlRules = "https://bookkeeping-23.herokuapp.com/rules";

  const [accounts, setAccounts] = React.useState([]);
  const [rule, setRule] = React.useState("");

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
      setRule(Array.from(jsonData));
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
      if (response.status === 200) {
        alert("Rule created successfully");
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.error("Error submitting rule", err);
    }
  };

  return (
    <>
      <Container className="container">
        <h1>Bookkeeping p.2</h1>
        <Link to="/">⬅️ Back</Link>

        <h2>Create new rule</h2>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "500px" },
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
            "& > :not(style)": { m: 1, width: "500px" },
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
            "& > :not(style)": { m: 1, width: "500px" },
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
        <Box>
          {/* <h2>List of Rules</h2> */}
          <List sx={{ width: "100%", maxWidth: 480 }}>
            {/* {rules && rules.map(rule => { 
              return (
                <ListItem
                  key={rule.id}
                  disableGutters
                  secondaryAction={
                    <>
                      <IconButton className="btn btn-edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton className="btn btn-delete">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={`From ${rule.receiverAcc} to ${rule.senderAcc}`}
                  />
                </ListItem>
            );})
              }
             */}
          </List>
        </Box>
      </Container>
    </>
  );
}
