import React from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AssetInfoBox from "components/AssetInfoBox";
import { IBalance } from "type/interface";
import { _handleGetOriginalMoney, _handleGetTargetMoney } from "utils/money";

const StyledContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.main,
  borderRadius: "8px",
}));

const StyledListContainer = styled("ul")(({ theme }) => ({
  maxHeight: "calc(100vh - 403px)",
  overflow: "auto",
}));

interface IAssetsList {
  list: IBalance[];
  onHandleClickBalance?: (id: number) => void;
}
const AssetsList: React.FC<IAssetsList> = ({ list, onHandleClickBalance }) => {
  return (
    <div>
      <Typography
        pl={12 / 8}
        mb={12 / 8}
        variant="h3"
        fontWeight="fontWeightBold"
      >
        Assets
      </Typography>
      <StyledListContainer>
        {list.map((item: IBalance) => (
          <li key={item.id}>
            <StyledContainer mb={1}>
              <AssetInfoBox
                onHandleClickBalance={onHandleClickBalance}
                originalCurrency={_handleGetOriginalMoney(item)}
                targetCurrency={_handleGetTargetMoney(item)}
                icon={item.logo}
                id={item.id}
              />
            </StyledContainer>
          </li>
        ))}
      </StyledListContainer>
    </div>
  );
};

export default AssetsList;
