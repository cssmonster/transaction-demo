import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface IErrorFallback {
  error: any;
  resetErrorBoundary: any;
}

const ErrorFallbackComponent: React.FC<IErrorFallback> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Box
      p={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Something went wrong:</p>
      <Typography>{error.message}</Typography>
      <Button onClick={resetErrorBoundary} variant="text">
        Try again
      </Button>
    </Box>
  );
};

export default ErrorFallbackComponent;
