import React from 'react';

function StatsCard({ title, value }) {
    return (
        <div className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition-all w-full">
            <div className="text-sm text-gray-500 font-medium">{title}</div>
            <div className="text-2xl font-semibold text-gray-800 mt-1">{value}</div>
        </div>
    );
}

export default StatsCard;