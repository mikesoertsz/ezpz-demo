"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { initiateBlandCall } from "@/services/ezpzApi";
import { ContactSelector } from "@/components/ContactSelector";
import { ContactEditor } from "@/components/ContactEditor";
import { useToast } from "@/hooks/use-toast";
import { Contact, defaultContacts } from "@/types/contacts";
import { motion } from "framer-motion";
import Image from "next/image";

export const EzpzForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
  const [selectedContactId, setSelectedContactId] = useState<string>("");
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const { toast } = useToast();

  const selectedContact = contacts.find((c) => c.id === selectedContactId);

  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      setEditingContact({ ...contact });
    }
  };

  const handleContactUpdate = () => {
    if (editingContact) {
      setContacts(
        contacts.map((c) => (c.id === editingContact.id ? editingContact : c))
      );
      toast({
        title: "Contact Updated",
        description: `${editingContact.name}'s information has been updated.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) {
      toast({
        title: "Error",
        description: "Please select a contact first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await initiateBlandCall({
        phoneNumber: selectedContact.phoneNumber,
        task: "Make a test call",
        orgId: "13bd3e2f-0df8-417f-80ab-07e6a75ecbd3",
        request_data: {
          name: selectedContact.name,
        },
      });

      console.log(result);

      toast({
        title: "Call Initiated",
        description: `Calling ${selectedContact.name} at ${selectedContact.phoneNumber}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to initiate call",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto p-8 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-6"
      >
        <Image
          src="/lovable-uploads/f6325d49-0ba1-4b71-adfd-268d5289af2f.png"
          alt="EZPZ Logo"
          className="h-16 w-auto"
          width={100}
          height={100}
        />
      </motion.div>

      <motion.h2
        className="text-2xl font-semibold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Initiate EZPZ Call
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <ContactSelector
          contacts={contacts}
          selectedContactId={selectedContactId}
          onSelect={handleContactSelect}
        />

        {editingContact && (
          <>
            <ContactEditor
              contact={editingContact}
              onContactUpdate={setEditingContact}
            />
            <Button
              type="button"
              onClick={handleContactUpdate}
              variant="outline"
              className="w-full"
            >
              Update Contact
            </Button>
          </>
        )}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full"
        >
          <Button
            type="submit"
            disabled={isLoading || !selectedContactId}
            className="w-full h-12 bg-black hover:bg-gray-800 text-white transition-all duration-300 ease-in-out"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              `Call ${selectedContact ? selectedContact.name : "Contact"}`
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};
