import { prisma } from '@/lib/prisma';
import AdminDashboardContent from '@/components/admin/adminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    // Отримуємо бронювання з сервісами
    const rawBookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        include: { service: true }
    });

    const bookings = rawBookings.map((booking) => ({
        ...booking,
        service: booking.service ? {
            ...booking.service,
            price: booking.service.price ? Number(booking.service.price) : 0,
        } : null,
    }));

    // Отримуємо послуги
    const rawServices = await prisma.service.findMany({
        orderBy: { title: 'asc' },
    });

    const services = rawServices.map((service) => ({
        ...service,
        price: service.price ? Number(service.price) : 0,
    }));

    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl text-white">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-zinc-400 text-sm">Manage studio bookings, statuses, and service packages.</p>
            </div>

            {/* Рендеримо клієнтський компонент з табами та сайдбаром */}
            <AdminDashboardContent initialBookings={bookings} initialServices={services} />
        </div>
    );
}