import { motion } from "motion/react";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  User,
  Mail,
  Trophy,
  Zap,
  Swords,
  Shield,
  Target,
  Crown,
} from "lucide-react";
import { Input } from "../ui/input";
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
import Image from "next/image";
import { cn } from "../ui/utils";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRequestOTP: (email: string) => void;
}

const registerFormSchema = yup.object({
  username: yup
    .string()
    .required("Battle tag is required")
    .min(2, "Battle tag must be at least 2 characters")
    .trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

type RegisterFormValues = {
  username: string;
  email: string;
};

/**
 * Registration form component
 * Allows users to register and request OTP for verification
 */
export function RegisterForm({
  onSwitchToLogin,
  onRequestOTP,
}: RegisterFormProps) {
  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(registerFormSchema) as Resolver<RegisterFormValues>,
    defaultValues: {
      username: "",
      email: "",
    },
    mode: "onBlur",
  });

  const formBackgroundStyle = {
    backgroundImage:
      'linear-gradient(135deg, rgba(23, 14, 4, 0.9), rgba(120, 53, 15, 0.55)), url("/assets/images/background/1.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const onSubmit = (values: RegisterFormValues) => {
    console.log("Register:", values);
    onRequestOTP(values.email);
  };

  const usernameHasError = Boolean(form.formState.errors.username);
  const emailHasError = Boolean(form.formState.errors.email);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      exit={{ opacity: 0, rotateY: -90, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="border-2 border-orange-500/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-orange-500/10 overflow-hidden relative !text-white"
        style={formBackgroundStyle}
      >
        {/* Top accent with dual colors */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500">
          <motion.div
            className="h-full w-32 bg-yellow-300"
            animate={{ x: ["-100%", "400%"] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5,
            }}
          />
        </div>

        {/* Angular corner decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-orange-500/30">
          <div className="absolute top-2 left-2 w-8 h-8 border-l border-t border-orange-500/20"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30">
          <div className="absolute bottom-2 right-2 w-8 h-8 border-r border-b border-cyan-500/20"></div>
        </div>

        <CardHeader className="space-y-5 pb-6 pt-8">
          {/* Trophy with battle effects */}
          <div className="relative mx-auto w-24 h-24">
            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-orange-500/20 rounded-full"
                animate={{
                  scale: [1, 2, 2],
                  opacity: [0.5, 0, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
              />
            ))}

            {/* Main trophy */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/50 border-4 border-orange-400/30"
              animate={{
                rotate: [0, 5, -5, 0],
                boxShadow: [
                  "0 0 30px rgba(249, 115, 22, 0.5)",
                  "0 0 50px rgba(249, 115, 22, 0.8)",
                  "0 0 30px rgba(249, 115, 22, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Trophy className="w-12 h-12 text-white" strokeWidth={2.5} />
            </motion.div>

            {/* Orbiting weapons */}
            {[0, 90, 180, 270].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                animate={{
                  rotate: [angle, angle + 360],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <div
                  style={{
                    transform: `translate(-50%, -50%) translateY(-50px)`,
                  }}
                >
                  {i % 2 === 0 ? (
                    <Shield className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Swords className="w-4 h-4 text-orange-400" />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Crown on top */}
            <motion.div
              className="absolute -top-3 left-1/2 -translate-x-1/2"
              animate={{
                y: [-5, 5, -5],
                rotate: [-10, 10, -10],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Crown className="w-7 h-7 text-yellow-400" fill="currentColor" />
            </motion.div>
          </div>

          {/* Branding */}
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1
                className="flex items-center justify-center text-5xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600"
                style={{ fontWeight: 900, letterSpacing: "0.05em" }}
              >
                {/* {APP_CONFIG.name} */}
                <Image
                  src="/assets/images/logo.png"
                  className="object-contain"
                  alt="KiiBoard"
                  width={250}
                  height={200}
                />
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-orange-500"></div>
                <span className="text-xs text-orange-400 tracking-widest">
                  CLAIM GLORY
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-orange-500"></div>
              </div>
            </motion.div>

            <CardTitle className="text-xl text-white flex items-center justify-center gap-3 pt-2">
              <Target className="w-5 h-5 text-orange-500" />
              <span className="tracking-wide">RECRUIT REGISTRATION</span>
              <Target className="w-5 h-5 text-orange-500" />
            </CardTitle>
            <CardDescription className="text-white">
              Build your legend
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <motion.div
                      className="space-y-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <FormLabel className="text-white flex items-center gap-2 tracking-wide">
                        <User className="w-4 h-4 text-orange-400" />
                        <span className="uppercase text-xs">Battle Tag</span>
                      </FormLabel>
                      <div className="relative group">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="APEX_WARRIOR"
                            className={cn(
                              "bg-black dark:bg-slate-950/50 border-2 text-white placeholder:text-slate-700 dark:placeholder:text-white/60 transition-all h-12 uppercase tracking-wider",
                              usernameHasError
                                ? "!border-[var(--color-error)] focus:!border-[var(--color-error)] focus:!shadow-[0_0_0_3px_rgba(247,40,40,0.25)]"
                                : "border-slate-300 dark:border-slate-700 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/20"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <motion.div
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Target className="w-4 h-4 text-orange-400" />
                        </motion.div>
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                      </div>
                      <FormMessage
                        style={{ color: "#f72828" }}
                        className="text-xs"
                      />
                    </motion.div>
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <motion.div
                      className="space-y-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FormLabel className="text-white flex items-center gap-2 tracking-wide">
                        <Mail className="w-4 h-4 text-orange-400" />
                        <span className="uppercase text-xs">Email Address</span>
                      </FormLabel>
                      <div className="relative group">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="champion@kiibord.gg"
                            className={cn(
                              "bg-black dark:bg-slate-950/50 border-2 text-white placeholder:text-slate-700 dark:placeholder:text-white/60 transition-all h-12",
                              emailHasError
                                ? "!border-[var(--color-error)] focus:!border-[var(--color-error)] focus:!shadow-[0_0_0_3px_rgba(247,40,40,0.25)]"
                                : "border-slate-300 dark:border-slate-700 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/20"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                      </div>
                      <FormMessage className="text-[var(--color-error)] text-xs" />
                      {/* Info text */}
                      <motion.p
                        className="text-xs text-white flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Zap className="w-3 h-3 text-orange-400" />
                        Verification code will be deployed to your email
                      </motion.p>
                    </motion.div>
                  </FormItem>
                )}
              />

              {/* Controller Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-2"
              >
                <ControllerButton
                  type="submit"
                  variant="warning"
                  disabled={form.formState.isSubmitting}
                >
                  ENLIST NOW
                </ControllerButton>
              </motion.div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-5 px-6 pb-8">
          {/* Divider */}
          <div className="flex items-center w-full gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-slate-300 dark:to-slate-700"></div>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Swords className="w-5 h-5 text-slate-400" />
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-700 to-slate-300 dark:to-slate-700"></div>
          </div>

          {/* Login prompt */}
          <motion.div className="text-center" whileHover={{ scale: 1.02 }}>
            <p className="text-sm text-white">
              VETERAN WARRIOR?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-orange-400 hover:text-orange-300 transition-colors tracking-wide uppercase"
                style={{ fontWeight: 700 }}
              >
                RETURN TO BASE →
              </button>
            </p>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
