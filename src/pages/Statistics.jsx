import React, { useState, useEffect } from 'react';
import { StatsCard, StatsInfo } from '../components/index';
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'

function Statistics() {

    const [todayDownloads, setTodayDownloads] = useState(0);
    const [monthlyDownloads, setMonthlyDownloads] = useState(0);
    const [todayEarnings, setTodayEarnings] = useState(0);
    const [monthlyEarnings, setMonthlyEarnings] = useState(0);
    const [notes, setNotes] = useState(null);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {

        const now = new Date();

        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

        appwriteService.getDownloadsByDateRange({ noteUserId: userData.$id, start: startOfToday, end: endOfToday }).then(setTodayDownloads);

        appwriteService.getDownloadsByDateRange({ noteUserId: userData.$id, start: startOfMonth, end: endOfMonth }).then(setMonthlyDownloads);

        appwriteService.getEarningsByDateRange({ noteUserId: userData.$id, start: startOfToday, end: endOfToday }).then(setTodayEarnings);

        appwriteService.getEarningsByDateRange({ noteUserId: userData.$id, start: startOfMonth, end: endOfMonth }).then(setMonthlyEarnings);

        appwriteService.getNotesByUser(userData.$id).then(response => setNotes(response.documents))

    }, [])


    const stats = [
        {
            title: 'Downloads Today',
            value: todayDownloads
        },
        {
            title: 'Earnings Today',
            value: todayEarnings,
        },
        {
            title: 'Monthly Downloads',
            value: monthlyDownloads,
        },
        {
            title: 'Monthly Earnings',
            value: monthlyEarnings,
        },
    ];


    return (
        <div className="p-4 sm:p-8">
            <h1 className="text-3xl font-bold mb-6">Statistics</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <StatsCard key={index} title={stat.title} value={stat.value} />
                ))}
            </div>
            <div className='p-4'>
                {notes && <div className="space-y-4">
                    {notes.map((note) => (
                        <StatsInfo
                            key={note.$id}
                            $id={note.$id}
                            title={note.title}
                            coverImageId={note.coverImageId}
                            pricing={note.pricing}
                            price={note.price}
                            uploadDate={note.$createdAt}
                            updateDate={note.$updatedAt}
                        />
                    ))}
                </div>}
            </div>
        </div>
    );
}

export default Statistics;
