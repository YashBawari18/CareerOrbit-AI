import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const data = [
    { name: 'AI/ML', value: 145 },
    { name: 'Cloud', value: 98 },
    { name: 'Cybersec', value: 87 },
    { name: 'DevOps', value: 76 },
    { name: 'Data Sci', value: 65 },
];

const colors = ['#FF6B00', '#FF8533', '#FFA366', '#FFC299', '#FFE0CC'];

const SkillGrowthChart = () => {
    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 5,
                        right: 30,
                        left: 40,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 500 }}
                        width={80}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{
                            backgroundColor: 'rgba(20, 20, 25, 0.95)',
                            borderColor: 'var(--border-color, rgba(255,255,255,0.1))',
                            borderRadius: '8px',
                            color: '#fff',
                        }}
                        formatter={(value) => [`+${value}%`, 'Growth Rate']}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} animationDuration={1500}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillGrowthChart;
