import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

const data = [
    { year: '2020', demand: 45, growth: 20 },
    { year: '2021', demand: 52, growth: 35 },
    { year: '2022', demand: 68, growth: 50 },
    { year: '2023', demand: 74, growth: 65 },
    { year: '2024', demand: 85, growth: 80 },
    { year: '2025', demand: 95, growth: 92 },
];

const SkillTrendChart = () => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary-color, #ff6b00)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--primary-color, #ff6b00)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                        dataKey="year"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(20, 20, 25, 0.95)',
                            borderColor: 'var(--border-color, rgba(255,255,255,0.1))',
                            borderRadius: '8px',
                            color: '#fff',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                        }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="demand"
                        stroke="var(--primary-color, #ff6b00)"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorDemand)"
                        animationDuration={2000}
                        name="Market Demand Index"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillTrendChart;
