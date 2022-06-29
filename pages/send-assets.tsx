import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import MagicInput from "@/components/MagicInput";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import AssetsSelection from "components/AssetsSelection";
import TransactionLayout from "layouts/TransactionLayout";
import { _handleCheckAuthorizeSSER } from "utils/checking";
import { _getCookieFromString } from "utils/cookies";
import { _handleGetOriginalMoney, _handleGetTargetMoney } from "utils/money";
import { IBalance, IProfile } from "type/interface";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { profileSelector } from "@/redux/features/profile/selectors";
import { postProfile } from "@/redux/features/profile/actions";

const StyledInputTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.info.main,
  textTransform: "uppercase",
}));

const StyledMyWalletTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
}));

const StyledAvailableCurrency = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  textTransform: "uppercase",
}));

const StyledSuccessDes = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
}));

const StyledMaxBadge = styled(Box)(({ theme }) => ({
  display: "inline-block",
  background: theme.palette.success.main,
  borderRadius: "8px",
  fontWeight: 700,
  fontSize: "10px",
  lineHeight: "16px",
  color: theme.palette.info.main,
}));

const StyledSubbmitBtnContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "0px",
  left: "0px",
  height: "80px",
  background: theme.palette.primary.light,
}));

const StyledSuccesModalContent = styled(Box)(({ theme }) => ({
  width: "calc(100vw - 40px)",
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

const StyledButtonContaner = styled(Box)({
  width: "calc(50% - 8px)",
});

interface ISendAsset {
  profileData: IProfile;
}

const SendAssets: React.FC<ISendAsset> = ({ profileData }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, pending, error, errorMessage } =
    useAppSelector(profileSelector);

  const [originalAmount, setOriginalAmount] = React.useState(0);
  const [selectedBalanced, setSelectedBalanced] =
    React.useState<IBalance | null>(null);
  const [open, setOpen] = React.useState(false);
  const [targetWalletCode, setTargetWalletCode] = React.useState("");
  const [targetWalletCodeErrorMesssage, setTargetWalletCodeErrorMessage] =
    React.useState("");
  const [amount, setAmount] = React.useState("");
  const [amountErrorMessage, setAmountErrorMessage] = React.useState("");

  React.useEffect(() => {
    if (profileData.balance.length !== 0) {
      setSelectedBalanced(profileData.balance[0]);
      setOriginalAmount(Number(profileData.balance[0].amount));
    }
  }, [profileData]);

  React.useEffect(() => {
    if (data && data.balance.length !== 0) {
      setSelectedBalanced(data.balance[0]);
      setOriginalAmount(Number(data.balance[0].amount));
    }
  }, [data]);

  const onHandleTargetWalletCodeChange = (val: string) => {
    setTargetWalletCode(val);
    setTargetWalletCodeErrorMessage("");
  };

  const onHandleAmountChange = (val: string) => {
    setAmount(val);
    if (Number(val) > originalAmount) {
      setAmountErrorMessage("Too much");
    } else {
      setAmountErrorMessage("");
    }
    const clonedSelectedBalance = JSON.parse(JSON.stringify(selectedBalanced));
    clonedSelectedBalance.amount =
      originalAmount - Number(val) >= 0 ? originalAmount - Number(val) : 0;
    setSelectedBalanced(clonedSelectedBalance);
  };

  const handleGetSelectedBanalance = (id: number) => {
    const selectedBalance = data
      ? data.balance.filter((item: IBalance) => item.id === id)[0]
      : profileData.balance.filter((item: IBalance) => item.id === id)[0];
    setSelectedBalanced(selectedBalance);
  };

  const onHandleMaxAmount = () => {
    const clonedSelectedBalance = JSON.parse(JSON.stringify(selectedBalanced));
    clonedSelectedBalance.amount = originalAmount;
    setAmount(clonedSelectedBalance.amount);
    setSelectedBalanced(clonedSelectedBalance);
    setAmountErrorMessage("");
  };

  const onHandleSubmit = async () => {
    const submitData = data ? { ...data } : { ...profileData };
    let isAbleToSubmit = false;
    isAbleToSubmit =
      targetWalletCode !== "" &&
      amountErrorMessage === "" &&
      selectedBalanced !== null;
    targetWalletCode === "" &&
      setTargetWalletCodeErrorMessage("Required field!");
    amount === "" && setAmountErrorMessage("Required field!");
    if (isAbleToSubmit) {
      const cloned = JSON.parse(JSON.stringify(submitData));
      cloned.balance.forEach((item: IBalance) => {
        if (item.id === selectedBalanced?.id) {
          item.amount = String(Number(item.amount) - Number(amount));
        }
      });
      dispatch(postProfile(cloned));
      setOpen(true);
    }
  };

  const onHandleOKSuccess = () => {
    setOpen(false);
    router.push("/main");
  };

  if (!profileData) return <>SSR ERROR !</>;
  return (
    <TransactionLayout
      title={
        <Typography
          variant="h4_InterFontFamily"
          fontWeight="fontWeightSmallBold"
        >
          Send Assets
        </Typography>
      }
    >
      <>
        <Box pt={25 / 8} pb={2.5} pl={2.5} pr={2.5}>
          <Box mb={2}>
            <MagicInput
              value={data ? data.walletCode : profileData.walletCode}
              paddingInputLeft="92px"
              paddingInputRight="16px"
              isDisabled
              helperLeft={
                <StyledMyWalletTitle
                  variant="h4"
                  fontWeight="fontWeightSmallBold"
                >
                  My Wallet
                </StyledMyWalletTitle>
              }
              title={
                <StyledInputTitle
                  ml={1}
                  variant="h6_InterFontFamily"
                  fontWeight="fontWeightBold"
                >
                  FROM
                </StyledInputTitle>
              }
            />
          </Box>
          <Box mb={2}>
            <MagicInput
              isError={targetWalletCodeErrorMesssage !== ""}
              informText={targetWalletCodeErrorMesssage}
              value={targetWalletCode}
              onChange={onHandleTargetWalletCodeChange}
              paddingInputRight="16px"
              paddingInputLeft="16px"
              title={
                <StyledInputTitle
                  ml={1}
                  variant="h6_InterFontFamily"
                  fontWeight="fontWeightBold"
                >
                  TO
                </StyledInputTitle>
              }
            />
          </Box>
          <Box mb={2}>
            <AssetsSelection
              list={data ? data.balance : profileData.balance}
              handleGetSelectedBanalance={handleGetSelectedBanalance}
            />
          </Box>
          <Box mb={2}>
            <MagicInput
              isDisabled={selectedBalanced === null}
              type="number"
              value={amount}
              onChange={onHandleAmountChange}
              informText={amountErrorMessage}
              isError={amountErrorMessage !== ""}
              paddingInputRight="72px"
              paddingInputLeft="16px"
              helperRight={
                <StyledMaxBadge
                  onClick={onHandleMaxAmount}
                  pl={1}
                  pr={1}
                  pt={1 / 4}
                  pb={1 / 4}
                >
                  MAX
                </StyledMaxBadge>
              }
              title={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <StyledInputTitle
                    ml={1}
                    variant="h6_InterFontFamily"
                    fontWeight="fontWeightBold"
                  >
                    AMOUNT
                  </StyledInputTitle>
                  {selectedBalanced && (
                    <StyledAvailableCurrency
                      mr={1}
                      variant="h6_InterFontFamily"
                      fontWeight="fontWeightBold"
                    >
                      available: {_handleGetOriginalMoney(selectedBalanced)}
                    </StyledAvailableCurrency>
                  )}
                </Box>
              }
            />
          </Box>
        </Box>

        <StyledSubbmitBtnContainer
          pl={2.5}
          pr={2.5}
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledButtonContaner mr={1}>
            <Link href="/main">
              <a>
                <Button variant="unfilled" sx={{ width: 1 }}>
                  Cancel
                </Button>
              </a>
            </Link>
          </StyledButtonContaner>
          <StyledButtonContaner mr={1}>
            <LoadingButton
              onClick={onHandleSubmit}
              variant="filled"
              sx={{ width: 1 }}
              loading={pending}
            >
              Send
            </LoadingButton>
          </StyledButtonContaner>
        </StyledSubbmitBtnContainer>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="assets-list"
          aria-describedby="list-all-assets-available"
        >
          <StyledSuccesModalContent
            pt={3}
            pb={22 / 8}
            pl={2.5}
            pr={2.5}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h2"
              mb={3}
              align="center"
              sx={{ width: 1 }}
              fontWeight="fontWeightBold"
            >
              Successfully sent
            </Typography>
            <StyledSuccessDes variant="h4" mb={3}>
              Your <strong>{selectedBalanced.code}</strong> has been sent!{" "}
              <br />
              Thank you for using our service
            </StyledSuccessDes>

            <Button
              onClick={onHandleOKSuccess}
              variant="contained"
              sx={{ width: 1 }}
            >
              OK
            </Button>
          </StyledSuccesModalContent>
        </Modal>
      </>
    </TransactionLayout>
  );
};

export async function getServerSideProps(context: any) {
  const isLoggedIn = await _handleCheckAuthorizeSSER(context);
  if (isLoggedIn) {
    try {
      const accessToken = _getCookieFromString(
        context.req.headers.cookie,
        "accessToken"
      );

      const profileResult = await fetch(
        `http://${context.req.headers.host}/api/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const profileData = await profileResult.json();
      return {
        props: {
          profileData,
        },
      };
    } catch (err: any) {
      return {
        props: {
          profileData: null,
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}

export default SendAssets;
