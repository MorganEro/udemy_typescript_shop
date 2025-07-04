import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function RatingInput({name, labelText}: {name: string; labelText?: string}) {
    const numbers = Array.from({length:5}, (_, index) => {
        const value = index + 1;
        return value.toString();
    }).reverse();
    return (
        <div className='mb-2 max-w-xs flex flex-col gap-2 '>
            <Label htmlFor={name} className="capitalize">{labelText || name}</Label>
            <Select defaultValue={numbers[0]} name={name} required>
                <SelectTrigger>
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    {numbers.map((number) => (
                        <SelectItem key={number} value={number}>
                            {number}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default RatingInput;