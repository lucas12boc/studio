
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Lightbulb, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-blue-100">
      <header className="container mx-auto py-6 px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Lightbulb className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">ProsperIA</h1>
        </Link>
        <nav className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Iniciar Sesión</Link>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/dashboard">Comienza Gratis</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto py-16 md:py-24 px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6">
            ProsperIA: Tu Inteligencia Artificial para el Éxito Financiero
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Genera estrategias de ingresos personalizadas, descubre oportunidades de aprendizaje y encuentra el trabajo de tus sueños. Todo en un solo lugar impulsado por IA.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 px-8">
            <Link href="/dashboard">Explora el Dashboard</Link>
          </Button>
          <div className="mt-12">
            <Image 
              src="https://placehold.co/800x400.png" 
              alt="Ilustración de ProsperIA en acción" 
              width={800} 
              height={400} 
              className="rounded-lg mx-auto shadow-xl"
              data-ai-hint="digital success" 
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background/70">
          <div className="container mx-auto px-4 md:px-6">
            <h3 className="text-3xl font-bold font-headline text-center mb-12">¿Por qué elegir ProsperIA?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Lightbulb className="h-12 w-12 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-center">Estrategias Inteligentes</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Nuestra IA analiza tu perfil para crear planes de ingresos únicos y adaptados a ti, maximizando tu potencial.
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <GraduationCap className="h-12 w-12 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-center">Aprendizaje Continuo</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Accede a recursos y cursos curados para desarrollar las habilidades más demandadas en el mercado actual.
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Briefcase className="h-12 w-12 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-center">Oportunidades Reales</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Conéctate con ofertas de empleo relevantes y da el siguiente paso en tu carrera profesional.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="container mx-auto py-16 md:py-24 px-4 md:px-6 text-center">
           <div className="max-w-2xl mx-auto">
             <TrendingUp className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold font-headline mb-6">¿Listo para transformar tu futuro financiero?</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Únete a ProsperIA hoy mismo y comienza a construir el camino hacia tus metas económicas con el poder de la inteligencia artificial.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 px-8">
              <Link href="/upgrade">Ver Planes Premium</Link>
            </Button>
           </div>
        </section>
      </main>

      <footer className="container mx-auto py-8 px-4 md:px-6 text-center text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} Lucas Leandro Guzmán - ProsperIA. Todos los derechos reservados.</p>
        <div className="mt-2 space-x-4">
            <Link href="mailto:ProsperIApro2025@gmail.com" className="hover:text-primary">Email</Link>
            <Link href="https://wa.me/542257405607" target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp</Link>
        </div>
      </footer>
    </div>
  );
}
