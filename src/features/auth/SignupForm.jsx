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
import PasswordInput from "src/ui/PasswordInput";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSignup } from "./useSignup";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending: isLoading } = useSignup();
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSignIn = () => {
    const validationErrors = {};
    const secret = searchParams.get("secret");

    // Email regex to validate the email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    // Password length validation
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!secret) {
      toast.error("Secret is Required!");
      return;
    }

    setErrors({});

    const data = {
      email,
      password,
      secret,
    };

    signup(data, {
      onSuccess: () => {
        setEmail("");
        setPassword("");
        setErrors({});
        navigate("/signin");
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
            className="flex md:items-center items-start mt-2"
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
            placeholder="abc@example.com"
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

      <div className="space-y-2">
        <div className="flex gap-x-2 items-center">
          <FaCheckCircle className="text-primary" />
          <p className="text-primary font-semibold">
            Must be at least 8 Characters.
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <FaCheckCircle className="text-primary" />
          <p className="text-primary font-semibold">
            Ref Code Not required if you have none{" "}
          </p>
        </div>
      </div>

      <button
        onClick={handleSignIn}
        className="w-full h-14 mt-4 hover:bg-dark_blue bg-primary text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Get Started"}
      </button>
    </div>
  );
};

export default SignupForm;
