import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router"; // Fixed import
import {useContext, useState} from "react";
import { loginUser } from "@/services/AuthService.jsx";
import { useNavigate } from "react-router";
import {AuthContext} from "@/context/AuthContext.jsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message
        setIsLoading(true); // Start loading state

        try {
            const data = await loginUser(email, password);
            login(data.name, data.token); // Save token
            alert("Login successful!");
            navigate("/"); // Redirect to
        } catch (err) {
            setError(err.message || "Invalid email or password.");
        } finally {
            setIsLoading(false); // Stop loading state
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-black">
            <div className="max-w-md w-full mx-auto p-4 border rounded-lg bg-white dark:bg-black shadow-md">
                <div className="flex flex-col items-center gap-2 mb-4">
                    <Link to="/">
                        <div
                            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
                            aria-hidden="true"
                        >
                            <svg
                                className="stroke-zinc-800 dark:stroke-zinc-100"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                            >
                                <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                            </svg>
                        </div>
                    </Link>
                    <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-white">
                        Welcome back
                    </h2>
                    <p className="text-sm text-muted-foreground text-center dark:text-gray-400">
                        Enter your credentials to login to your account.
                    </p>
                </div>

                {error && <p className="text-red-600">{error}</p>} {/* Error message */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="login-email">Email</Label>
                            <Input
                                id="login-email"
                                placeholder="hi@yourcompany.com"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="login-password">Password</Label>
                            <Input
                                id="login-password"
                                placeholder="Enter your password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="login-remember" />
                            <Label
                                htmlFor="login-remember"
                                className="font-normal text-muted-foreground"
                            >
                                Remember me
                            </Label>
                        </div>
                        <a className="text-sm underline hover:no-underline" href="#">
                            Forgot password?
                        </a>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <div
                    className="flex items-center gap-3 my-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    <span className="text-xs text-muted-foreground">Or</span>
                </div>

                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                    Don&#39;t have an account?{" "}
                    <Link to="/register" className="underline hover:no-underline text-primary">
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}