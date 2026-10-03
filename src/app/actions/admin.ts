'use server'

import { prisma } from '@/lib/prisma';
import { sendBookingConfirmation } from '@/lib/emailService';
import { revalidatePath } from 'next/cache';

export async function approveBooking(bookingId: string) {
    try {
        const booking = await prisma.booking.update({
            where: {id: bookingId},
            data: { status: 'CONFIRMED'},
            include: {
                service: true,
            }
        });

        if (!booking) {
            return { success: false, error: 'Booking not found'};
        }

        const serviceTitle = booking.service?.title || "Photografy Session";

        await sendBookingConfirmation({
            clientName: booking.clientName,
            clientEmail: booking.clientEmail,
            serviceTitle: serviceTitle,
            bookingDate: booking.date,
            locale: "en",
        });
        revalidatePath('/admin');

        return{ success: true };
    } catch (error) {
        console.error('Failed to approve booking:', error);
        return { success: false, error: 'Internal server error during approval'};
    }
}