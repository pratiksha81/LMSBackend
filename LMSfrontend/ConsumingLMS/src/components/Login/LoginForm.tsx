import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authorization/AuthContext";
import { login } from "../../services/Login/authService";
import loBook from "../../assets/Kalobook.svg";
import { useTheme } from "../../context/Authorization/ThemeContext";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { theme } = useTheme();
  const { login: setAuthTokens } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const tokens = await login(data);
      setAuthTokens(tokens);
      navigate("/dashboard", { replace: true });
      window.history.replaceState(null, "", "/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError("root", {
        type: "server",
        message: "Invalid username or password",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-1/2 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md text-center space-y-6"
      >
        <img src={loBook} alt="Library Logo" className="mx-auto mb-4 w-24" />
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: theme.textColor }}
        >
          HSMSS Library Management System
        </h2>
        <p className="text-lg mb-6" style={{ color: theme.textColor }}>
          Please enter your credentials
        </p>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              placeholder="Username"
              className="w-4/5 mx-auto p-3 border rounded-full text-center focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                borderColor: theme.textColor,
                color: theme.textColor,
                backgroundColor: theme.inputBackground,
              }}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Password"
              className="w-4/5 mx-auto p-3 border rounded-full text-center focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                borderColor: theme.textColor,
                color: theme.textColor,
                backgroundColor: theme.inputBackground,
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-3/5 mx-auto flex flex-col items-start space-y-2">
          <a
            href="/forgot-password"
            className="text-sm hover:underline"
            style={{ color: theme.textColor }}
          >
            Forgot Password?
          </a>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-10 rounded-full font-bold text-lg disabled:opacity-50"
            style={{
              backgroundColor: theme.primaryColor,
              color: theme.buttonTextColor,
            }}
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </div>

        {errors.root && (
          <p className="text-red-500 mt-4">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;