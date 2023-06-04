import * as React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Input from "@mui/material/Input";

import PopupEdit from "./modal.jsx";
import RuleTable from "./table.jsx";

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

  // const columns = [
  //   { id: "name", label: "Rule", minWidth: 30 },

  //   {
  //     id: "receiverAccount",
  //     label: "Receiver Account",
  //     minWidth: 30,
  //     align: "right",
  //     // format: (value) => value.toLocaleString("en-US"),
  //   },
  //   {
  //     id: "senderAccount",
  //     label: "Sender Account",
  //     minWidth: 30,
  //     align: "right",
  //     // format: (value) => value.toLocaleString("en-US"),
  //   },
  // ];

  const handleDeleteRule = async (id) => {
    try {
      const response = await fetch(`${urlRules}/${id}`, { method: "DELETE" });
      const data = await response.text();
      fetchRules();
      if (response.status === 200) {
        alert("Rule deleted successfully");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const [ruleToEdit, setRuleToEdit] = React.useState([rule.id]);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleEditRule = (id) => {
    console.log(id);
    setRuleToEdit(id);
    setModalOpen(true);
  };

  const handleFormSubmit = async (newRule) => {
    console.log(newRule);
    console.log(ruleToEdit);
    try {
      ruleToEdit === null
        ? setRules([...rules, newRule])
        : setRules(
            rules.map((rule) => {
              if (rule.id !== ruleToEdit) return rule;

              return newRule;
            })
          );
      const response = await fetch(`${urlRules}/${ruleToEdit}`, {
        method: "PUT",
        body: JSON.stringify({ name: newRule }),
      });
      const data = await response.json();
      console.log(data);
      fetchRules();
      if (response.status === 200) {
        alert("Rule updated successfully");
      }
    } catch (err) {
      console.error(err.message);
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

        <RuleTable
          rows={rules}
          deleteRow={handleDeleteRule}
          editRow={handleEditRule}
        />
        {modalOpen && (
          <PopupEdit
            closeModal={() => {
              setModalOpen(false);
              setRuleToEdit(null);
            }}
            onSubmit={handleFormSubmit}
            defaultValue={rule.name}
          />
        )}
      </Container>
    </>
  );
}
