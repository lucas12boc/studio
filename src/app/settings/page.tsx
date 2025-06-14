
"use client";

import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout title="Ajustes">
      <div className="max-w-xl mx-auto">
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
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Actualmente, esta sección es un marcador de posición. En futuras actualizaciones, encontrarás opciones para:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Preferencias de tema (claro/oscuro).</li>
              <li>Configuración de notificaciones.</li>
              <li>Gestión de la cuenta (si se implementa autenticación).</li>
              <li>Y más...</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
