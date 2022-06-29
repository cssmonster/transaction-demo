export const _getCookie = (name: string) => {
  function escape(s: string) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
  }
  var match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
  );
  return match ? match[1] : null;
};

export const _getCookieFromString = (str: string, name: string) => {
  function escape(s: string) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
  }
  var match = str.match(RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)"));
  return match ? match[1] : null;
};

export const _setCookie = (key: string, value: string, exdays: number) => {
  var date = new Date();
  // Default at 365 days.
  exdays = exdays || 365;
  // Get unix milliseconds at current time plus number of days
  date.setTime(+date + exdays * 86400000); //24 * 60 * 60 * 1000
  window.document.cookie =
    key + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
  return value;
};
