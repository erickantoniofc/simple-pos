import { useDispatch} from "react-redux"
import { cn } from "@/lib/utils"
import {useForm} from "react-hook-form"
import { login } from "@/store/auth/auth-slice"
import { zodResolver } from "@hookform/resolvers/zod";

import type { AppDispatch } from "@/store/store"
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


export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {

  const dispatch = useDispatch<AppDispatch>();

  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({resolver: zodResolver(loginSchema)});
  
  const onSubmitHandler = (data: LoginFormData) => {
    dispatch(login());
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex align-middle">
            <div className="flex-1">
            <CardTitle>Inicia sesion</CardTitle>

            </div>
          <ModeToggle/>

          </div>
          <CardDescription>
            Ingresa tus credenciales para acceder
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
                  placeholder="m@example.com"
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
                    Olvidaste tu contraseña?
                  </a>
                </div>
                <Input id="password" type="password" {...register("password")} />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer text-foreground">
                  Acceder
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              No tienes una cuenta? {" "}
              <a href="#" className="underline underline-offset-4">
                Registrarse
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
