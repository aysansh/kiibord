import { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Shield, ArrowLeft, Zap, Target, Crosshair, Radar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { ControllerButton } from "../shared/ControllerButton";
import { OTP_CONFIG } from "../../lib/constants";
import Image from "next/image";
import { cn } from "../ui/utils";

interface OTPFormProps {
  email: string;
  context: "login" | "register";
  onBack: () => void;
}

const otpFormSchema = yup.object({
  otp: yup
    .array()
    .of(yup.string().required("Required").matches(/^\d$/, "Must be a digit"))
    .length(OTP_CONFIG.length, "Please enter the complete verification code")
    .required(),
});

type OTPFormValues = {
  otp: string[];
};

/**
 * OTP verification form component
 * Allows users to enter verification code
 */
export function OTPForm({ email, context, onBack }: OTPFormProps) {
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<OTPFormValues>({
    resolver: yupResolver(otpFormSchema) as Resolver<OTPFormValues>,
    defaultValues: {
      otp: Array.from({ length: OTP_CONFIG.length }, () => ""),
    },
    mode: "onChange",
  });

  const formBackgroundStyle = {
    backgroundImage:
      'linear-gradient(135deg, rgba(2, 20, 12, 0.9), rgba(6, 95, 70, 0.55)), url("/assets/images/background/11.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.9,
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    form.setValue(`otp.${index}`, value);

    if (value && index < OTP_CONFIG.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const otpValues = form.getValues("otp");
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = (values: OTPFormValues) => {
    const otpCode = values.otp.join("");
    console.log("OTP entered:", otpCode, "Context:", context);
    // Handle OTP verification logic here
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      console.log("OTP resent to:", email);
    }, OTP_CONFIG.resendDelay);
  };

  const otpValues = form.watch("otp");
  const isComplete = otpValues.every((digit) => digit !== "");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <Card
        className="border-2 border-green-500/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-green-500/10 overflow-hidden relative !text-white"
        style={formBackgroundStyle}
      >
        {/* Animated scanner line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-green-500"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Tech corners */}
        <div className="absolute top-4 left-4 w-10 h-10">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-green-500/50"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-green-500/50"></div>
        </div>
        <div className="absolute top-4 right-4 w-10 h-10">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-cyan-500/50"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-cyan-500/50"></div>
        </div>
        <div className="absolute bottom-4 left-4 w-10 h-10">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500/50"></div>
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-green-500/50"></div>
        </div>
        <div className="absolute bottom-4 right-4 w-10 h-10">
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-cyan-500/50"></div>
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-cyan-500/50"></div>
        </div>

        <CardHeader className="space-y-5 pb-6 pt-10">
          {/* Radar scanning effect */}
          <div className="relative mx-auto w-28 h-28">
            {/* Outer scanning rings */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-green-500/30 rounded-full"
                animate={{
                  scale: [1, 2.5, 2.5],
                  opacity: [0.6, 0, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Rotating radar sweep */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/2 left-1/2 w-1/2 h-1 origin-left bg-gradient-to-r from-green-500 to-transparent"></div>
            </motion.div>

            {/* Center shield */}
            <motion.div
              className="absolute inset-3 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 rounded-full flex items-center justify-center shadow-xl shadow-green-500/50 border-2 border-green-400/50"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(34, 197, 94, 0.5)",
                  "0 0 50px rgba(34, 197, 94, 0.8)",
                  "0 0 30px rgba(34, 197, 94, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-10 h-10 text-white" strokeWidth={2.5} />
            </motion.div>

            {/* Orbiting targets */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                animate={{
                  rotate: [angle, angle + 360],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <div
                  style={{
                    transform: `translate(-50%, -50%) translateY(-58px)`,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    {i === 0 && (
                      <Crosshair className="w-4 h-4 text-green-400" />
                    )}
                    {i === 1 && <Target className="w-4 h-4 text-cyan-400" />}
                    {i === 2 && <Radar className="w-4 h-4 text-green-400" />}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Branding */}
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1
                className="flex items-center justify-center text-5xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-600"
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
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-green-500"></div>
                <span className="text-xs text-green-400 tracking-widest">
                  SECURE ACCESS
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-green-500"></div>
              </div>
            </motion.div>

            <CardTitle className="text-xl text-white flex items-center justify-center gap-3 pt-2">
              <Zap className="w-5 h-5 text-green-500" fill="currentColor" />
              <span className="tracking-wide">CODE VERIFICATION</span>
              <Zap className="w-5 h-5 text-green-500" fill="currentColor" />
            </CardTitle>
            <CardDescription className="text-white px-4">
              Code deployed to <span className="text-green-400">{email}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* OTP Input grid */}
              <div className="flex justify-center gap-2.5">
                {Array.from({ length: OTP_CONFIG.length }).map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`otp.${index}`}
                    render={({ field: formField }) => (
                      <FormItem>
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            delay: index * 0.08,
                            type: "spring",
                            bounce: 0.4,
                          }}
                          className="relative"
                        >
                          <FormControl>
                            <input
                              ref={(el) => {
                                inputRefs.current[index] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={formField.value || ""}
                              onChange={(e) => {
                                handleChange(index, e.target.value);
                                formField.onChange(e.target.value);
                              }}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              onBlur={formField.onBlur}
                              className={cn(
                                "w-12 h-16 text-center bg-black dark:bg-slate-950/60 border-2 border-slate-300 dark:border-slate-700 rounded-lg text-white text-2xl placeholder:text-slate-700 dark:placeholder:text-white/60 focus:border-green-500 focus:shadow-lg focus:shadow-green-500/30 focus:outline-none transition-all duration-300",
                                form.formState.errors.otp?.[index] &&
                                  "!border-[var(--color-error)] focus:!border-[var(--color-error)] focus:!shadow-[0_0_0_3px_rgba(247,40,40,0.25)] dark:!border-[var(--color-error)]"
                              )}
                              style={{ fontWeight: 700 }}
                            />
                          </FormControl>

                          {/* Active indicator */}
                          {formField.value && (
                            <>
                              <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              />
                              <motion.div
                                className="absolute inset-0 rounded-lg border-2 border-green-500/50 pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </>
                          )}
                        </motion.div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2">
                {otpValues.map((digit, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        digit
                          ? "w-8 bg-gradient-to-r from-green-500 to-cyan-500"
                          : "w-3 bg-slate-300 dark:bg-slate-700"
                      }`}
                    />
                    {digit && (
                      <motion.div
                        className="absolute inset-0 bg-green-500 rounded-full blur-sm"
                        animate={{ opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Submit button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <ControllerButton
                  type="submit"
                  variant="success"
                  disabled={!isComplete || form.formState.isSubmitting}
                >
                  {context === "login" ? "AUTHORIZE" : "ACTIVATE"}
                </ControllerButton>
              </motion.div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-5 px-6 pb-8">
          {/* Resend section */}
          <div className="text-center space-y-3">
            <p className="text-xs text-white uppercase tracking-wide">
              Code Expired?
            </p>
            <motion.button
              onClick={handleResend}
              disabled={isResending}
              className="text-sm text-green-400 hover:text-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto uppercase tracking-wider"
              style={{ fontWeight: 700 }}
              whileHover={{ scale: isResending ? 1 : 1.05 }}
              whileTap={{ scale: isResending ? 1 : 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isResending ? (
                  <motion.div
                    key="loading"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Radar className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="zap"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Zap className="w-4 h-4" fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>
              {isResending ? "Deploying..." : "Redeploy Code"}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-slate-300 dark:to-slate-700"></div>
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-5 h-5 text-slate-400" />
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-700 to-slate-300 dark:to-slate-700"></div>
          </div>

          {/* Back button */}
          <motion.button
            onClick={onBack}
            className="flex items-center text-sm text-white hover:text-white/80 transition-colors mx-auto group uppercase tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Abort Mission
          </motion.button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
