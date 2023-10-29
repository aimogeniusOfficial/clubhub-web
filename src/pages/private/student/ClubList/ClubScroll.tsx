import { ScrollArea } from '@mantine/core';
import useGetClubs from 'hooks/clubs/useGetClubs';
import { ClubRow } from 'types/generated';

import ClubCard from './components/ClubCard';

const ClubScroll = ({ onClick }: { onClick: (club: ClubRow) => void }): JSX.Element => {
  const { data: clubs } = useGetClubs();
  return (
    <>
      <ScrollArea w={300} h='80vh'>
        {clubs?.map(club => {
          return <ClubCard club={club} onClick={onClick} />;
        })}
      </ScrollArea>
    </>
  );
};

export default ClubScroll;
