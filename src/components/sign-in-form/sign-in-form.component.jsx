import { useState } from "react";
import {
  signIn,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import { Button, BUTTON_TYPES } from "../../components/button/button.component";

const defaultFormFields = {
  password: "",
  email: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  console.log(formFields);

  const { email, password } = formFields;

  const signInWithEmailAndPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await signIn(email, password);
      setFormFields(defaultFormFields);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password");
          break;
        case "auth/user-not-found":
          alert("Incorrect Email Address");
          break;
        default:
          alert(error.code);
      }
    }
  };

  // NOTE: This allows us to sign in with google and also sign up when we don't
  // have registered account.
  const signInWithGoogleHandler = async () => {
    try {
      const response = await signInWithGooglePopup();
      const { user } = response;

      setFormFields(defaultFormFields);
    } catch (error) {
      alert(error.code);
    }
  };

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>

      <form type="submit" onSubmit={signInWithEmailAndPasswordHandler}>
        <FormInput
          label={"Email"}
          inputOptions={{
            type: "email",
            required: true,
            onChange: onChangeHandler,
            name: "email",
            value: email,
          }}
        />

        <FormInput
          label={"Password"}
          inputOptions={{
            type: "password",
            required: true,
            onChange: onChangeHandler,
            name: "password",
            value: password,
          }}
        />

        <div className="buttons-container">
          <Button type="submit" buttonType={BUTTON_TYPES.base}>
            Sign In
          </Button>
          <Button
            type="button"
            onClick={signInWithGoogleHandler}
            buttonType={BUTTON_TYPES.google}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
