'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createService(prevState: any , formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const durationMin = parseInt(formData.get('durationMin') as string) || null;

        if (!title || isNaN(price)) {
            return {error: 'Title and valid price are required'};
        }

        await prisma.service.create({
            data: {
                title,
                description,
                price,
                durationMin,
                isActive: true,
            },
        });
        revalidatePath('/en/admin');
        return { success: true };
    } catch (error) {
        console.error('Failed to create service:', error);
        return { error: 'Failed to create service'};
    }
}

export async function toggleServiceStatus(serviceId:string, currentStatus: boolean) {
    try {
        await prisma.service.update({
            where: {id: serviceId},
            data: {isActive: !currentStatus},
        });

        revalidatePath('/en/admin');
        return { success: true };
    } catch (error) {
        console.error("Failed to toggle service status:", error)
        return{error: 'Failed to toggle service stauts'};
    }    
}

export async function deleteService(serviceId: string) {
    try {
        await prisma.service.delete({
            where: {id: serviceId},
        });

        revalidatePath('/en/admin');
        return { success: true};

    } catch (error) {
        console.error('Failed to delete service:', error);
        return {error: 'Failed to delete service(it might have active bookings)'};
    }
}