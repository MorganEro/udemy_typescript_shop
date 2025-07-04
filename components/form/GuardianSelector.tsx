'use client';

import { useState } from 'react';
import { Guardian } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

type GuardianSelectorProps = {
  guardians: Guardian[];
  selectedGuardians?: Guardian[];
};

export function GuardianSelector({
  guardians,
  selectedGuardians = [],
}: GuardianSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    selectedGuardians.map(g => g.id)
  );

  const handleCheckChange = (id: string, checked: boolean) => {
    setSelectedIds(prev =>
      checked ? [...prev, id] : prev.filter(item => item !== id)
    );
  };

  return (
    <div className="grid gap-2">
      <Label className="capitalize">Guardians</Label>
      <div className="grid gap-2 max-h-60 overflow-y-auto p-2">
        {guardians.map(item => (
          <div
            key={item.id}
            className="flex items-center space-x-2 p-2 border rounded-md">
            <Checkbox
              name={`guardian-checkbox-${item.id}`}
              id={item.id}
              checked={selectedIds.includes(item.id)}
              onCheckedChange={checked =>
                handleCheckChange(item.id, checked as boolean)
              }
            />
            <div className="flex items-center gap-2">
              <Image
                src={item.image}
                alt={item.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded"
              />
              <Label htmlFor={item.id}>{item.name}</Label>
            </div>
          </div>
        ))}
      </div>
      <input
        type="hidden"
        name="guardianIds"
        value={selectedIds.join(',')}
        data-testid="guardian-ids-hidden"
      />
    </div>
  );
}
