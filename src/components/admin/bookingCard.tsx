'use client';

import { Button } from '@/components/ui/button';
import { approveBooking, cancelBooking } from '@/app/actions/admin';

interface BookingItem {
    id: string;
    clientName: string;
    clientEmail: string | null;
    status: string;
    date: Date;
    service?: { title: string } | null;
}

const statusStyles: Record<string, string> = {
    CONFIRMED: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    CANCELLED: 'bg-red-500/10 text-red-400 border border-red-500/20',
    PENDING: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
};

export default function BookingCard({ booking }: { booking: BookingItem }) {
    const serviceTitle = booking.service?.title || 'Custom Session';
    const badgeClass = statusStyles[booking.status] || statusStyles.PENDING;

    return (
        <div className="p-6 rounded-xl bg-zinc-900 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">{booking.clientName}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeClass}`}>
                        {booking.status}
                    </span>
                </div>
                <p className="text-sm text-zinc-400">Contact: <span className="text-white">{booking.clientEmail}</span></p>
                <p className="text-sm text-zinc-400">Service: <span className="text-white">{serviceTitle}</span></p>
                <p className="text-sm text-zinc-400">
                    Date & Time: <span className="text-white">
                    {new Date(booking.date).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                    })}
                    </span>
                </p>
            </div>
            
            <div className="flex items-center gap-3">
                {booking.status === 'PENDING' && (
                    <form action={async () => {
                        await approveBooking(booking.id);
                    }}>
                        <Button 
                            type="submit"
                            className="bg-white text-black hover:bg-white/90 font-semibold cursor-pointer"
                        >
                            Approve & Send Email
                        </Button>
                    </form>
                )}

                {booking.status !== 'CANCELLED' && (
                    <form action={async () => {
                        await cancelBooking(booking.id);
                    }}>
                        <Button
                            type='submit'
                            variant='outline'
                            className='border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer'
                        >
                            Cancel
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}