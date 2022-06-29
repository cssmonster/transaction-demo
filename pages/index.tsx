import React from "react";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import MagicInput from "@/components/MagicInput";
import AppLogo from "public/icons/ronin-fullcolor.svg";
import EyeOpenIcon from "public/icons/eye.svg";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { postLogin } from "@/redux/features/login/actions";
import { selectLoginData } from "@/redux/features/login/selectors";
import { _handleCheckAuthorizeSSER } from "utils/checking";

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
});

const StyledAppLogo = styled(AppLogo)({
  width: "160px",
});

const StyledInputTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.info.main,
}));

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [toggleVisibility, setToggleVisibility] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const { data, pending, error, errorMessage } =
    useAppSelector(selectLoginData);

  React.useEffect(() => {
    if (data) router.push("/main");
  }, [data, router]);

  React.useEffect(() => {
    setPasswordErrorMessage(errorMessage);
  }, [errorMessage]);

  const onHandleChangePassword = (pass: string) => {
    setPasswordErrorMessage("");
    setPassword(pass);
  };

  const onHandleClickUnlock = () => {
    dispatch(postLogin({ password }));
  };

  const onHandleToggleVisibility = () => setToggleVisibility(!toggleVisibility);

  return (
    <StyledContainer pt={12} pl={2.5} pr={2.5}>
      <Box mb={3}>
        <StyledAppLogo />
      </Box>
      <Typography mb={1} variant="h1" fontWeight="fontWeightBold">
        Ronin Wallet
      </Typography>
      <Typography mb={3} variant="h4" fontWeight="fontWeightRegular">
        Your Digital Passport
      </Typography>
      <Box mb={3} sx={{ width: 1 }}>
        <MagicInput
          value={password}
          onChange={onHandleChangePassword}
          isError={passwordErrorMessage !== ""}
          informText={passwordErrorMessage}
          type={toggleVisibility ? "text" : "password"}
          paddingInputRight="48px"
          paddingInputLeft="16px"
          title={
            <StyledInputTitle
              ml={1}
              variant="h6_InterFontFamily"
              fontWeight="fontWeightBold"
            >
              ENTER PASSWORD
            </StyledInputTitle>
          }
          helperRight={
            toggleVisibility ? (
              <EyeOpenIcon width="24px" onClick={onHandleToggleVisibility} />
            ) : (
              <VisibilityOff onClick={onHandleToggleVisibility} />
            )
          }
        />
      </Box>
      <LoadingButton
        onClick={onHandleClickUnlock}
        variant="filled"
        loading={pending}
      >
        <span>Unlock</span>
      </LoadingButton>
    </StyledContainer>
  );
}

export async function getServerSideProps(context: any) {
  const isLoggedIn = await _handleCheckAuthorizeSSER(context);
  if (isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: "/main",
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
