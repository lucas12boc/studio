
"use client";

import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart as LucideBarChart, TrendingUp, DollarSign, Target, CheckCircle, GraduationCap, Briefcase, Edit } from "lucide-react";
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";
import Image from "next/image";
import { useState, useEffect, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const chartData = [
  { month: "Enero", income: 1860, expenses: 800 },
  { month: "Febrero", income: 3050, expenses: 1200 },
  { month: "Marzo", income: 2370, expenses: 900 },
  { month: "Abril", income: 7300, expenses: 2000 },
  { month: "Mayo", income: 2090, expenses: 1100 },
  { month: "Junio", income: 2140, expenses: 1300 },
];

const chartConfig = {
  income: {
    label: "Ingresos",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Gastos",
    color: "hsl(var(--chart-2))",
  },
};


export default function DashboardPage() {
  const { toast } = useToast();
  const [monthlyTarget, setMonthlyTarget] = useState<number>(0);
  const [achievedThisMonth, setAchievedThisMonth] = useState<number>(0);
  
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [newGoalAmount, setNewGoalAmount] = useState<string>("");
  const [newAchievedAmount, setNewAchievedAmount] = useState<string>("");

  useEffect(() => {
    const storedTarget = localStorage.getItem("monthlyTarget");
    if (storedTarget) {
      setMonthlyTarget(Number(JSON.parse(storedTarget)));
    } else {
      setMonthlyTarget(5000); // Default if nothing in localStorage
    }

    const storedAchieved = localStorage.getItem("achievedThisMonth");
    if (storedAchieved) {
      setAchievedThisMonth(Number(JSON.parse(storedAchieved)));
    } else {
      setAchievedThisMonth(0); // Default if nothing in localStorage
    }
  }, []);

  useEffect(() => {
    // Solo guardar si monthlyTarget no es el valor inicial de carga (0) para evitar sobreescribir con 0 al inicio.
    // O mejor, guardar siempre que no sea undefined o null.
    // Para simplificar, guardamos siempre que cambie después de la carga inicial.
    if (monthlyTarget !== 0 || localStorage.getItem("monthlyTarget")) {
        localStorage.setItem("monthlyTarget", JSON.stringify(monthlyTarget));
    }
  }, [monthlyTarget]);

  useEffect(() => {
    if (achievedThisMonth !== 0 || localStorage.getItem("achievedThisMonth")) {
        localStorage.setItem("achievedThisMonth", JSON.stringify(achievedThisMonth));
    }
  }, [achievedThisMonth]);

  const handleSaveNewGoal = () => {
    const amount = parseFloat(newGoalAmount);
    if (!isNaN(amount) && amount > 0) {
      setMonthlyTarget(amount);
      setIsGoalDialogOpen(false);
      setNewGoalAmount("");
      toast({ title: "Meta Actualizada", description: "Tu nueva meta mensual ha sido guardada." });
    } else {
      toast({ title: "Error", description: "Por favor, ingresa un monto válido para la meta.", variant: "destructive" });
    }
  };

  const handleUpdateAchieved = (e: FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newAchievedAmount);
    if (!isNaN(amount) && amount >= 0) {
        setAchievedThisMonth(amount);
        setNewAchievedAmount(""); 
        toast({ title: "Progreso Actualizado", description: "Tu monto alcanzado ha sido actualizado." });
    } else {
        toast({ title: "Error", description: "Por favor, ingresa un monto válido.", variant: "destructive" });
    }
  };


  return (
    <AppLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <LucideBarChart className="h-6 w-6" />
              Resumen de Ingresos
            </CardTitle>
            <CardDescription>Visualiza tus potenciales fuentes de ingreso y progreso.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} unit="$" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={4}>
                   <LabelList position="top" offset={5} className="fill-foreground" fontSize={12} formatter={(value: number) => `$${value}`} />
                </Bar>
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4}>
                   <LabelList position="top" offset={5} className="fill-foreground" fontSize={12} formatter={(value: number) => `$${value}`} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Target className="h-6 w-6" />
              Mis Metas de Ingresos
            </CardTitle>
            <CardDescription>Sigue y gestiona tus objetivos financieros.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Meta Mensual</p>
                <p className="text-2xl font-bold text-primary">${monthlyTarget.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alcanzado este Mes</p>
                <p className="text-2xl font-bold text-green-500">${achievedThisMonth.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            
            <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Edit className="mr-2 h-4 w-4" /> Fijar Nueva Meta
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Establece Tu Meta Mensual de Ingresos</DialogTitle>
                  <DialogDescription>
                    Define tu objetivo para este mes. Esto te ayudará a seguir tu progreso.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="goalAmount" className="text-right">
                      Monto ($)
                    </Label>
                    <Input
                      id="goalAmount"
                      type="number"
                      value={newGoalAmount}
                      onChange={(e) => setNewGoalAmount(e.target.value)}
                      className="col-span-3"
                      placeholder="ej: 5000"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="button" onClick={handleSaveNewGoal}>Guardar Meta</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <form onSubmit={handleUpdateAchieved} className="mt-4 space-y-2 border-t pt-4">
              <Label htmlFor="achievedAmountInput" className="text-sm font-medium">Actualizar Monto Alcanzado ($)</Label>
              <div className="flex gap-2">
                <Input
                  id="achievedAmountInput"
                  type="number"
                  placeholder="Ingresar monto"
                  value={newAchievedAmount}
                  onChange={(e) => setNewAchievedAmount(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" variant="outline" size="sm">Actualizar</Button>
              </div>
            </form>

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <DollarSign className="h-6 w-6" />
              Inicio Rápido de Estrategia
            </CardTitle>
            <CardDescription>Genera tu estrategia de ingresos personalizada.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Image src="https://placehold.co/300x200.png" alt="AI Strategy Illustration" width={300} height={200} className="mb-4 rounded-lg" data-ai-hint="ai strategy" />
            <p className="mb-4 text-muted-foreground">
              Deja que nuestra IA analice tu perfil y sugiera las mejores fuentes de ingreso para ti.
            </p>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/strategy">
                Generar Estrategia
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <GraduationCap className="h-6 w-6" />
              Aprendizaje Destacado
            </CardTitle>
            <CardDescription>Mejora tus habilidades con estos cursos.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span>Marketing Digital Avanzado</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learning">Ver</Link>
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Masterclass de Freelancing</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learning">Ver</Link>
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Estrategias de Inversión 101</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learning">Ver</Link>
                </Button>
              </li>
            </ul>
            <Button asChild className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/learning">Explorar Todos los Cursos</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Briefcase className="h-6 w-6" />
              Oportunidades Laborales Calientes
            </CardTitle>
            <CardDescription>Descubre ofertas de empleo relevantes.</CardDescription>
          </CardHeader>
          <CardContent>
             <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span>Diseñador UX Remoto</span>
                 <Button variant="outline" size="sm" asChild>
                   <Link href="/jobs">Detalles</Link>
                 </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Ingeniero de Prompts AI</span>
                 <Button variant="outline" size="sm" asChild>
                   <Link href="/jobs">Detalles</Link>
                 </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Especialista en Marketing de Contenidos</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/jobs">Detalles</Link>
                  </Button>
              </li>
            </ul>
            <Button asChild className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/jobs">Ver Todos los Trabajos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

    