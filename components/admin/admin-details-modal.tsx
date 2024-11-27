import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

type AdminDetailsModalProps = {
    user: User
    isOpen: boolean
    onClose: () => void
}

export function AdminDetailsModal({ user, isOpen, onClose }: AdminDetailsModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Détails de l'administrateur</DialogTitle>
                </DialogHeader>
                <ScrollArea className="mt-4 h-[300px] rounded-md border p-4">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">Nom complet:</h4>
                            <p>{user.firstname} {user.lastname}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Email:</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Solde:</h4>
                            <p>${user.solde}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Créé le:</h4>
                            <p>{new Date(user.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Mis à jour le:</h4>
                            <p>{new Date(user.updatedAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Vérifié:</h4>
                            <p>{user.isVerified ? 'Oui' : 'Non'}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Numéro de téléphone:</h4>
                            <p>{user.phoneNumber}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Créé par:</h4>
                            <p>{user.createdBy || 'N/A'}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Mis à jour par:</h4>
                            <p>{user.updatedBy || 'N/A'}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Super Admin:</h4>
                            <p>{user.isSuperAdmin ? 'Oui' : 'Non'}</p>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

