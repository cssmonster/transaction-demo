import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import PlaneIcon from "public/icons/plane-fill.svg";
import CreditCardIcon from "public/icons/credit-card-fill.svg";
import RepeatIcon from "public/icons/repeat.svg";

const StyledWrapIconBox = styled(Box)(({ theme }) => ({
  width: "48px",
  height: "48px",
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "8px",
}));

interface ITransactionBox {}

const TransactionBox: React.FC<ITransactionBox> = ({}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        ml={12 / 8}
        mr={12 / 8}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledWrapIconBox
          mb={12 / 8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CreditCardIcon width="32px" />
        </StyledWrapIconBox>

        <Typography variant="h5" fontWeight="fontWeightSmallBold">
          Deposit
        </Typography>
      </Box>

      <Box
        ml={12 / 8}
        mr={12 / 8}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/send-assets">
          <a>
            <StyledWrapIconBox
              mb={12 / 8}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PlaneIcon width="32px" />
            </StyledWrapIconBox>
            <Typography variant="h5" fontWeight="fontWeightSmallBold">
              Send
            </Typography>
          </a>
        </Link>
      </Box>

      <Box
        ml={12 / 8}
        mr={12 / 8}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledWrapIconBox
          mb={12 / 8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RepeatIcon width="32px" />
        </StyledWrapIconBox>
        <Typography variant="h5" fontWeight="fontWeightSmallBold">
          Swap
        </Typography>
      </Box>
    </Box>
  );
};

export default TransactionBox;
