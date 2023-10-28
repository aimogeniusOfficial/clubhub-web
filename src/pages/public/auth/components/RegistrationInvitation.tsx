import { useState } from 'react';

import { Button, Group, Stack, TextInput } from '@mantine/core';

interface RegistrationInvitationProps {
  isTokenValid: boolean;
  verifyInvitation: (token: string) => void;
}

const RegistrationInvitation = ({
  isTokenValid,
  verifyInvitation,
}: RegistrationInvitationProps) => {
  const [invitationToken, setInvitationToken] = useState<string>('');

  return (
    <>
      <Stack>
        <TextInput
          size='md'
          label='Invitation Code'
          placeholder='Unique invitation code'
          value={invitationToken}
          onChange={e => setInvitationToken(e.target.value)}
          required
          error={isTokenValid ? null : 'Invitation code is not valid'}
        />
      </Stack>

      <Group position='apart' mt='xl'>
        <Button
          type='button'
          fullWidth
          mt='xl'
          size='md'
          onClick={() => verifyInvitation(invitationToken)}
        >
          Confirm Invitation Code
        </Button>
      </Group>
    </>
  );
};

export default RegistrationInvitation;
