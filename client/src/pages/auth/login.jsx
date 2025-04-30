import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, "Passowrd is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("logging in with : ", data);

    // todo : login logic
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10 focus-visible:outline-none focus-visible:ring-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 focus-visible:outline-none focus-visible:ring-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer bg-blue-500 hover:bg-blue-500"
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          Don't have an account?{" "}
          <Link to="/register" className="ml-1 text-blue-600">
            Register here.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
