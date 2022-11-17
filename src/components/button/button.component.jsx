import { BaseButton, GoogleButton, InvertedButton } from "./button.styles.jsx";

export const BUTTON_TYPES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const BUTTON_COMPONENTS_MAP = {
  [BUTTON_TYPES.base]: BaseButton,
  [BUTTON_TYPES.google]: GoogleButton,
  [BUTTON_TYPES.inverted]: InvertedButton,
};

const getButton = (buttonType = BUTTON_TYPES.base) => {
  console.log("Button created");
  return BUTTON_COMPONENTS_MAP[buttonType];
};

export function Button({ children, buttonType, ...otherProps }) {
  const TYPED_BUTTON = getButton(buttonType);
  return <TYPED_BUTTON {...otherProps}>{children}</TYPED_BUTTON>;
}
