import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, Form, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
const FormSchema = z.object({
    tipodelegado: z.string(),
    cantidaddelegados: z.number(),
})

interface DelegateSelectionFormProps {
    onDelegateTypeChange: (type: string) => void;
    onDelegateCountChange: (count: number) => void;
    onContinue: () => void;
}

interface TipoDelegado {
    id: number,
    name: string
}
interface CantidadDelegado {
    id: number,
    cantidad: number
}
const tipoDelegado: TipoDelegado[] = [
    { id: 1, name: "Alcalde" },
    { id: 2, name: "Negritudes" },
    { id: 3, name: "Gobernador" },
    { id: 4, name: "Presidente o Delegado" },
]
const cantDelegado: CantidadDelegado[] = [
    { id: 1, cantidad: 1 },
    { id: 2, cantidad: 2 },
    { id: 3, cantidad: 3 },
    { id: 4, cantidad: 4 },
    { id: 5, cantidad: 5 },
    { id: 6, cantidad: 6 },
]

const DelegateSelectionForm = ({ onDelegateTypeChange, onDelegateCountChange, onContinue }: DelegateSelectionFormProps) => {
    const [delegateType, setDelegateType] = useState('');
    const [delegateCount, setDelegateCount] = useState(0);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onDelegateTypeChange(delegateType);
        onDelegateCountChange(delegateCount);
        onContinue();
    };

    return (
        <Card className='mb-4'>
            <CardContent>

                <Form {...form}>

                    <form onSubmit={handleSubmit}>
                        <FormField
                            control={form.control}
                            name="tipodelegado"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo delegado</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una etiqueta" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {tipoDelegado.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cantidaddelegados"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cantiad de vacantes</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                    // defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una etiqueta" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {cantDelegado.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.cantidad}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Continuar</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default DelegateSelectionForm;