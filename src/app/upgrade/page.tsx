
"use client";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, BarChart2, BookOpen, Briefcase, Star, Info, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const premiumFeatures = [
  {
    icon: Zap,
    title: "Generaciones Ilimitadas de Estrategias AI",
    description: "No te limites. Crea y explora todas las estrategias de ingresos que necesites.",
  },
  {
    icon: BarChart2,
    title: "Análisis Avanzado en el Dashboard",
    description: "Obtén métricas detalladas y visualizaciones profundas sobre tu progreso financiero.",
  },
  {
    icon: BookOpen,
    title: "Contenido de Aprendizaje Exclusivo",
    description: "Accede a cursos y recursos premium curados para potenciar tus habilidades.",
  },
  {
    icon: Briefcase,
    title: "Alertas de Empleo Prioritarias",
    description: "Recibe notificaciones instantáneas de las mejores oportunidades laborales para ti.",
  },
  {
    icon: Star,
    title: "Experiencia Sin Anuncios",
    description: "Disfruta de ProsperIA sin interrupciones y con una interfaz más limpia.",
  },
];

export default function UpgradePage() {
  return (
    <AppLayout title="Desbloquea ProsperIA Premium">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <Star className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl font-headline">ProsperIA Premium</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Lleva tu potencial de ingresos al siguiente nivel con nuestras funciones exclusivas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-background rounded-lg border">
                  <feature.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-4xl font-bold mb-2 text-primary">$9.99<span className="text-lg font-normal text-muted-foreground">/mes</span></p>
              
              <div className="my-6 p-4 bg-primary/10 border border-primary/30 rounded-lg text-primary">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5" />
                  <h4 className="font-semibold">Proceso de Pago</h4>
                </div>
                <p className="text-sm">
                  Haz clic en el botón de abajo para ser redirigido a nuestra plataforma de pago segura.
                </p>
                <p className="text-xs mt-3 text-muted-foreground">
                  Una vez completado el pago, tu cuenta Premium se activará. Si tienes algún inconveniente, contáctanos a <a href="mailto:ProsperIApro2025@gmail.com" className="underline font-medium">ProsperIApro2025@gmail.com</a>.
                </p>
                 <p className="text-xs mt-3 text-muted-foreground">
                  (Nota: En este prototipo, la activación puede requerir confirmación manual. En una versión final, sería automática tras el pago.)
                </p>
              </div>

              <Button asChild size="lg" className="w-full max-w-xs bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 mt-4">
                <Link href="https://app.takenos.com/pay/7ee97114-167c-4038-81b6-d84cb5283d0c" target="_blank" rel="noopener noreferrer">
                  ¡Actualizar Ahora y Prosperar!
                </Link>
              </Button>
               <p className="text-sm text-muted-foreground mt-6">Cancela en cualquier momento. Sin compromisos a largo plazo.</p>
            </div>

            <div className="mt-10 text-center">
                <Image 
                    src="https://placehold.co/600x300.png" 
                    alt="Ilustración de éxito financiero" 
                    width={600} 
                    height={300} 
                    className="rounded-lg mx-auto shadow-md"
                    data-ai-hint="financial success graph" 
                />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
