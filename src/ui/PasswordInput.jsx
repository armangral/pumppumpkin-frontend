/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa6";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const PasswordInput = (props) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement
          width="2rem"
          ml={2}
          className="flex md:items-center items-start mt-2"
        >
          <FaLock className="text-grey w-5 h-5" />
        </InputLeftElement>

        <InputRightElement
          width="3rem"
          mr={2}
          className="flex md:items-center items-start mt-2"
        >
          <Button variant="link" onClick={onToggle} colorScheme="indigo">
            {isOpen ? <VscEyeClosed /> : <VscEye />}
          </Button>
        </InputRightElement>
        <Input
          type={isOpen ? "text" : "password"}
          focusBorderColor="blue.600"
          rounded="xl"
          h={"56px"}
          placeholder="Password"
          borderColor={props.formplace && "gray.400"}
          {...props}
        />
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;
