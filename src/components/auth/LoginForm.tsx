import { motion } from "motion/react";
import Image from "next/image";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Gamepad2, Mail, Zap, Swords, Target, Crosshair } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "../ui/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ControllerButton } from "../shared/ControllerButton";
import { APP_CONFIG } from "../../lib/constants";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onRequestOTP: (email: string) => void;
}

const loginFormSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

type LoginFormValues = {
  email: string;
};

/**
 * Login form component
 * Allows users to request OTP for login
 */
export function LoginForm({
  onSwitchToRegister,
  onRequestOTP,
}: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginFormSchema) as Resolver<LoginFormValues>,
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const formBackgroundStyle = {
    backgroundImage:
      'linear-gradient(135deg, rgba(2, 6, 23, 0.92), rgba(8, 47, 73, 0.65)), url("/assets/images/background/7.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.9,
  };

  const onSubmit = (values: LoginFormValues) => {
    console.log("Request OTP for login:", values.email);
    onRequestOTP(values.email);
  };

  const emailHasError = Boolean(form.formState.errors.email);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
    >
      <Card
        className="border-2 border-cyan-500/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 overflow-hidden relative text-white"
        style={formBackgroundStyle}
      >
        {/* Top accent line with animation */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent">
          <motion.div
            className="h-full w-20 bg-cyan-400"
            animate={{ x: ["-100%", "500%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1,
            }}
          />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-cyan-500/20"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-orange-500/20"></div>

        <CardHeader className="space-y-5 pb-6 pt-8">
          {/* Logo with aggressive animation */}
          <div className="relative mx-auto w-24 h-24">
            {/* Hexagon background */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-blue-600 to-slate-800 clip-hexagon shadow-lg shadow-cyan-500/50"></div>
            </motion.div>

            {/* Inner rotating ring */}
            <motion.div
              className="absolute inset-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full border-4 border-cyan-400/30 clip-hexagon"></div>
            </motion.div>

            {/* Center icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gamepad2 className="w-12 h-12 text-cyan-400" strokeWidth={2.5} />
            </motion.div>

            {/* Corner targets */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-6 h-6 text-blue-400" />
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Crosshair className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </div>

          {/* App branding */}
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1
                className="flex items-center justify-center text-5xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-600"
                style={{ fontWeight: 900, letterSpacing: "0.05em" }}
              >
                <Image
                  src="/assets/images/logo.png"
                  className="object-contain"
                  alt="KiiBoard"
                  width={250}
                  height={200}
                />
                {/* {APP_CONFIG.name} */}
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-cyan-500"></div>
                <span className="text-xs text-cyan-400 tracking-widest">
                  {APP_CONFIG.tagline}
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-cyan-500"></div>
              </div>
            </motion.div>

            <CardTitle className="text-xl text-white flex items-center justify-center gap-3 pt-2">
              <Swords className="w-5 h-5 text-blue-400" />
              <span className="tracking-wide">ENTER THE ARENA</span>
              <Swords className="w-5 h-5 text-blue-400" />
            </CardTitle>
            <CardDescription className="text-white">
              Ready for battle?
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <motion.div
                      className="space-y-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <FormLabel className="text-white flex items-center gap-2 tracking-wide">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <span className="uppercase text-xs">Email Address</span>
                      </FormLabel>
                      <div className="relative group">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="warrior@kiibord.gg"
                            className={cn(
                              "bg-black dark:bg-slate-950/50 border-2 border-slate-300 dark:border-slate-700 text-white placeholder:text-black dark:placeholder:text-white/60 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 h-12 text-base",
                              emailHasError &&
                                "!border-[var(--color-error)] focus:!border-[var(--color-error)] focus:!shadow-[0_0_0_3px_rgba(247,40,40,0.25)] dark:!border-[var(--color-error)]"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                      </div>
                      <FormMessage className="text-red-400 text-xs" />
                      {/* Info text */}
                      <motion.p
                        className="text-xs text-white flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Zap className="w-3 h-3 text-cyan-400" />
                        We'll send you a verification code
                      </motion.p>
                    </motion.div>
                  </FormItem>
                )}
              />

              {/* Controller Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-2"
              >
                <ControllerButton
                  type="submit"
                  variant="primary"
                  disabled={form.formState.isSubmitting}
                >
                  DEPLOY CODE
                </ControllerButton>
              </motion.div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-5 px-6 pb-8">
          {/* Combat divider */}
          <div className="flex items-center w-full gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-slate-300 dark:to-slate-700"></div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Crosshair className="w-5 h-5 text-slate-400" />
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-700 to-slate-300 dark:to-slate-700"></div>
          </div>

          {/* Register prompt */}
          <motion.div className="text-center" whileHover={{ scale: 1.02 }}>
            <p className="text-sm text-white">
              NEW RECRUIT?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-cyan-400 hover:text-cyan-300 transition-colors tracking-wide uppercase"
                style={{ fontWeight: 700 }}
              >
                JOIN FORCES →
              </button>
            </p>
          </motion.div>
        </CardFooter>
      </Card>

      <style>{`
        .clip-hexagon {
          clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
        }
      `}</style>
    </motion.div>
  );
}
