
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AuthError } from 'firebase/auth';
import { Lightbulb, Mail, LogIn, UserPlus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const emailSignInSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un correo válido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

const emailSignUpSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un correo válido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
  confirmPassword: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"], 
});


type EmailSignInFormValues = z.infer<typeof emailSignInSchema>;
type EmailSignUpFormValues = z.infer<typeof emailSignUpSchema>;

export default function SignInPage() {
  const { user, signInWithGoogle, loading: authLoading, isFirebaseConfigured, signUpWithEmailPassword, signInWithEmailPassword } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formLoading, setFormLoading] = useState(false); // For email form submission

  // Debug logs
  // console.log("SignInPage Render: isFirebaseConfigured =", isFirebaseConfigured, "authLoading =", authLoading, "formLoading =", formLoading);


  const currentSchema = isSigningUp ? emailSignUpSchema : emailSignInSchema;
  const form = useForm<EmailSignInFormValues | EmailSignUpFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(isSigningUp && { confirmPassword: '' }),
    },
  });

  useEffect(() => {
    form.reset({
      email: '',
      password: '',
      ...(isSigningUp && { confirmPassword: '' }),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSigningUp, form.reset]);


  useEffect(() => {
    if (!authLoading && user) {
      // console.log("SignInPage: User detected, redirecting to /dashboard");
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleGoogleSignIn = async () => {
    // console.log("SignInPage: handleGoogleSignIn called. isFirebaseConfigured =", isFirebaseConfigured);
    if (!isFirebaseConfigured) {
      toast({ title: "Error de Configuración", description: "Firebase no está configurado. Contacta al administrador.", variant: "destructive" });
      return;
    }
    try {
      await signInWithGoogle();
      // Redirect is handled by useEffect after onAuthStateChanged updates user state
    } catch (error) {
      const authError = error as AuthError;
      // console.error("SignInPage: Google Sign-In error caught in component:", authError);
      toast({ title: "Error de Inicio de Sesión con Google", description: authError.message || "No se pudo iniciar sesión con Google.", variant: "destructive" });
    }
  };

  const handleEmailFormSubmit = async (values: EmailSignInFormValues | EmailSignUpFormValues) => {
    // console.log("SignInPage: handleEmailFormSubmit called. isFirebaseConfigured =", isFirebaseConfigured, "isSigningUp =", isSigningUp);
    if (!isFirebaseConfigured) {
      toast({ title: "Error de Configuración", description: "Firebase no está configurado.", variant: "destructive" });
      return;
    }
    setFormLoading(true);
    try {
      let result;
      if (isSigningUp) {
        const signUpValues = values as EmailSignUpFormValues;
        result = await signUpWithEmailPassword(signUpValues.email, signUpValues.password);
      } else {
        const signInValues = values as EmailSignInFormValues;
        result = await signInWithEmailPassword(signInValues.email, signInValues.password);
      }

      // console.log("SignInPage: Email auth result:", result);

      if (result && 'code' in result && typeof result.code === 'string') { // It's an AuthError
        toast({ title: isSigningUp ? "Error de Registro" : "Error de Inicio de Sesión", description: result.message || "Ocurrió un error.", variant: "destructive" });
      } else {
        // Successful sign-in/up will trigger useEffect for redirect
        toast({ title: isSigningUp ? "Registro Exitoso" : "Inicio de Sesión Exitoso", description: "Redirigiendo al dashboard..." });
      }
    } catch (error) { 
      // This catch is a fallback, context should ideally return AuthError objects
      // console.error("SignInPage: Email Sign-In/Up unexpected error caught in component:", error);
      const authError = error as AuthError;
      toast({ title: "Error Inesperado", description: authError.message || "Ocurrió un error inesperado.", variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };
  
  // Combined loading state for disabling UI elements
  const isLoading = authLoading || formLoading;

  if (authLoading && !user && isFirebaseConfigured) { 
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-100 p-4">
        <Lightbulb className="h-16 w-16 text-primary animate-pulse mx-auto mb-4" />
        <p className="text-xl text-primary">Cargando ProsperIA...</p>
      </div>
    );
  }
  
  if (user && !authLoading) { 
      return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-100 p-4">
            <Lightbulb className="h-16 w-16 text-primary animate-pulse mx-auto mb-4" />
            <p className="text-xl text-primary">Redirigiendo...</p>
        </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardHeader className="text-center pt-8">
          <Link href="/" className="flex items-center gap-2 justify-center mb-6">
            <Lightbulb className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold font-headline text-primary">ProsperIA</h1>
          </Link>
          <CardTitle className="text-2xl font-headline">{isSigningUp ? 'Crear Cuenta' : 'Iniciar Sesión'}</CardTitle>
          <CardDescription>Accede o crea tu cuenta para continuar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <form onSubmit={form.handleSubmit(handleEmailFormSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="tu@correo.com" {...form.register('email')} disabled={isLoading || !isFirebaseConfigured} />
              {form.formState.errors.email && <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••••" {...form.register('password')} disabled={isLoading || !isFirebaseConfigured} />
              {form.formState.errors.password && <p className="text-xs text-destructive mt-1">{form.formState.errors.password.message}</p>}
            </div>
            {isSigningUp && (
              <div>
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" {...form.register('confirmPassword' as keyof EmailSignUpFormValues)} disabled={isLoading || !isFirebaseConfigured} />
                 {form.formState.errors.confirmPassword && <p className="text-xs text-destructive mt-1">{(form.formState.errors.confirmPassword as any).message}</p>}
              </div>
            )}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-md py-6" disabled={isLoading || !isFirebaseConfigured}>
              {isLoading && form.formState.isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : (isSigningUp ? <UserPlus className="h-5 w-5 mr-2" /> : <LogIn className="h-5 w-5 mr-2" />)}
              {isSigningUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O continúa con
              </span>
            </div>
          </div>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full text-md py-6 flex items-center justify-center gap-2"
            disabled={isLoading || !isFirebaseConfigured}
          >
            {isLoading && !form.formState.isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : ( // Show loader if global auth is loading, not specific to email form
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            Google
          </Button>
          <Button variant="outline" className="w-full text-md py-6 flex items-center justify-center gap-2" disabled={true}>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.256 15.3c-.363 1.192-1.295 2.624-2.528 2.624-1.258 0-1.74-.93-2.936-.93s-1.74.904-2.937.904c-1.207 0-2.31-.98-2.936-2.496-1.558-3.79.623-6.75 2.527-9.07C9.37 4.186 10.577 3 12 3c.026 0 .053 0 .079 0 .026-.002.053-.002.08-.002.025 0 .052 0 .078-.002s.053 0 .08 0c1.267 0 2.22.98 2.937 2.158 1.05 1.628 1.636 3.352 1.636 3.352s-1.89-.606-3.665-.553c-1.902 0-3.352 1.294-3.352 3.076s1.373 3.102 3.352 3.05 3.614-1.24 3.614-1.24a4.172 4.172 0 0 1 .146.467zM12.016.037C10.292.062 8.65.968 7.55 2.376c-2.47 3.253-.335 7.777 1.61 10.373.98.98 1.933 1.602 3.25 1.602 1.294 0 1.802-.676 3.225-.676s1.852.675 3.225.675c1.343 0 2.24-.702 3.194-1.602C23.99 9.93 24.576 4.38 22.052 2.04c-1.24-1.18-2.858-1.92-4.64-2.003A11.75 11.75 0 0 0 12.016.037z"></path></svg>
            Apple (Próximamente)
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pb-8">
            <Button variant="link" onClick={() => setIsSigningUp(!isSigningUp)} className="text-sm">
              {isSigningUp ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
                Al continuar, aceptas nuestros <Link href="/terms" className="underline hover:text-primary">Términos de Servicio</Link> y <Link href="/privacy" className="underline hover:text-primary">Política de Privacidad</Link>.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
