export const getApiKeyFromLocalStorage = async (): Promise<string | null> => {
  const api_key: string | null = await localStorage.getItem("API_KEY");
  if (!api_key) return null;

  const api_key_parsed = JSON.parse(api_key);
  if (!api_key_parsed || api_key_parsed?.length <= 0) return null;

  return api_key_parsed;
};

export const setApiKeyToLocalStorage = async function (
  apiKey: string
): Promise<boolean> {
  await localStorage.setItem("API_KEY", JSON.stringify(apiKey));

  return true;
};

// export const setLoginDetailsToLocalStorage = async function (
//   loggedInUserDetails: DefaultSession["user"]
// ) {
//   await localStorage.setItem(
//     "USER",
//     JSON.stringify(loggedInUserDetails?.email)
//   );
//   return true;
// };

// export const getLoginDetailsFromLocalStorage = async function () {
//   const user : string | null | undefined = await localStorage.getItem("USER");
//   console.log("userrr", user)
//   if ( !user || user === "undefined") return null;
//   if(user) return await JSON.parse(user);
// };
