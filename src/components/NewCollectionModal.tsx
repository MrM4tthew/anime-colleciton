import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Modal, TextField } from "@mui/material";
import { CollectionModal } from "@/types";
import { AnimeCollectionContext } from "@/context/AnimeCollectionContext";
import { StyledButtonsContainer, StyledForm } from "@/style";

const NewCollectionModal = ({
  handleClose,
  collectionName,
  isOpen,
  isEdit,
}: CollectionModal) => {
  const [values, setValues] = useState<string>();
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const { createCollection, editCollection, currentList } = useContext(
    AnimeCollectionContext
  );
  const router = useRouter();

  const handleChange = (event: any) => {
    setValues(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const hasSpecialCharacters = values ? /[^a-zA-Z0-9\s]/.test(values) : false;
    if (hasSpecialCharacters) {
      setError({
        status: true,
        message: "Cannot be any special character",
      });
      return;
    } 
    if (
      currentList.find(
        (item) => item.name?.toLowerCase() === values?.toLowerCase()
      )
    ) {
      setError({
        status: true,
        message: "Name must be unique",
      });
    } else {
      if (isEdit) {
        editCollection(values, collectionName);
        router.replace(`/collections/${values}`);
      } else {
        createCollection({
          name: values,
          items: [],
        });
      }
      setValues(undefined);
      setError({
        status: false,
        message: "",
      });
      handleClose();
    }
  };

  const handleCloseModal = () => {
    setValues(undefined);
    setError({
      status: false,
      message: ""
    })
    handleClose();
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          '@media (max-width: 520px)': {
            width: 200,
          },
        }}
      >
        <h2 id="modal-modal-title">
          {isEdit ? "Edit Collection" : "Create New Collection"}
        </h2>
        <StyledForm onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            error={error.status}
            name="collectionName"
            label="Collection Name"
            helperText={error.status ? error.message : ""}
            value={values}
            onChange={handleChange}
            margin="normal"
          />
          <StyledButtonsContainer>
            <Button disabled={!values} type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </StyledButtonsContainer>
        </StyledForm>
      </Box>
    </Modal>
  );
};

export default NewCollectionModal;
