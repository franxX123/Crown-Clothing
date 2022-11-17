import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocument,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import { Button, BUTTON_TYPES } from "../../components/button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  // console.log(formFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(Object.fromEntries([...new FormData(event.target)]));
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocument(user, { displayName });
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.message !== "Passwords do not match") {
        alert(`${error.message}`);
      } else if (
        error.message !== "Firebase: Error (auth/email-already-in-use)."
      ) {
        alert("The email provided is already in use.");
      } else {
        alert("There was a problem signing in");
      }
    }
  };

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form type="submit" onSubmit={submitHandler}>
        <FormInput
          label={"Display Name"}
          inputOptions={{
            type: "text",
            required: true,
            onChange: onChangeHandler,
            name: "displayName",
            value: displayName,
          }}
        />

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

        <FormInput
          label={"Confirm Password"}
          inputOptions={{
            type: "password",
            required: true,
            onChange: onChangeHandler,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        />
        <Button buttonType={BUTTON_TYPES.inverted} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
