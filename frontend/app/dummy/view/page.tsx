import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function Page() {
    const response = await fetch("http://backend:8000/private/dummy/api/get-dummy-data", {
        method: "GET",
    });
    const data = await response.json();

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <Card className="overflow-y-scroll h-3/4">
                <CardHeader>
                    <CardTitle>Dummy Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-24">ID</TableHead>
                                <TableHead>Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item: { id: number; name: string }) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
