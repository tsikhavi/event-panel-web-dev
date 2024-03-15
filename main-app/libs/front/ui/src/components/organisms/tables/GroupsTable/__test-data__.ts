import { GroupDto } from '@eventpanel/shared/dto/groups/group.dto';

const group: Omit<GroupDto, 'id'> = {
  name: 'Group Name',
  description: 'Group Description',
  workspaceId: 'workspaceId',
};

export const getGroups = (amount: number): GroupDto[] =>
  new Array(amount).fill(group).map((group, id) => ({ ...group, id }));
