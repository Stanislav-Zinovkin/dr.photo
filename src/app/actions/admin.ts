'use server'

import { prisma } from '@/lib/prisma';
import { sendBookingCancellation, sendBookingConfirmation } from '@/lib/emailService';
import { revalidatePath } from 'next/cache';
import { BookingStatus } from '@prisma/client';

const ADMIN_PATHS = ['/en/admin', '/admin'];

function triggerRevalidation() {
    ADMIN_PATHS.forEach(path => revalidatePath(path));
}

export async function approveBooking(bookingId: string) {
    try {
        const booking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: 'CONFIRMED' },
            include: { service: true }
        });

        if (!booking) {
            return { success: false, error: 'Booking not found' };
        }

        const serviceTitle = booking.service?.title || 'Photography Session';

        if (booking.clientEmail) {
            await sendBookingConfirmation({
                clientName: booking.clientName,
                clientEmail: booking.clientEmail,
                serviceTitle,
                bookingDate: booking.date,
                locale: 'en',
            });
        }
        
        triggerRevalidation();
        return { success: true };
    } catch (error) {
        console.error('Failed to approve booking:', error);
        return { success: false, error: 'Internal server error during approval' };
    }
};

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
    try { 
        await prisma.booking.update({
            where: { id: bookingId },
            data: { status },
        });

        triggerRevalidation();
        return { success: true };
    } catch (error) {
        console.error('Failed to update booking status:', error);
        return { error: 'Failed to update status' };
    }
};

export async function cancelBooking(bookingId: string) {
    try {
        const booking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: 'CANCELLED' },
            include: { service: true },
        });

        if (!booking) {
            return { success: false, error: 'Booking not found' };
        }

        const serviceTitle = booking.service?.title || 'Photography Session';

        if (booking.clientEmail) {
            await sendBookingCancellation({
                clientName: booking.clientName,
                clientEmail: booking.clientEmail,
                serviceTitle,
                bookingDate: booking.date,
                locale: 'en',
            });
        }
        
        triggerRevalidation();
        return { success: true };
    } catch (error) {
        console.error("Failed to cancel booking:", error);
        return { error: 'Failed to cancel booking' };
    }
}