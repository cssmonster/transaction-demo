import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import MagicInput from "@/components/MagicInput";
import Modal from "@mui/material/Modal";
import AssetInfoBox from "components/AssetInfoBox";
import CloseIcon from "public/icons/close.svg";
import BrowseIcon from "public/icons/browse.svg";
import { IBalance, IProfile } from "type/interface";
import { _handleGetOriginalMoney, _handleGetTargetMoney } from "utils/money";

const StyledAssetsListCotainer = styled("ul")({
  height: "calc(100vh - 130px)",
  overflow: "auto",
});

const StyledInputTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.info.main,
  textTransform: "uppercase",
}));

const StyledSelectionCurrency = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  textTransform: "uppercase",
}));

const StyledIconBox = styled(Box)({
  width: "24px",
  height: "24px",
});

const StyledAssetsModalContent = styled(Box)(({ theme }) => ({
  width: "calc(100vw - 40px)",
  height: "calc(100vh - 40px)",
  maxWidth: "100vw",
  maxHeight: "100%",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflowY: "auto",
  background: theme.palette.primary.light,
  borderRadius: "16px",
  outline: "none",
}));

const StyledModalHead = styled(Box)(({ theme }) => ({
  height: "60px",
  borderBottom: `1px solid ${theme.palette.info.dark}`,
  position: "relative",
}));

const StyledCloseIcon = styled(CloseIcon)({
  position: "absolute",
  right: "20px",
  top: "20px",
});

interface IAssetsSelection {
  list: IBalance[];
  handleGetSelectedBanalance: (id: number) => void;
}

const AssetsSelection: React.FC<IAssetsSelection> = ({
  list,
  handleGetSelectedBanalance,
}) => {
  const [selectedBalance, setSelectedBalanace] =
    React.useState<IBalance | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (list && list.length !== 0) setSelectedBalanace(list[0]);
  }, [list]);

  const onHandleClose = () => setOpen(false);

  const onHandleAssetsSelection = () => {
    setOpen(true);
  };

  const onHandleClickBalance = (id: number) => {
    setOpen(false);
    const selectedBalance = list.filter((item: IBalance) => item.id === id)[0];
    setSelectedBalanace(selectedBalance);
    handleGetSelectedBanalance && handleGetSelectedBanalance(id);
  };

  return (
    <div>
      <MagicInput
        onClick={onHandleAssetsSelection}
        isNoDisabledBackground={selectedBalance !== null}
        isDisabled
        paddingInputRight="16px"
        paddingInputLeft="16px"
        helperLeft={
          list && list.length !== 0 && selectedBalance ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <StyledIconBox
                mr={0.5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  alt="Dog"
                  src={selectedBalance.logo}
                  width="100%"
                  height="100%"
                />
              </StyledIconBox>
              <StyledSelectionCurrency variant="h4_InterFontFamily">
                {selectedBalance.code}
              </StyledSelectionCurrency>
            </Box>
          ) : (
            <Typography>You have no assets !</Typography>
          )
        }
        helperRight={list && list.length !== 0 && <BrowseIcon width="24px" />}
        title={
          <StyledInputTitle
            ml={1}
            variant="h6_InterFontFamily"
            fontWeight="fontWeightBold"
          >
            Asset
          </StyledInputTitle>
        }
      />

      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="assets-list"
        aria-describedby="list-all-assets-available"
      >
        <StyledAssetsModalContent>
          <StyledModalHead
            mb={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" fontWeight="fontWeightSmallBold">
              Assets
            </Typography>

            <StyledCloseIcon onClick={() => setOpen(false)} width="24px" />
          </StyledModalHead>
          <StyledAssetsListCotainer>
            {list.map((item: IBalance) => (
              <li key={item.id}>
                <Box mb={1}>
                  <AssetInfoBox
                    originalCurrency={_handleGetOriginalMoney(item)}
                    targetCurrency={_handleGetTargetMoney(item)}
                    icon={item.logo}
                    id={item.id}
                    onHandleClickBalance={onHandleClickBalance}
                  />
                </Box>
              </li>
            ))}
          </StyledAssetsListCotainer>
        </StyledAssetsModalContent>
      </Modal>
    </div>
  );
};

export default AssetsSelection;
