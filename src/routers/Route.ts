const ROUTER = "";

export const ROUTER_NAME = {
  // auth
  LOGIN: "login",
  SIGNIN: "signin",
  MAIN_PAGE: "",
  NOT_FOUND: "*",
  ABOUT_PAGE: "about",
};

export const ROUTER_PATH = {
  // auth
  LOGIN: `${ROUTER}/${ROUTER_NAME.LOGIN}`,
  SIGNIN: `${ROUTER}/${ROUTER_NAME.SIGNIN}`,
  MAIN_PAGE: `${ROUTER}/${ROUTER_NAME.MAIN_PAGE}`,
  NOT_FOUND: `${ROUTER}/${ROUTER_NAME.NOT_FOUND}`,
  ABOUT_PAGE: `${ROUTER}/${ROUTER_NAME.ABOUT_PAGE}`,
};
