'use client';

import { useState } from 'react';
import BookingCard from '@/components/admin/bookingCard';
import ServicesSection from '@/components/admin/serviceSection';
import { 
    Inbox, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    Settings2 
} from 'lucide-react';

interface BookingItem {
    id: string;
    clientName: string;
    clientEmail: string | null;
    status: string;
    date: Date;
    service?: { title: string; price?: number } | null;
}

interface ServiceItem {
    id: string;
    title: string;
    description: string | null;
    price: number;
    durationMin: number | null;
    isActive: boolean;
}

export default function AdminDashboardContent({ 
    initialBookings, 
    initialServices 
}: { 
    initialBookings: BookingItem[]; 
    initialServices: ServiceItem[]; 
}) {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'services'>('pending');

    // Рахуємо лічильники для сайдбару
    const counts = {
        all: initialBookings.length,
        pending: initialBookings.filter(b => b.status === 'PENDING').length,
        confirmed: initialBookings.filter(b => b.status === 'CONFIRMED').length,
        cancelled: initialBookings.filter(b => b.status === 'CANCELLED').length,
        services: initialServices.length,
    };

    const filteredBookings = initialBookings.filter(booking => {
        if (activeTab === 'all') return true;
        if (activeTab === 'pending') return booking.status === 'PENDING';
        if (activeTab === 'confirmed') return booking.status === 'CONFIRMED';
        if (activeTab === 'cancelled') return booking.status === 'CANCELLED';
        return true;
    });

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* GitHub/Gmail style Sidebar */}
            <aside className="w-full lg:w-64 shrink-0 bg-zinc-900/50 border border-white/10 rounded-xl p-3 space-y-1 sticky top-6">
                <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Bookings
                </div>

                <button
                    onClick={() => setActiveTab('pending')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        activeTab === 'pending' ? 'bg-white text-black font-semibold' : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                    <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4" />
                        <span>Pending</span>
                    </div>
                    {counts.pending > 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                            activeTab === 'pending' ? 'bg-black text-white' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                            {counts.pending}
                        </span>
                    )}
                </button>

                <button
                    onClick={() => setActiveTab('confirmed')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        activeTab === 'confirmed' ? 'bg-white text-black font-semibold' : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                    <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirmed</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full text-zinc-400 bg-zinc-800">
                        {counts.confirmed}
                    </span>
                </button>

                <button
                    onClick={() => setActiveTab('cancelled')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        activeTab === 'cancelled' ? 'bg-white text-black font-semibold' : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                    <div className="flex items-center gap-2.5">
                        <XCircle className="w-4 h-4" />
                        <span>Cancelled</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full text-zinc-400 bg-zinc-800">
                        {counts.cancelled}
                    </span>
                </button>

                <button
                    onClick={() => setActiveTab('all')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        activeTab === 'all' ? 'bg-white text-black font-semibold' : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                    <div className="flex items-center gap-2.5">
                        <Inbox className="w-4 h-4" />
                        <span>All Bookings</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full text-zinc-400 bg-zinc-800">
                        {counts.all}
                    </span>
                </button>

                <div className="pt-4 pb-2 px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Studio Management
                </div>

                <button
                    onClick={() => setActiveTab('services')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        activeTab === 'services' ? 'bg-white text-black font-semibold' : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                    <div className="flex items-center gap-2.5">
                        <Settings2 className="w-4 h-4" />
                        <span>Services & Pricing</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full text-zinc-400 bg-zinc-800">
                        {counts.services}
                    </span>
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full space-y-4">
                {activeTab !== 'services' ? (
                    <>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold capitalize">
                                {activeTab} Bookings ({filteredBookings.length})
                            </h2>
                        </div>

                        {filteredBookings.length > 0 ? (
                            <div className="space-y-3">
                                {filteredBookings.map((booking) => (
                                    <BookingCard key={booking.id} booking={booking} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center rounded-xl bg-zinc-900/30 border border-white/5 text-zinc-500">
                                No {activeTab} bookings found.
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <ServicesSection initialServices={initialServices} />
                    </div>
                )}
            </main>
        </div>
    );
}