import { Contact } from "@/types/contacts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactSelectorProps {
  contacts: Contact[];
  selectedContactId: string;
  onSelect: (contactId: string) => void;
}

export const ContactSelector = ({
  contacts,
  selectedContactId,
  onSelect,
}: ContactSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Select Contact
      </label>
      <Select onValueChange={onSelect} value={selectedContactId}>
        <SelectTrigger>
          <SelectValue placeholder="Select a contact" />
        </SelectTrigger>
        <SelectContent>
          {contacts.map((contact) => (
            <SelectItem key={contact.id} value={contact.id}>
              {contact.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};