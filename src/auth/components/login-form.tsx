import { useDispatch, useSelector } from "react-redux"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { signInUser, clearError } from "@/store/auth/auth-slice"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react"
import { toast } from "sonner"

import type { AppDispatch, RootState } from "@/store/store"
import { loginSchema, type LoginFormData } from "@/data/schemas/login-schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button
} from "@/components"
import { ModeToggle } from "@/components/mode-toggle";
import { Loader2 } from "lucide-react";


export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmitHandler = async (data: LoginFormData) => {
    try {
      const result = await dispatch(signInUser(data));
      if (signInUser.fulfilled.match(result)) {
        toast.success("¡Bienvenido! Has iniciado sesión correctamente.");
      } else {
        // Error will be handled by useEffect below
      }
    } catch {
      toast.error("Error inesperado al iniciar sesión");
    }
  }

  // Handle auth errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex align-middle">
            <div className="flex-1">
              <CardTitle>Inicia sesión</CardTitle>
            </div>
            <ModeToggle />
          </div>
          <CardDescription>
            Ingresa tus credenciales para acceder al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  disabled={loading}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  disabled={loading}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full cursor-pointer text-foreground"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    "Acceder"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
