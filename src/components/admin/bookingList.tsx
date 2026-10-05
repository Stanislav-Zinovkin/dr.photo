import BookingCard from '@/components/admin/bookingCard';

interface BookingItem {
    id: string;
    clientName: string;
    clientEmail: string | null;
    status: string;
    date: Date;
    service?: { title: string } | null;
}

export default function BookingsList({ bookings }: { bookings: BookingItem[] }) {
    if (bookings.length === 0) {
        return <p className="text-center text-zinc-500 py-12">No bookings found yet.</p>;
    }

    return (
        <div className="space-y-4">
            {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
            ))}
        </div>
    );
}