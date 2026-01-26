import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const DasboardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Panel de control</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-1 pt-2">
        <Card size="sm" className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardDescription>Clientes activos</CardDescription>
            <CardTitle>
              <span className="text-3xl font-bold">50</span>
            </CardTitle>
          </CardHeader>
          {/* <CardContent>
            <p>
              The card component supports a size prop that can be set to
              &quot;sm&quot; for a more compact appearance.
            </p>
          </CardContent> */}
          {/* <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Ver detalles
            </Button>
          </CardFooter> */}
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardDescription>Ventas del dia</CardDescription>
            <CardTitle>
              <span className="text-3xl font-bold">$243.650,00</span>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card size="sm" className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardDescription>Mantenimientos pendientes</CardDescription>
            <CardTitle>
              <span className="text-3xl font-bold">0</span>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
