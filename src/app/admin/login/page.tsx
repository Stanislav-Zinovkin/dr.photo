'use client'

import { useActionState } from "react"
import { adminLogin } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(adminLogin, null);

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
            <form action={formAction} className="w-full max-w-md p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
                    <p className="text-xs text-zinc-400">Sign in to manage Dr. Photo studio</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label className="block text-xs font-medium text-zinc-300 mb-2">Email</Label>
                        <Input 
                            type="email" 
                            name="email" 
                            required 
                            placeholder="admin@drphoto.com"
                            className="bg-zinc-800 border-white/10 text-white"
                        />
                    </div>
                    <div>
                        <Label className="block text-xs font-medium text-zinc-300 mb-2">Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            required 
                            placeholder="••••••••"
                            className="bg-zinc-800 border-white/10 text-white"
                        />
                    </div>
                </div>

                {state?.error && (
                    <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-400 text-xs rounded-lg text-center">
                        {state.error}
                    </div>
                )}

                <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full py-3 bg-white text-black font-semibold hover:bg-white/90 cursor-pointer"
                >
                    {isPending ? "Signing in..." : "Sign In"}
                </Button>
            </form>
        </div>
    );
}