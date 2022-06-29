import { _getCookieFromString } from "utils/cookies";

export const _handleCheckAuthorizeSSER = async (context: any) => {
  let result = false;
  const isHavingCookies = context.req.headers.hasOwnProperty("cookie");
  if (isHavingCookies) {
    const isHavingAccessTokenCookie =
      context.req.headers.cookie.indexOf("accessToken") !== -1;
    if (isHavingAccessTokenCookie) {
      const accessToken = _getCookieFromString(
        context.req.headers.cookie,
        "accessToken"
      );
      try {
        await fetch(`http://${context.req.headers.host}/api/authen`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        result = true;
      } catch (err: any) {
        result = false;
      }
    } else {
      result = false;
    }
  } else {
    result = false;
  }

  return result;
};
