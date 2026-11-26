"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { ROLES, getDashboardPath } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// The two roles a person can choose (admin is never shown)
const roleOptions = [
  { value: ROLES.STUDENT, title: "Student", text: "Submit and track requests" },
  { value: ROLES.REVIEWER, title: "Reviewer (Staff)", text: "Review and decide requests" },
];

// Check the form. Returns an object with one message per wrong field.
const validateForm = ({ name, email, password }) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Full name is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(password)) {
    errors.password = "Password must have at least one uppercase letter";
  } else if (!/[a-z]/.test(password)) {
    errors.password = "Password must have at least one lowercase letter";
  }

  return errors;
};

const SignUpPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: ROLES.STUDENT });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Update one field in the form
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Stop here if anything is wrong (nothing is sent to the server)
    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });

      if (error) {
        toast.error(error.message || "Sign up failed");
        return;
      }

      toast.success("Account created successfully");
      router.push(getDashboardPath(form.role));
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} noValidate className="w-full max-w-md space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-sm text-muted-foreground">Join UniRequest to submit or review requests.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby="password-help"
          />
          <p id="password-help" className={errors.password ? "text-sm text-red-600" : "text-sm text-muted-foreground"}>
            {errors.password || "At least 6 characters, with one uppercase and one lowercase letter"}
          </p>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">I am a</legend>
          <div className="grid grid-cols-2 gap-3">
            {roleOptions.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={form.role === option.value}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <div className="rounded-lg border p-3 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary peer-focus-visible:ring-2">
                  <p className="font-medium">{option.title}</p>
                  <p className="text-xs text-muted-foreground">{option.text}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium underline">
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
};

export default SignUpPage;