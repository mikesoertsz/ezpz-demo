import { Contact } from "@/types/contacts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ContactEditorProps {
  contact: Contact;
  onContactUpdate: (updatedContact: Contact) => void;
}

export const ContactEditor = ({ contact, onContactUpdate }: ContactEditorProps) => {
  const handleInputChange = (field: keyof Contact, value: string) => {
    onContactUpdate({
      ...contact,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
      <h3 className="font-medium">Edit Contact Details</h3>
      <div className="space-y-2">
        <Input
          placeholder="Phone Number"
          value={contact.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
        />
        <Input
          placeholder="Email"
          value={contact.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <Input
          placeholder="Address"
          value={contact.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
        />
      </div>
    </div>
  );
};