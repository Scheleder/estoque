"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components//ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components//ui/chart"
import { Separator } from "@/components//ui/separator"
import { React, useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { api }  from '@/services/config';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Loading from '@/components/loading';
import { ArrowRightLeft, Milestone, Shuffle, SquarePlus, SquareMinus, PlaneLanding, PlaneTakeoff, CircleMinus, CirclePlus, Check, FileText, Warehouse, SlidersVertical, Replace, ReplaceAll } from 'lucide-react';
import ErrorPage from "./utils/ErrorPage";
import { useToast } from "@/components/ui/use-toast";
import Scanner from '@/components/scanner';
const styles = {
  menu: base => ({
    ...base,
    marginTop: 0,
    zIndex: 9999,
  }),
  control: (base) => ({
    ...base,
    paddingLeft: '1rem'
  }),
  option: (base) => ({
    ...base,
    paddingLeft: '1rem'
  }),
  singleValue: (base) => ({
    ...base,
    paddingLeft: '1rem'
  }),
  placeholder: (base) => ({
    ...base,
    paddingLeft: '1rem'
  }),
  input: (base) => ({
    ...base,
    paddingLeft: '1rem'
  }),
};

let user = {
  name: 'Visitante'
}
const Home = (props) => {

  //const { toast } = useToast();
  const navigate = useNavigate();
  const { control, register, handleSubmit, setValue } = useForm();
  const [items, setItems] = useState([]);
  const [locals, setLocals] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  //localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2ODU4MjYyfQ.ZkFHaoiYCTX52O2OL9UYJNRX8M0-izD7OtULQEr6rx4')
  //  localStorage.setItem('token', null);

  const getData = async () => {
    try {
      setIsProcessing(true);

      const [response1, response2] = await Promise.all([
        api.get('items'),
        api.get('locals')
      ]);
      console.log(response1.data)
      console.log(response2.data)

      const sortedItems = response1.data
        .map(item => ({
          value: item.id,
          label: `${item.adress} ░ ${item.Component.description} ░ ${item.Component.Brand.name}`,
          unity: item.Component.Unity.abrev,
          adress: item.adress,
          qtde: item.quantity
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setItems(sortedItems);

      const sortedLocals = response2.data
        .map(item => ({ value: item.id, label: item.name }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setLocals(sortedLocals);

    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pl-16 pt-20 p-4">
      <div className="shadow-lg rounded-md bg-gray-200 p-4 mb-4">
        <div className='relative mt-2'>
          <span className='absolute z-10 top-2 left-2' title="Scanner"><Scanner /></span>
        </div>
        <div className='col-span-3'>
          <Controller
            name="itemId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                value={items.find(option => option.value === field.value)}
                options={items}
                placeholder="Selecione o item"
                className="w-full"
                styles={styles}
                onChange={(selected) => field.onChange(selected.value).then(changeUnity(selected))}
              />
            )}
          />
        </div>
      </div>
{/* 
      <div className="grid grid-cols-3 shadow-lg rounded-md bg-gray-200 p-4 text-center">
        <div className="col-span-2">
          <Card className="w-full h-full" x-chunk="charts-01-chunk-0">
            <CardHeader className="space-y-0 pb-2">
              <CardDescription>Entradas e Saídas</CardDescription>
              <CardTitle className="text-4xl tabular-nums">
                12.584{" "}
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                  movimentações
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  steps: {
                    label: "Steps",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <BarChart
                  accessibilityLayer
                  margin={{
                    left: -4,
                    right: -4,
                  }}
                  data={[
                    {
                      date: "2024-01-01",
                      steps: 2000,
                    },
                    {
                      date: "2024-01-02",
                      steps: 2100,
                    },
                    {
                      date: "2024-01-03",
                      steps: 2200,
                    },
                    {
                      date: "2024-01-04",
                      steps: 1300,
                    },
                    {
                      date: "2024-01-05",
                      steps: 1400,
                    },
                    {
                      date: "2024-01-06",
                      steps: 2500,
                    },
                    {
                      date: "2024-01-07",
                      steps: 1600,
                    },
                  ]}
                >
                  <Bar
                    dataKey="steps"
                    fill="var(--color-steps)"
                    radius={5}
                    fillOpacity={0.6}
                    activeBar={<Rectangle fillOpacity={0.8} />}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    tickFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        weekday: "short",
                      })
                    }}
                  />
                  <ChartTooltip
                    defaultIndex={2}
                    content={
                      <ChartTooltipContent
                        hideIndicator
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        }}
                      />
                    }
                    cursor={false}
                  />
                  <ReferenceLine
                    y={1200}
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="3 3"
                    strokeWidth={1}
                  >
                    <Label
                      position="insideBottomLeft"
                      value="Average Steps"
                      offset={10}
                      fill="hsl(var(--foreground))"
                    />
                    <Label
                      position="insideTopLeft"
                      value="12,343"
                      className="text-lg"
                      fill="hsl(var(--foreground))"
                      offset={10}
                      startOffset={100}
                    />
                  </ReferenceLine>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1">
              <CardDescription>
                Over the past 7 days, you have walked{" "}
                <span className="font-medium text-foreground">53,305</span> steps.
              </CardDescription>
              <CardDescription>
                You need{" "}
                <span className="font-medium text-foreground">12,584</span> more
                steps to reach your goal.
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
        <div className="col-span-1 pl-4">
          <Card className="xs:max-w-xs" x-chunk="charts-01-chunk-5">
            <CardContent className="flex gap-4 p-4">
              <div className="grid items-center gap-2">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">Move</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    562/600
                    <span className="text-sm font-normal text-muted-foreground">
                      kcal
                    </span>
                  </div>
                </div>
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">Exercise</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    73/120
                    <span className="text-sm font-normal text-muted-foreground">
                      min
                    </span>
                  </div>
                </div>
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">Stand</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    8/12
                    <span className="text-sm font-normal text-muted-foreground">
                      hr
                    </span>
                  </div>
                </div>
              </div>
              <ChartContainer
                config={{
                  move: {
                    label: "Move",
                    color: "hsl(var(--chart-1))",
                  },
                  exercise: {
                    label: "Exercise",
                    color: "hsl(var(--chart-2))",
                  },
                  stand: {
                    label: "Stand",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="mx-auto aspect-square w-full max-w-[80%]"
              >
                <RadialBarChart
                  margin={{
                    left: -10,
                    right: -10,
                    top: -10,
                    bottom: -10,
                  }}
                  data={[
                    {
                      activity: "stand",
                      value: (8 / 12) * 100,
                      fill: "var(--color-stand)",
                    },
                    {
                      activity: "exercise",
                      value: (46 / 60) * 100,
                      fill: "var(--color-exercise)",
                    },
                    {
                      activity: "move",
                      value: (245 / 360) * 100,
                      fill: "var(--color-move)",
                    },
                  ]}
                  innerRadius="20%"
                  barSize={24}
                  startAngle={90}
                  endAngle={450}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    dataKey="value"
                    tick={false}
                  />
                  <RadialBar dataKey="value" background cornerRadius={5} />
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="xs:max-w-xs my-4" x-chunk="charts-01-chunk-4" >
            <CardContent className="flex gap-4 p-4 pb-2">
              <ChartContainer
                config={{
                  move: {
                    label: "Move",
                    color: "hsl(var(--chart-1))",
                  },
                  stand: {
                    label: "Stand",
                    color: "hsl(var(--chart-2))",
                  },
                  exercise: {
                    label: "Exercise",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[140px] w-full"
              >
                <BarChart
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 10,
                  }}
                  data={[
                    {
                      activity: "stand",
                      value: (8 / 12) * 100,
                      label: "8/12 hr",
                      fill: "var(--color-stand)",
                    },
                    {
                      activity: "exercise",
                      value: (46 / 60) * 100,
                      label: "46/60 min",
                      fill: "var(--color-exercise)",
                    },
                    {
                      activity: "move",
                      value: (245 / 360) * 100,
                      label: "245/360 kcal",
                      fill: "var(--color-move)",
                    },
                  ]}
                  layout="vertical"
                  barSize={32}
                  barGap={2}
                >
                  <XAxis type="number" dataKey="value" hide />
                  <YAxis
                    dataKey="activity"
                    type="category"
                    tickLine={false}
                    tickMargin={4}
                    axisLine={false}
                    className="capitalize"
                  />
                  <Bar dataKey="value" radius={5}>
                    <LabelList
                      position="insideLeft"
                      dataKey="label"
                      fill="white"
                      offset={8}
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-row border-t p-4">
              <div className="flex w-full items-center gap-2">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Move</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    562
                    <span className="text-sm font-normal text-muted-foreground">
                      kcal
                    </span>
                  </div>
                </div>
                <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Exercise</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    73
                    <span className="text-sm font-normal text-muted-foreground">
                      min
                    </span>
                  </div>
                </div>
                <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Stand</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    14
                    <span className="text-sm font-normal text-muted-foreground">
                      hr
                    </span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="xs:max-w-xs align-bottom" x-chunk="charts-01-chunk-6" >
            <CardHeader className="p-4 pb-0">
              <CardTitle>Active Energy</CardTitle>
              <CardDescription>
                You're burning an average of 754 calories per day. Good job!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
              <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
                1,254
                <span className="text-sm font-normal text-muted-foreground">
                  kcal/day
                </span>
              </div>
              <ChartContainer
                config={{
                  calories: {
                    label: "Calories",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="ml-auto w-[64px]"
              >
                <BarChart
                  accessibilityLayer
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: "2024-01-01",
                      calories: 354,
                    },
                    {
                      date: "2024-01-02",
                      calories: 514,
                    },
                    {
                      date: "2024-01-03",
                      calories: 345,
                    },
                    {
                      date: "2024-01-04",
                      calories: 734,
                    },
                    {
                      date: "2024-01-05",
                      calories: 645,
                    },
                    {
                      date: "2024-01-06",
                      calories: 456,
                    },
                    {
                      date: "2024-01-07",
                      calories: 345,
                    },
                  ]}
                >
                  <Bar
                    dataKey="calories"
                    fill="var(--color-calories)"
                    radius={2}
                    fillOpacity={0.2}
                    activeIndex={6}
                    activeBar={<Rectangle fillOpacity={0.8} />}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    hide
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div> */}
    </div>
  )
}

export default Home