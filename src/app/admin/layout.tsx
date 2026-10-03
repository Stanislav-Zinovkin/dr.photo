import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { adminLogout } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('admin_session')?.value;

    if (!sessionId) {
        redirect('/admin/login');
    }
    const adminUser = await prisma.user.findUnique({
        where: { id: sessionId },
    });

    if (!adminUser || adminUser.role !== 'ADMIN') {
        redirect('/admin/login');
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
            <header className="border-b border-white/10 bg-zinc-900/50 backdrop-blur-md px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="font-bold tracking-wider text-lg">
                        Dr. Photo <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded">ADMIN</span>
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                    <span className="text-xs text-zinc-400 hidden sm:inline">{adminUser.email}</span>
                    <form action={adminLogout}>
                        <Button 
                            variant="outline" 
                            size="sm"
                            className="border-white/10 bg-zinc-800 text-white hover:bg-zinc-700 cursor-pointer text-xs"
                        >
                            Logout
                        </Button>
                    </form>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}