import { cookies } from 'next/headers';
import EmptyList from '@/components/global/EmptyList';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IconButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import ToastMessage from '@/components/global/ToastMessage';
import { deleteGuardianAction } from '@/actions/guardian/guardian-server-actions';
import { fetchAdminGuardians } from '@/actions/guardian/guardian-server-actions';
import { Guardian } from '@/types';
import { PlusIcon } from 'lucide-react';

async function AdminGuardiansPage() {
  const cookieStore = await cookies();
  const success = cookieStore.get('success')?.value;
  const items: Guardian[] = await fetchAdminGuardians();

  if (items.length === 0) return <EmptyList />;

  function DeleteGuardian({ guardianId }: { guardianId: string }) {
    const deleteGuardian = deleteGuardianAction.bind(null, { guardianId });
    return (
      <FormContainer action={deleteGuardian}>
        <IconButton actionType="delete" />
      </FormContainer>
    );
  }

  return (
    <section>
      {success && <ToastMessage message={success} />}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Guardians</h3>
        <Link
          href="/admin/guardians/create"
          className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90">
          <PlusIcon className="w-3 h-3" />
        </Link>
      </div>

      {/* Table for larger screens */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Short Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <Link
                    href={`/guardians/${item.id}`}
                    className="underline font-semibold capitalize">
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell className="md:max-w-[240px] lg:max-w-[400px] truncate">
                  <div className="truncate">{item.shortDescription}</div>
                </TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/guardians/${item.id}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeleteGuardian guardianId={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>total guardians: {items.length}</TableCaption>
        </Table>
      </div>

      {/* Card layout for mobile screens */}
      <div className="block sm:hidden space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="rounded-lg border p-4 shadow-sm bg-background flex flex-col gap-2">
            <h4 className="text-lg font-semibold capitalize">{item.name}</h4>
            <p className="text-muted-foreground text-sm">
              {item.shortDescription}
            </p>
            <div className="flex gap-2 mt-2 justify-end">
              <Link href={`/admin/guardians/${item.id}/edit`}>
                <IconButton actionType="edit" />
              </Link>
              <DeleteGuardian guardianId={item.id} />
            </div>
          </div>
        ))}
        <p className="text-center text-muted-foreground mt-4 text-sm">
          total guardians: {items.length}
        </p>
      </div>
    </section>
  );
}

export default AdminGuardiansPage;
