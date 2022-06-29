import React, { ReactNode } from "react";
import Router from "next/router";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import MoveBackIcon from "public/icons/chevron-left.svg";

const StyledHead = styled(Box)(({ theme }) => ({
  position: "fixed",
  height: "56px",
  boxShadow: `0px 4px 12px ${theme.palette.secondary.main}`,
  top: "0px",
  left: "0px",
  background: theme.palette.primary.light,
  zIndex: 2,
}));

const StyledMoveBackIcon = styled(MoveBackIcon)({
  position: "absolute",
  left: "24px",
  top: "16px",
});

interface ITransactionLayout {
  title?: string | ReactNode;
  children: ReactNode;
}

const TransactionLayout: React.FC<ITransactionLayout> = ({
  children,
  title,
}) => {
  return (
    <div>
      <StyledHead
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title}
        <StyledMoveBackIcon onClick={() => Router.back()} width="24px" />
      </StyledHead>

      <Box pt={7}> {children}</Box>
    </div>
  );
};

export default TransactionLayout;
