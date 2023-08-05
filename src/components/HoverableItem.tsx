import { Box, Button } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

type HoverableProps = {
    children?: React.ReactNode;
    onRemove: () => void;
}

const HoverableItem = ({ children, onRemove }: HoverableProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover button": {
          opacity: 1,
        },
      }}
    >
      {children}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        onClick={onRemove} // Call the onRemove callback when clicked
      >
        Remove
      </Button>
    </Box>
  );
};

export default HoverableItem;
