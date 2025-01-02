import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { useSignin } from "./useSignin";
import PasswordInput from "src/ui/PasswordInput";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, isPending: isLoading } = useSignin();
  const [errors, setErrors] = useState({});

  const handleSignIn = () => {
    const validationErrors = {};

    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const data = {
      email,
      password,
    };

    setErrors({});

    signin(data, {
      onSuccess: () => {
        setEmail("");
        setPassword("");
        setErrors({});
      },
    });
  };

  return (
    <div className="space-y-4 ">
      <FormControl id="email" isInvalid={errors.email}>
        <InputGroup>
          <InputLeftElement
            width="2rem"
            ml={2}
            className="flex md:items-center items-start mt-2 "
          >
            <AiOutlineMail className="text-grey w-5 h-5" />
          </InputLeftElement>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            focusBorderColor="blue.600"
            rounded="xl"
            h={"56px"}
            placeholder="Email Address"
          />
        </InputGroup>
        {errors.email && (
          <Text color="red.500" fontSize="sm" className="mt-2">
            {errors.email}
          </Text>
        )}
      </FormControl>

      <div>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={errors.password}
        />
        {errors.password && (
          <Text color="red.500" fontSize="sm" className="mt-2">
            {errors.password}
          </Text>
        )}
      </div>

      <button
        onClick={handleSignIn}
        className="w-full h-14 mt-4 hover:bg-dark_blue bg-primary text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Login"}
      </button>
    </div>
  );
};

export default SigninForm;
