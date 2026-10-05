'use client';

import { useActionState } from 'react';
import { createService, toggleServiceStatus, deleteService } from '@/app/actions/services';
import { Button } from '@/components/ui/button';

interface ServiceItem {
    id: string;
    title: string;
    description: string | null;
    price: number;
    durationMin: number | null;
    isActive: boolean;
}

export default function ServicesSection({ initialServices }: { initialServices: ServiceItem[] }) {
    const [state, formAction, isPending] = useActionState(createService, null);

    return (
        <div className="space-y-6 border-t border-white/10 pt-10">
            <div>
                <h2 className="text-2xl font-bold mb-1">Manage Services</h2>
                <p className="text-zinc-400 text-sm">Add, hide, or remove studio photo sessions and pricing.</p>
            </div>

            <form action={formAction} className="bg-zinc-900 p-6 rounded-xl border border-white/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input 
                        name="title" 
                        placeholder="Service Title" 
                        required 
                        className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-white/30"
                    />
                    <input 
                        name="price" 
                        type="number" 
                        step="0.01" 
                        placeholder="Price ($)" 
                        required 
                        className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-white/30"
                    />
                    <input 
                        name="durationMin" 
                        type="number" 
                        placeholder="Duration (mins)" 
                        className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-white/30"
                    />
                </div>
                <input 
                    name="description" 
                    placeholder="Short description (optional)" 
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-white/30"
                />

                {state?.error && (
                    <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-400 text-xs rounded-lg text-center">
                        {state.error}
                    </div>
                )}

                <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full sm:w-auto bg-white text-black font-semibold hover:bg-white/90 cursor-pointer px-6"
                >
                    {isPending ? "Adding Service..." : "Add Service"}
                </Button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initialServices.map((service) => (
                    <div key={service.id} className="p-5 rounded-xl bg-zinc-900 border border-white/10 flex justify-between items-center">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-base">{service.title}</h3>
                                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${service.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-400'}`}>
                                    {service.isActive ? 'Active' : 'Hidden'}
                                </span>
                            </div>
                            <p className="text-zinc-400 text-xs">
                                ${service.price} {service.durationMin ? `• ${service.durationMin} mins` : ''}
                            </p>
                            {service.description && (
                                <p className="text-zinc-500 text-xs line-clamp-1">{service.description}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">

                            <form action={async () => {
                                await toggleServiceStatus(service.id, service.isActive);
                            }}>
                                <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10 text-xs cursor-pointer">
                                    {service.isActive ? 'Hide' : 'Show'}
                                </Button>
                            </form>

                            {/* Видалення без конфлікту директив */}
                            <form action={async () => {
                                await deleteService(service.id);
                            }}>
                                <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs cursor-pointer">
                                    Delete
                                </Button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

            {initialServices.length === 0 && (
                <p className="text-center text-zinc-500 py-6 text-sm">No services created yet.</p>
            )}
        </div>
    );
}