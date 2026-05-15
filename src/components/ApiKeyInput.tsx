import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ApiKeyInputProps {
  apiKey: string;
  onChange: (value: string) => void;
}

export const ApiKeyInput = ({ apiKey, onChange }: ApiKeyInputProps) => {
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    // Use the API key from the environment variable
    const envApiKey = process.env.BLAND_API_KEY;
    if (envApiKey) {
      onChange(envApiKey);
      setShowInput(false);
    }
  }, [onChange]);

  const handleChange = (value: string) => {
    onChange(value);
    if (value) {
      localStorage.setItem("ezpz_api_key", value);
    }
  };

  if (!showInput) return null;

  return (
    <div className="space-y-2">
      <label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
        API Key
      </label>
      <Input
        id="apiKey"
        type="password"
        value={apiKey}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter your EZPZ API key"
        className="font-mono text-sm"
        autoComplete="off"
      />
    </div>
  );
};
