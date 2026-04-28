import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAccountUsers, updateAccountUser } from "@/api/accounts";
import { useAuth } from "@/app/providers/use-auth";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { UserRoleSummary } from "@/modules/users/features/user-list/user-role-summary";
import { UsersTable } from "@/modules/users/features/user-list/users-table";
import type { RoleKey } from "@/types";

export function UsersScreen() {
  const { session, hasPermission } = useAuth();
  const queryClient = useQueryClient();
  const accountId = session?.activeAccount.id ?? "";
  const canManageUsers = hasPermission("settings.users.manage");
  const canManagePermissions = hasPermission("settings.permissions.manage");

  const { data, isLoading } = useQuery({
    queryKey: ["accounts", accountId, "users"],
    queryFn: () => fetchAccountUsers(accountId),
    enabled: Boolean(accountId) && canManageUsers,
  });

  const mutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: RoleKey }) => updateAccountUser(accountId, userId, { role }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["accounts", accountId, "users"] });
      await queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });

  const roleSummaries = useMemo(() => {
    if (!data) return { account_owner: 0, admin: 0, user: 0 };
    return data.reduce(
      (counts, member) => ({ ...counts, [member.role]: counts[member.role] + 1 }),
      { account_owner: 0, admin: 0, user: 0 },
    );
  }, [data]);

  if (isLoading || !data) {
    return <LoadingState label="Loading users..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description={`Manage account members and role access for ${session?.activeAccount.name}.`}
        actions={
          canManagePermissions ? (
            <Link to="/users/roles-permissions">
              <Button variant="outline">Roles & permissions</Button>
            </Link>
          ) : null
        }
      />

      <UserRoleSummary
        accountOwners={roleSummaries.account_owner}
        admins={roleSummaries.admin}
        users={roleSummaries.user}
      />
      <UsersTable accountMembers={data} canManageUsers={canManageUsers} mutation={mutation} />
    </div>
  );
}
