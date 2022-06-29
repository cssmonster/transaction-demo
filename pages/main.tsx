import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import UserTag from "components/UserTag";
import WalletBox from "components/WalletBox";
import TransactionBox from "components/TransactionBox";
import AssetsList from "components/AssetsList";
import ProfileIcon from "public/icons/profile-icon.svg";
import { _handleCheckAuthorizeSSER } from "utils/checking";
import { _getCookieFromString } from "utils/cookies";
import ErrorFallbackComponent from "components/ErrorFallbackComponent";
import { _handleGetOriginalMoney, _handleGetTargetMoney } from "utils/money";
import { IBalance, IProfile } from "type/interface";
import { useAppSelector } from "redux/hooks";
import { profileSelector } from "@/redux/features/profile/selectors";

interface IMain {
  profileData: IProfile;
}

const Main: React.FC<IMain> = ({ profileData }) => {
  const { data, pending, error, errorMessage } =
    useAppSelector(profileSelector);

  const [selectedBalanace, setSelectedBalance] =
    React.useState<IBalance | null>(null);
  const [copiedWalletCode, setCopiedWalletCode] = React.useState("");

  React.useEffect(() => {
    const isEmptyBalance = profileData.balance.length === 0;
    if (!isEmptyBalance) {
      setSelectedBalance(profileData.balance[0]);
    }
  }, [profileData]);

  React.useEffect(() => {
    if (data) {
      setSelectedBalance(data.balance[0]);
    }
  }, [data]);

  const onHandleClickBalance = (id: number) => {
    const selectedBalance = data
      ? data.balance.filter((item: IBalance) => item.id === id)[0]
      : profileData.balance.filter((item: IBalance) => item.id === id)[0];
    setSelectedBalance(selectedBalance);
  };

  if (!profileData) return <>SSR ERROR !</>;
  return (
    <Container sx={{ p: 2.5 }}>
      <Box
        mb={2.5}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <UserTag
          status={data ? data.status : profileData.status}
          name={data ? data.name : profileData.name}
        />
        <ProfileIcon width="32px" />
      </Box>
      <Box mb={28 / 8}>
        <WalletBox
          code={data ? data.walletCode : profileData.walletCode}
          originalCurrency={_handleGetOriginalMoney(selectedBalanace)}
          targetCurreny={_handleGetTargetMoney(selectedBalanace)}
          onHandleCopy={(val: any) => setCopiedWalletCode(val)}
        />
      </Box>
      <Box mb={18 / 8}>
        <TransactionBox />
      </Box>
      <AssetsList
        list={data ? data.balance : profileData.balance}
        onHandleClickBalance={onHandleClickBalance}
      />
    </Container>
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

export default Main;
