import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PopupEdit({ closeModal, onSubmit, defaultValue }) {
  const [formState, setFormState] = React.useState(
    defaultValue || {
      rule: "",
    }
  );

  const handleInputChange = (e) => {
    setFormState(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <Modal open>
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel htmlFor="Rule">New Rule</InputLabel>
            <Input
              fullWidth
              id="edit"
              onChange={handleInputChange}
              defaultValue={formState.rule}
            />
            <Button type="cancel" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
