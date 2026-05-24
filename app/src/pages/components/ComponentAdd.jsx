import { React, useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router';
import { api }  from '@/services/config';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ButtonAdd from '@/components/buttonAdd';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Select from 'react-select';
import { Loader } from 'lucide-react';

export function ComponentAdd() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const { control, register, handleSubmit, setValue } = useForm();
    const [data, setData] = useState("");
    const [units, setUnits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedUnity, setSelectedUnity] = useState(null);
    const styles = { menu: base => ({ ...base, marginTop: 0 }) };

    const getData = async () => {
        try {
            setIsProcessing(true);
            const [response1, response2, response3] = await Promise.all([
                api.get('units'),
                api.get('categories'),
                api.get('brands')
            ]);

            const sortedUnits = response1.data
                .map(item => ({ value: item.id, label: item.name }))
                .sort((a, b) => a.label.localeCompare(b.label));

            setUnits(sortedUnits);
            console.log(units);

            const sortedCategories = response2.data
                .map(item => ({ value: item.id, label: item.name }))
                .sort((a, b) => a.label.localeCompare(b.label));

            setCategories(sortedCategories);
            console.log(categories);

            const sortedBrands = response3.data
                .map(item => ({ value: item.id, label: item.name }))
                .sort((a, b) => a.label.localeCompare(b.label));

            setBrands(sortedBrands);
            console.log(brands);
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const mySubmit = async (values) => {
        console.log(values);
        try {
            setIsProcessing(true);
            const response = await api.post('/components', values);
            console.log(response);
            if (response.status === 201) {
                setData(response.data.component);
                toast({
                    title: "Sucesso!",
                    description: response.data.msg,
                });
                clearForm();
            } else {
                toast({
                    title: "Falha!",
                    description: response.data.msg,
                });
            }
            setTimeout(function () {
                navigate(0)
            }, 1500);
        } catch (err) {
            setError(err);
            console.log(err);
            toast({
                title: "Erro!",
                description: err,
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const clearForm = () => {
        setSelectedBrand(null);
        setSelectedCategory(null);
        setSelectedUnity(null);
        setValue("description", '');
        setValue("barcode", '');
        setValue("sku", '');
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <ButtonAdd />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-100">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Novo Componente</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form onSubmit={handleSubmit(mySubmit)}>

                                <Controller
                                    name="brandId"
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={brands}
                                            value={selectedBrand}
                                            className="w-full mt-2"
                                            placeholder="Selecione o fabricante"
                                            styles={styles}
                                            onChange={(selected) => {
                                                setSelectedBrand(selected);
                                                field.onChange(selected ? selected.value : null);
                                            }}
                                        />
                                    )}
                                />

                                <Controller
                                    name="categoryId"
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={categories}
                                            value={selectedCategory}
                                            className="w-full mt-2"
                                            placeholder="Selecione a categoria"
                                            styles={styles}
                                            onChange={(selected) => {
                                                setSelectedCategory(selected);
                                                field.onChange(selected ? selected.value : null);
                                            }}
                                        />
                                    )}
                                />

                                <Controller
                                    name="unityId"
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={units}
                                            value={selectedUnity}
                                            className="w-full mt-2"
                                            placeholder="Selecione a unidade de medida"
                                            styles={styles}
                                            onChange={(selected) => {
                                                setSelectedUnity(selected);
                                                field.onChange(selected ? selected.value : null);
                                            }}
                                        />
                                    )}
                                />
                                <Input {...register("description", { required: true })} placeholder="Insira descrição" className="mt-2" />
                                <Input {...register("sku", { required: false })} placeholder="Insira o SKU" className="mt-2" />
                                <Input {...register("barcode", { required: false })} placeholder="Insira o código de barras" className="mt-2" />
                                <AlertDialogFooter className="mt-4">
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction type="submit" className="bg-blue-700 hover:bg-blue-500">Salvar</AlertDialogAction>
                                </AlertDialogFooter>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
