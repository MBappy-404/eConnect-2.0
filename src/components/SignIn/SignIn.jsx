"use client";
import { AuthContext } from "@/AuthProvider/Auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Signup from "../Signup/Signup";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,

} from "@nextui-org/react";
import { useRouter } from "next/navigation";
const SignIn = () => {

  const [selected, setSelected] = useState("login");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const provider = new GoogleAuthProvider();
  const { signIn, googleProvider } = useContext(AuthContext);
  const [loginError, setLoginError] = useState();
  const router = useRouter();
  const handleLogin = (data) => {
    

    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        router.push("/")
         
      })
      .catch((err) => {
        setLoginError(err.message);
        

        console.log(err.message);
      });
  };

  // handle google login
  const googleSignIn = () => {
    
    googleProvider(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const userData = {
          name: user?.displayName,
          email: user?.email,
        };

        fetch(' https://e-connect-server-mbappy404s-projects.vercel.app/users', {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(userData)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.acknowledged) {
              router.push("/")
            }
          })
      })
      .catch((err) => {
        console.log(err.message);

        setLoading(false);
        setLoginError(err.message);
      });
  };


  return (
    <div className="flex justify-center items-center bg-black h-screen">
      <Card className="max-w-full w-[400px] mx-2 h-[420px]  ">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab
              key="login"
              className="text-lg font-medium py-1 my-1"
              title="Login"
            >
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex mt-2 flex-col gap-4"
              >
                <Input
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Input
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      message: "Password must be more strong",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters or longer",
                    },
                  })}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center cursor-pointer text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Login
                  </Button>
                </div>

                <p className="text-center cursor-pointer text-small">
                  Or Continue with Google
                </p>
                <div
                  onClick={googleSignIn}
                  className="flex bg-[#3F3F46] cursor-pointer -mt-2 w-12 mx-auto py-3 rounded-full justify-center"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    version="1.1"
                    x="0px"
                    y="0px"
                    class="google-icon"
                    viewBox="0 0 48 48"
                    height="25"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                </div>
              </form>
            </Tab>
            <Tab
              key="sign-up"
              className="text-lg font-medium py-1 my-1"
              title="Sign up"
            >
              <Signup setSelected={setSelected} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;
