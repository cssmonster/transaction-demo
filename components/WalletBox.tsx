import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import CopyIcon from "public/icons/copy.svg";
import SmallAppLogo from "public/icons/ronin-white.svg";

const StyledContainer = styled(Box)(({ theme }) => ({
  background: (theme.palette as any).gradient.main,
  borderRadius: "16px",
  boxShadow: `0px 12px 20px -4px ${theme.palette.info.dark}`,
}));

const StyledWalletCodeBox = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.warning.dark}`,
}));

const StyledWalletTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const StyledWalletCode = styled("input")(({ theme }) => ({
  color: theme.palette.warning.light,
  background: "transparent",
  border: "none",
  outline: "none",
  padding: "0px",
  margin: "0px",
  ...theme.palette.warning.light,
  fontFamily: (theme as any).typography.fontFamily,
}));

const StyledTopMoney = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const StyledDownMoney = styled(Typography)(({ theme }) => ({
  color: theme.palette.warning.light,
}));

const StyledCopiedBadge = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.light,
  backgroundColor: theme.palette.warning.dart,
  height: "16px",
}));

interface IWalletBox {
  code?: string;
  originalCurrency?: string;
  targetCurreny?: string;
  onHandleCopy?: (val: string | null) => void;
}

const WalletBox: React.FC<IWalletBox> = ({
  code,
  originalCurrency,
  targetCurreny,
  onHandleCopy,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const copyRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => window.clearTimeout(copyRef.current);
  }, []);

  const onHandleClickIcon = () => {
    setIsCopied(true);
    let codeElement = document.getElementById("code") as HTMLInputElement;
    codeElement && codeElement.select();
    codeElement && codeElement.setSelectionRange(0, 99999);
    codeElement && navigator.clipboard.writeText(codeElement.value);
    copyRef.current = window.setTimeout(() => {
      setIsCopied(false);
    }, 500);
    onHandleCopy && onHandleCopy(codeElement ? codeElement.value : "");
  };

  return (
    <StyledContainer pt={18 / 8} pb={2.5} pr={2.5} pl={2.5}>
      <StyledWalletCodeBox
        mb={12 / 8}
        pb={14 / 8}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <StyledWalletTitle
            mr={1}
            variant="h4"
            fontWeight="fontWeightSmallBold"
          >
            My Wallet
          </StyledWalletTitle>
          {code && <StyledWalletCode id="code" defaultValue={code} />}
        </Box>

        {!isCopied && <CopyIcon onClick={onHandleClickIcon} width="16px" />}
        {isCopied && (
          <StyledCopiedBadge
            pl={1}
            pr={1}
            pt={0.4}
            pb={0.4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Copied !
          </StyledCopiedBadge>
        )}
      </StyledWalletCodeBox>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box>
          {originalCurrency && (
            <StyledTopMoney variant="h1" mb={0.5} fontWeight="fontWeightBold">
              {originalCurrency}
            </StyledTopMoney>
          )}
          {targetCurreny && (
            <StyledDownMoney
              variant="h3VariantPrimary"
              fontWeight="fontWeightSmallBold"
            >
              {targetCurreny}
            </StyledDownMoney>
          )}
        </Box>
        <SmallAppLogo width="40px" />
      </Box>
    </StyledContainer>
  );
};

export default WalletBox;
