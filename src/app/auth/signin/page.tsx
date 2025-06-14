
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Lightbulb, Mail } from 'lucide-react'; // Using Lightbulb for consistency, added Mail

export default function SignInPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard'); // Redirect if already logged in
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-100 p-4">
        <Lightbulb className="h-16 w-16 text-primary animate-pulse mx-auto mb-4" />
        <p className="text-xl text-primary">Cargando ProsperIA...</p>
      </div>
    );
  }
  
  // If user becomes defined after loading, useEffect will redirect.
  // This prevents brief flash of sign-in page for already authenticated users.
  if (user && !loading) {
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
          <CardTitle className="text-2xl font-headline">Iniciar Sesión</CardTitle>
          <CardDescription>Accede a tu cuenta para continuar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-8">
          <Button
            onClick={signInWithGoogle}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-md py-6 flex items-center justify-center gap-2"
            disabled={loading || !useAuth().isFirebaseConfigured} // Disable if Firebase isn't configured
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuar con Google
          </Button>
          <Button variant="outline" className="w-full text-md py-6 flex items-center justify-center gap-2" disabled={true}>
            {/* Apple Icon could be an SVG or similar if desired in future */}
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.256 15.3c-.363 1.192-1.295 2.624-2.528 2.624-1.258 0-1.74-.93-2.936-.93s-1.74.904-2.937.904c-1.207 0-2.31-.98-2.936-2.496-1.558-3.79.623-6.75 2.527-9.07C9.37 4.186 10.577 3 12 3c.026 0 .053 0 .079 0 .026-.002.053-.002.08-.002.025 0 .052 0 .078-.002s.053 0 .08 0c1.267 0 2.22.98 2.937 2.158 1.05 1.628 1.636 3.352 1.636 3.352s-1.89-.606-3.665-.553c-1.902 0-3.352 1.294-3.352 3.076s1.373 3.102 3.352 3.05 3.614-1.24 3.614-1.24a4.172 4.172 0 0 1 .146.467zM12.016.037C10.292.062 8.65.968 7.55 2.376c-2.47 3.253-.335 7.777 1.61 10.373.98.98 1.933 1.602 3.25 1.602 1.294 0 1.802-.676 3.225-.676s1.852.675 3.225.675c1.343 0 2.24-.702 3.194-1.602C23.99 9.93 24.576 4.38 22.052 2.04c-1.24-1.18-2.858-1.92-4.64-2.003A11.75 11.75 0 0 0 12.016.037z"></path></svg>
            Continuar con Apple (Próximamente)
          </Button>
          <Button variant="outline" className="w-full text-md py-6 flex items-center justify-center gap-2" disabled={true}>
            <Mail className="h-5 w-5" />
            Continuar con Correo (Próximamente)
          </Button>
        </CardContent>
      </Card>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Al continuar, aceptas nuestros <Link href="/terms" className="underline hover:text-primary">Términos de Servicio</Link> y <Link href="/privacy" className="underline hover:text-primary">Política de Privacidad</Link>.
      </p>
    </div>
  );
}

// Need to import Link for the SignInPage
import Link from 'next/link';
