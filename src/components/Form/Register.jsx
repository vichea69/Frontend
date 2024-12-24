import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router"; // Fixed import
import { useState } from "react";
import { registerUser } from "@/services/AuthService.jsx";
import { useNavigate } from "react-router"; // Fixed import

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        // Validate inputs
        if (!name || !email || !password) {
            setError("All fields are required.");
            setIsLoading(false);
            return;
        }

        try {
            await registerUser({ name, email, password });
            setSuccess("User registered successfully! Redirecting to login...");
            setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        } catch (error) {
            setError(error.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-black">
            <div className="max-w-md w-full mx-auto p-4 border rounded-lg bg-white dark:bg-black shadow-md">
                <div className="flex flex-col items-center gap-2 mb-4">
                    <Link to="/">
                        <div
                            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border cursor-pointer"
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
                        Sign up Origin UI
                    </h2>
                    <p className="text-sm text-muted-foreground text-center dark:text-gray-400">
                        We just need a few details to get you started.
                    </p>
                </div>
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="signup-name">Full name</Label>
                            <Input
                                id="signup-name"
                                value={name}
                                placeholder="Enter your name"
                                type="text"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <Input
                                id="signup-email"
                                value={email}
                                placeholder="Enter your email"
                                type="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="signup-password">Password</Label>
                            <Input
                                id="signup-password"
                                value={password}
                                placeholder="Enter your password"
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing up..." : "Sign up"}
                    </Button>
                </form>

                <div className="flex items-center gap-3 my-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    <span className="text-xs text-muted-foreground">Or</span>
                </div>

                <Button variant="outline" className="w-full">
                    Continue with Google
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    By signing up you agree to our{" "}
                    <a className="underline hover:no-underline" href="#">
                        Terms
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}