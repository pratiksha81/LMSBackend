import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { signup } from "../../services/Login/authService";
import { User } from "../../types/Authorization/authModel";
import { useTheme } from "../../context/Authorization/ThemeContext";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SignUpFormInputs {
  username: string;
  email: string;
  password: string;
  role: string;
}

const SignUpModel: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ x: 400, y: 160 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    };

    const handleMouseUp = () => setDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    setDragging(true);
    setOffset({
      x: e.clientX - modalRef.current.offsetLeft,
      y: e.clientY - modalRef.current.offsetTop,
    });
  };

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const user: User = {
        userId: 0,
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      await signup(user);
      onClose();
    } catch (err) {
      setError("root", {
        type: "server",
        message: "Signup failed. Please try again.",
      });
      console.error("Signup failed", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <div
        ref={modalRef}
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "28rem",
          margin: "0 2.5rem",
          position: "absolute",
          borderRadius: "0.5rem",
          overflow: "hidden",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div
          ref={headerRef}
          onMouseDown={handleMouseDown}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            borderBottom: `1px solid ${theme.inputBackground}`,
            cursor: "move",
            background: theme.cardBackground,
          }}
        >
          <h5
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: theme.textColor,
            }}
          >
            Register Now
          </h5>
          <button
            type="button"
            onClick={onClose}
            style={{
              color: "#9ca3af",
              fontSize: "1.25rem",
              lineHeight: 1,
              background: "none",
              border: "none",
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div style={{ padding: "1rem" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: "0.75rem" }}>
              <label
                htmlFor="username"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: theme.textColor,
                  marginBottom: "0.25rem",
                }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                placeholder="Enter your username"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: `1px solid ${theme.inputBackground}`,
                  borderRadius: "0.375rem",
                  background: theme.inputBackground,
                  color: theme.textColor,
                }}
              />
              {errors.username && (
                <p
                  style={{
                    color: "red",
                    marginTop: "0.25rem",
                    fontSize: "0.75rem",
                  }}
                >
                  {errors.username.message}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: theme.textColor,
                  marginBottom: "0.25rem",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: `1px solid ${theme.inputBackground}`,
                  borderRadius: "0.375rem",
                  background: theme.inputBackground,
                  color: theme.textColor,
                }}
              />
              {errors.email && (
                <p
                  style={{
                    color: "red",
                    marginTop: "0.25rem",
                    fontSize: "0.75rem",
                  }}
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                margin: "-0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: theme.textColor,
                    marginBottom: "0.25rem",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="••••••"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: `1px solid ${theme.inputBackground}`,
                    borderRadius: "0.375rem",
                    background: theme.inputBackground,
                    color: theme.textColor,
                  }}
                />
                {errors.password && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "0.25rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div style={{ width: "100%", padding: "0.5rem" }}>
                <label
                  htmlFor="role"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: theme.textColor,
                    marginBottom: "0.25rem",
                  }}
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  {...register("role", {
                    required: "Role is required",
                  })}
                  placeholder="Role"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: `1px solid ${theme.inputBackground}`,
                    borderRadius: "0.375rem",
                    background: theme.inputBackground,
                    color: theme.textColor,
                  }}
                />
                {errors.role && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "0.25rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                background: theme.primaryColor,
                color: theme.buttonTextColor,
                padding: "0.75rem",
                borderRadius: "0.375rem",
                border: "none",
              }}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            {errors.root && (
              <p
                style={{
                  color: "red",
                  marginTop: "0.5rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                }}
              >
                {errors.root.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModel;