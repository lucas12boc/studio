
"use client";

import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";
import { ThemeToggleSwitch } from "@/components/theme-toggle-switch";

export default function SettingsPage() {
  return (
    <AppLayout title="Ajustes">
      <div className="max-w-xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <SettingsIcon className="h-6 w-6 text-primary" />
              Configuración de la Aplicación
            </CardTitle>
            <CardDescription>
              Aquí podrás personalizar tu experiencia en ProsperIA.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Tema de la Aplicación</h3>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <p className="text-muted-foreground">Alternar entre modo claro y oscuro.</p>
                <ThemeToggleSwitch />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Notificaciones (Próximamente)</h3>
              <p className="text-muted-foreground">
                En futuras actualizaciones, podrás configurar tus preferencias de notificación (alertas de empleo, progreso de metas, etc.).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Gestión de Cuenta (Próximamente)</h3>
              <p className="text-muted-foreground">
                Opciones para gestionar tu perfil y datos de cuenta estarán disponibles aquí si se implementa un sistema de autenticación completo.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
