import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";

const StyledIconBox = styled(Box)(({ theme }) => ({
  width: "32px",
  height: "32px",
}));
const StyledTargetMoney = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
}));

interface IAssetInfoBox {
  originalCurrency?: string;
  targetCurrency?: string;
  icon?: string;
  id: number;
  onHandleClickBalance?: (id: number) => void;
}

const AssetInfoBox: React.FC<IAssetInfoBox> = ({
  originalCurrency,
  targetCurrency,
  icon,
  onHandleClickBalance,
  id,
}) => {
  return (
    <Box
      onClick={() => {
        onHandleClickBalance && onHandleClickBalance(id);
      }}
      pt={12 / 8}
      pb={12 / 8}
      pl={2.5}
      pr={2.5}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <StyledIconBox
        mr={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon && <Image alt="Dog" src={icon} width="100%" height="100%" />}
      </StyledIconBox>

      <Box>
        {originalCurrency && (
          <Typography variant="h4" fontWeight="fontWeightSmallBold" mb={0.5}>
            {originalCurrency}
          </Typography>
        )}
        {targetCurrency && (
          <StyledTargetMoney
            variant="h5VariantPrimary"
            fontWeight="fontWeightRegular"
          >
            {targetCurrency}
          </StyledTargetMoney>
        )}
      </Box>
    </Box>
  );
};

export default AssetInfoBox;
