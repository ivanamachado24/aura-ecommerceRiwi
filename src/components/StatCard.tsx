import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'purple' | 'pink' | 'blue' | 'green';
}

export default function StatCard({ title, value, icon: Icon, trend, color = 'purple' }: StatCardProps) {
    const colorClasses = {
        purple: 'from-purple-500 to-purple-600',
        pink: 'from-pink-500 to-pink-600',
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-md card-hover animate-slide-up">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trend && (
                    <div className={`text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                    </div>
                )}
            </div>
            <div>
                <p className="text-gray-500 text-sm mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
