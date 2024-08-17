import { AuthContext } from "@/AuthProvider/Auth";
import { Input, Button, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useState, { useContext } from "react";
import { useForm } from "react-hook-form";

const Signup = ({ setSelected }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const router = useRouter();
  // const [signUpError, setSignupError] = useState( );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];
  const lastTwoDigitsOfYear = currentDate.getFullYear() % 100;
  const joinDate = `${currentMonth} '${lastTwoDigitsOfYear}`;

  const handleSignup = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.password, data.type);
          })

          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setSignupError(err.message);
        console.log(err.message);
      });
  };

  // user store data base
  const saveUser = (name, email, password) => {
    const user = {
      name,
      email,
      password,
      joinDate: joinDate,
    };

    fetch("https://e-connect-server.vercel.app/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push("/");
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="flex mt-2 flex-col gap-4 h-[300px]"
      >
        <Input
          {...register("name", { required: "Name is required" })}
          label="Name"
          placeholder="Enter your name"
          type="text"
        />
        <Input
          {...register("email", { required: "Email Address is required" })}
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
          Already have an account?{" "}
          <Link size="sm" onPress={() => setSelected("login")}>
            Login
          </Link>
        </p>
        <div className="flex gap-2 justify-end">
          <Button type="submit" fullWidth color="primary">
            Sign up
          </Button>
        </div>
        {/* {signUpError && <p className="text-center font-bold text-red-400">{signUpError}</p>} */}
      </form>
    </div>
  );
};

export default Signup;
