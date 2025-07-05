import React from 'react';
import { StatsCard, StatsInfo } from '../components/index'; 

function Statistics() {

    const stats = [
        {
            title: 'Today\'s Downloads',
            value: 12,
        },
        {
            title: 'Today\'s Earnings',
            value: `₹450`,
        },
        {
            title: 'This Month\'s Downloads',
            value: 138,
        },
        {
            title: 'This Month\'s Earnings',
            value: `₹6,120`,
        },
    ];

    const sampleNotes = [
        {
            $id: 'note1',
            title: 'Operating Systems Notes',
            coverImageId: 'cover_os123',
            pricing: 'Paid',
            price: 99,
            uploadDate: '2024-11-01T10:00:00Z',
            updateDate: '2025-07-01T14:30:00Z',
            totalReviews: 8,
            totalEarnings: 792,
        },
        {
            $id: 'note2',
            title: 'DBMS Full Guide',
            coverImageId: 'cover_db456',
            pricing: 'Free',
            price: 0,
            uploadDate: '2024-12-10T09:30:00Z',
            updateDate: '2025-06-28T12:45:00Z',
            totalReviews: 12,
            totalEarnings: 0,
        },
        {
            $id: 'note3',
            title: 'Computer Networks Essentials',
            coverImageId: 'cover_cn789',
            pricing: 'Paid',
            price: 79,
            uploadDate: '2025-01-15T11:45:00Z',
            updateDate: '2025-07-03T16:20:00Z',
            totalReviews: 5,
            totalEarnings: 395,
        },
    ];

    return (
        <div className="p-4 sm:p-8">
            <h1 className="text-3xl font-bold mb-6">Your Statistics</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <StatsCard key={index} title={stat.title} value={stat.value} />
                ))}
            </div>
            <div className="space-y-4">
                {sampleNotes.map((note) => (
                    <StatsInfo key={note.$id} {...note} />
                ))}
            </div>
        </div>
    );
}

export default Statistics;
