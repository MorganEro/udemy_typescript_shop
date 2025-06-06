import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import {
  links,
  productsLinks,
  guardiansLinks,
  agencyLinks,
} from '@/utils/links';
import { Button } from '@/components/ui/button';

function LinksDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40"
        align="start"
        sideOffset={10}>
        {links.map(link => (
          <DropdownMenuItem key={link.href}>
            <Link
              href={link.href}
              className="capitalize w-full">
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {guardiansLinks.map(link => (
          <DropdownMenuItem key={link.href}>
            <Link
              href={link.href}
              className="capitalize w-full">
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {productsLinks.map(link => (
          <DropdownMenuItem key={link.href}>
            <Link
              href={link.href}
              className="capitalize w-full">
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        {agencyLinks.map(link => (
          <DropdownMenuItem key={link.href}>
            <Link
              href={link.href}
              className="capitalize w-full">
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropDown;
