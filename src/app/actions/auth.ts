'use server'

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';


export async function adminLogin(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if(!email || !password) {
        return { error: 'Fill in all fields'};
    }

    try {
        const user = await prisma.user.findUnique({
            where: {email},
        });
        if (!user || user.role !== 'ADMIN' || !user.passwordHash) {
            return { error: "Invalid credentials or access denied"};
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) {
            return { error: "Invalid credentials"};
        }

        const cookieStore = await cookies();
        cookieStore.set('admin_session', user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60*60*24*7,
            path:'/',
        });

    } catch (error) {
        console.error('Login error:', error);
        return { error: 'something went wrong during login' };
    }
    redirect('/en/admin')
}

export async function adminLogout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_sessiom');
    redirect('/en/admin/login');
}