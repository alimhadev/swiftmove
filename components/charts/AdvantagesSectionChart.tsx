"use client";

import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useTranslations } from "next-intl";

export const description = "A multiple bar chart";

const chartConfig = {
    motos: {
        label: "Motos",
        color: "hsl(var(--chart-1))",
    },
    vélos: {
        label: "Vélos",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

const AdvantagesSectionChart = () => {
    const t = useTranslations("SwiftMovePage.AdvantagesSection.chart");

    const chartData =
        t("lang") === "fr"
            ? [
                  { month: "Janvier", motos: 186, vélos: 80 },
                  { month: "Février", motos: 305, vélos: 200 },
                  { month: "Mars", motos: 237, vélos: 120 },
                  { month: "Avril", motos: 73, vélos: 190 },
                  { month: "Mai", motos: 209, vélos: 130 },
                  { month: "Juin", motos: 214, vélos: 140 },
                  { month: "Juillet", motos: 214, vélos: 140 },
                  { month: "Août", motos: 214, vélos: 140 },
                  { month: "Septembre", motos: 214, vélos: 140 },
                  { month: "Octobre", motos: 214, vélos: 140 },
                  { month: "Novembre", motos: 214, vélos: 140 },
                  { month: "Décembre", motos: 214, vélos: 140 },
              ]
            : [
                  { month: "January", motos: 186, vélos: 80 },
                  { month: "February", motos: 305, vélos: 200 },
                  { month: "March", motos: 237, vélos: 120 },
                  { month: "April", motos: 73, vélos: 190 },
                  { month: "May", motos: 209, vélos: 130 },
                  { month: "June", motos: 214, vélos: 140 },
                  { month: "July", motos: 214, vélos: 140 },
                  { month: "August", motos: 214, vélos: 140 },
                  { month: "September", motos: 214, vélos: 140 },
                  { month: "October", motos: 214, vélos: 140 },
                  { month: "November", motos: 214, vélos: 140 },
                  { month: "December", motos: 214, vélos: 140 },
              ];

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="text-center">
                <CardTitle>{t("title")}</CardTitle>
                <CardDescription>2024</CardDescription>
            </CardHeader>
            <CardContent className="h-1/2">
                <ChartContainer config={chartConfig}>
                    <AreaChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={true} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Area
                            dataKey="motos"
                            type="natural"
                            fill="#268EC5"
                            fillOpacity={0.3}
                            stroke="#268EC5"
                            // className="fill-info"
                        />
                        <Area
                            dataKey="vélos"
                            type="natural"
                            fill="#174275"
                            fillOpacity={0.3}
                            stroke="#174275"
                            // className="fill-success"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    );
};

export default AdvantagesSectionChart;
