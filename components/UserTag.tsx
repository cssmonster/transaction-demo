import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";

import {
  ACTIVE_STATE,
  AWAY_STATE,
  OFFLINE_STATE,
  BUSY_STATE,
} from "constants/index";

const StyledUserTagContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "8px",
}));

const StyledDot = styled("div", {
  shouldForwardProp: (prop) => prop !== "type",
})<{
  type: string;
}>(({ theme, type }) => {
  let dotBg = theme.palette.primary.main;
  type === ACTIVE_STATE && (dotBg = theme.palette.primary.main);
  type === AWAY_STATE && (dotBg = theme.palette.secondary.dark);
  type === OFFLINE_STATE && (dotBg = theme.palette.info.main);
  type === BUSY_STATE && (dotBg = theme.palette.warning.main);
  return {
    width: "8px",
    height: "8px",
    backgroundColor: dotBg,
    borderRadius: "8px",
  };
});

interface IUserTag {
  status:
    | typeof ACTIVE_STATE
    | typeof AWAY_STATE
    | typeof OFFLINE_STATE
    | typeof BUSY_STATE;
  name?: string;
}

const UserTag: React.FC<IUserTag> = ({ status = ACTIVE_STATE, name }) => {
  return (
    <StyledUserTagContainer
      pt={6 / 8}
      pb={6 / 8}
      pl={12 / 8}
      pr={2.5}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {status === ACTIVE_STATE && <StyledDot type={status} />}
      {status === AWAY_STATE && <StyledDot type={status} />}
      {status === OFFLINE_STATE && <StyledDot type={status} />}
      {status === BUSY_STATE && <StyledDot type={status} />}
      {name && (
        <Typography ml={1.5} variant="h5" fontWeight="fontWeightBold">
          {name}
        </Typography>
      )}
    </StyledUserTagContainer>
  );
};

export default UserTag;
