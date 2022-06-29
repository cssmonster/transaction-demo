import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";

const StyledContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isDisabled" &&
    prop !== "isError" &&
    prop !== "isNoDisabledBackground",
})<{
  isDisabled: boolean;
  isError: boolean;
  isNoDisabledBackground: boolean;
}>(({ theme, isError, isDisabled, isNoDisabledBackground }) => {
  return {
    position: "relative",
    height: "40px",
    borderRadius: "8px",
    border: `1px solid ${
      isError ? theme.palette.warning.main : theme.palette.info.dark
    }`,
    backgroundColor: `${(() => {
      if (isNoDisabledBackground) return "transparent";
      else return isDisabled ? theme.palette.primary.dark : "transparent";
    })()}`,
  };
});

const StyledInput = styled("input", {
  shouldForwardProp: (prop) =>
    prop !== "isDisabled" &&
    prop !== "paddingInputRight" &&
    prop !== "paddingInputLeft",
})<{
  isDisabled: boolean;
  paddingInputLeft: string;
  paddingInputRight: string;
}>(({ theme, isDisabled, paddingInputRight, paddingInputLeft }) => {
  return {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: "0px",
    top: "0px",
    border: "none",
    outline: "none",
    background: "transparent",
    fontWeight: 400,
    ...(theme.typography as any).h4,
    color: isDisabled
      ? theme.palette.secondary.light
      : theme.palette.secondary.dark,
    paddingLeft: paddingInputLeft,
    paddingRight: paddingInputRight,
  };
});

const StyledInformText = styled(Typography)({
  color: "red",
});

interface IMagicInput {
  title?: string | ReactNode;
  isDisabled?: boolean;
  isNoDisabledBackground?: boolean;
  isError?: boolean;
  helperLeft?: ReactNode;
  helperRight?: ReactNode;
  value?: string;
  onChange?: (val: string) => void;
  onClick?: () => void;
  type?: string;
  informText?: string;
  paddingInputLeft?: string;
  paddingInputRight?: string;
}
const MagicInput: React.FC<IMagicInput> = ({
  isDisabled = false,
  isError = false,
  isNoDisabledBackground = false,
  helperLeft,
  helperRight,
  title,
  value,
  onChange,
  onClick,
  type,
  informText,
  paddingInputLeft = "0px",
  paddingInputRight = "0px",
}) => {
  const onHandleInputChange = (e: any) => {
    onChange && onChange(e.target.value);
  };

  const _handleSetJustifyContent = () => {
    if (helperLeft && helperRight) return "space-between";
    else if (!helperLeft && helperRight) return "flex-end";
    else return "flex-start";
  };

  return (
    <Box onClick={() => onClick && onClick()}>
      <Box mb={0.5}>{title && title}</Box>
      <StyledContainer
        pl={2}
        pr={2}
        sx={{
          display: "flex",
          justifyContent: _handleSetJustifyContent(),
          alignItems: "center",
        }}
        isDisabled={isDisabled}
        isNoDisabledBackground={isNoDisabledBackground}
        isError={isError}
      >
        <Box sx={{ zIndex: 2, position: "relative" }}>
          {helperLeft && <>{helperLeft}</>}
        </Box>
        <StyledInput
          disabled={isDisabled}
          isDisabled={isDisabled}
          paddingInputLeft={paddingInputLeft}
          paddingInputRight={paddingInputRight}
          type={type ? type : "text"}
          value={value}
          onChange={onHandleInputChange}
        />
        <Box sx={{ zIndex: 2, position: "relative" }}>
          {helperRight && <>{helperRight}</>}
        </Box>
      </StyledContainer>
      {informText && (
        <StyledInformText mt={0.5} variant="h5">
          {informText}
        </StyledInformText>
      )}
    </Box>
  );
};

export default MagicInput;
