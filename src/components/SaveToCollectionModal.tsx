import { SaveCollectionModal } from "@/types";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { AnimeCollectionContext } from "@/context/AnimeCollectionContext";
import { StyledButtonsContainer, StyledForm } from "@/style";

const SaveToCollectionModal = ({
  handleClose,
  isOpen,
  animeData,
}: SaveCollectionModal) => {
  const [pickedCollection, setPickedCollection] = useState();
  const { currentList, addAnimeToCollection } = useContext(
    AnimeCollectionContext
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addAnimeToCollection(
      {
        id: animeData?.id,
        name: animeData?.title.english,
        imageUrl: animeData?.coverImage.large,
        animeLink: `/AnimeDetail/${animeData?.id}`,
      },
      pickedCollection
    );
    handleClose();
    setPickedCollection(undefined)
  };

  const handleCloseModal = () => {
    setPickedCollection(undefined);
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
        <h2 id="modal-modal-title">Add Anime to Collection</h2>
        <StyledForm onSubmit={handleSubmit} noValidate autoComplete="off">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Collection</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pickedCollection}
              label="Collection"
              onChange={(e: any) => setPickedCollection(e.target.value)}
            >
              {currentList.map((dt) => {
                if (!dt.items.find((item) => item.id === animeData?.id)) {
                  return <MenuItem value={dt.name}>{dt.name}</MenuItem>;
                }

                return null;
              })}
            </Select>
          </FormControl>
          <StyledButtonsContainer>
            <Button disabled={!pickedCollection} type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button color="secondary" variant="contained" onClick={handleCloseModal}>
              Close
            </Button>
          </StyledButtonsContainer>
        </StyledForm>
      </Box>
    </Modal>
  );
};

export default SaveToCollectionModal;
