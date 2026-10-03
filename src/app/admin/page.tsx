import { prisma } from '@/lib/prisma';
import { approveBooking } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    // Отримуємо всі бронювання з бази, новіші зверху
    const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl text-white">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-zinc-400 mb-8">Manage client bookings and send confirmations.</p>

            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div 
                        key={booking.id}
                        className="p-6 rounded-xl bg-zinc-900 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-lg">{booking.clientName}</span>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                    booking.status === 'CONFIRMED' 
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                }`}>
                                    {booking.status}
                                </span>
                            </div>
                            <p className="text-sm text-zinc-400">Contact: <span className="text-white">{booking.clientEmail}</span></p>
                            <p className="text-sm text-zinc-400">Service: <span className="text-white">{booking.serviceId}</span></p>
                            <p className="text-sm text-zinc-400">
                               Date & Time: <span className="text-white">
                               {new Date(booking.date).toLocaleString('en-US', {
                               dateStyle: 'medium',
                               timeStyle: 'short',
                            })}
                            </span>
                            </p>
                        </div>

                        {booking.status === 'PENDING' && (
                            <form action={async () => {
                                'use server';
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
                    </div>
                ))}

                {bookings.length === 0 && (
                    <p className="text-center text-zinc-500 py-12">No bookings found yet.</p>
                )}
            </div>
        </div>
    );
}