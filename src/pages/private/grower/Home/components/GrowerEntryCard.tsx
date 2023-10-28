import React, { useState } from 'react';

import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Anchor,
  AspectRatio,
  Avatar,
  Button,
  Card,
  Group,
  Image,
  MediaQuery,
  Menu,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconCaretDown, IconDots } from '@tabler/icons-react';
import { useAuth } from 'contexts/AuthContext';
import useLikeJournalEntry from 'hooks/journal_entry/useLikeJournalEntry';
import { ImageGrid } from 'react-fb-image-video-grid';
import { JournalEntryWithAttachments } from 'types/generated';
import { getFormattedDateDifference, getFormattedTime } from 'utils/functions';

import LikeButton from './LikeButton';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];
const VIDEO_EXTENSIONS = ['mp4', 'webm'];
interface GrowerEntryCardProps {
  entry: JournalEntryWithAttachments;
  onClick: (activeUrl: string) => void;
  onEdit: (journalId: JournalEntryWithAttachments) => void;
  onDelete: (journalId: string) => void;
}

export const getIsUrlImage = (url: string): boolean | null => {
  const extension = url.split('.').pop();

  if (!extension) return null;

  return IMAGE_EXTENSIONS.includes(extension);
};

export const renderMedia = (url: string): JSX.Element | null => {
  const extension = url.split('.').pop();

  if (!extension) return null;

  if (IMAGE_EXTENSIONS.includes(extension)) {
    return <Image key={url} src={url} alt='attachment' radius='sm' fit='contain' />;
  }

  if (VIDEO_EXTENSIONS.includes(extension)) {
    return (
      <video key={url} controls style={{ maxHeight: '500px' }}>
        <source src={url} type={`video/${extension}`} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return null;
};

const GrowerEntryCard = ({
  entry,
  onClick,
  onEdit,
  onDelete,
}: GrowerEntryCardProps): JSX.Element => {
  const theme = useMantineTheme();
  const { user } = useAuth();

  const fileUrls = entry.attachments?.map(attachment => attachment.fileUrl);
  const timeAgo = getFormattedDateDifference(entry.createdAt!);
  const timePublished = getFormattedTime(entry.createdAt!);

  const likeJournalEntryMutation = useLikeJournalEntry();

  const isLiked = entry.likes?.some(like => like.userId === user.id);
  const likeCount = entry.likes?.length;

  const handleLike = (): void => {
    likeJournalEntryMutation.mutate({ journalEntryId: entry.id });
  };

  const createdAt = new Date(entry.createdAt!).getTime();
  const now = new Date().getTime();
  const timeDifferenceInMinutes = (now - createdAt) / (1000 * 60);

  return (
    <Card withBorder radius='md' p='xl'>
      <Card.Section>
        <Group position='apart' px='xs'>
          <Group>
            <Avatar radius='xl' size='md' />
            <div>
              <Text fw={600}>{entry?.user?.username}</Text>
              <Group>
                <Text size='xs'>{timeAgo}</Text>
                <Text size='xs'>{timePublished}</Text>
              </Group>
            </div>
          </Group>
          <Group>
            <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
              <Anchor
                href={entry.createdBy === user.id ? `/grow-cycle/${entry.growCycleId}` : undefined}
              >
                {/* {entry.growCycleId ? 'Grow Cycle' : 'Common Journal'} */}
              </Anchor>
            </MediaQuery>
            <MediaQuery largerThan='md' styles={{ display: 'none' }}>
              <Anchor size='xs'>{entry.growCycleId ? 'Grow Cycle' : 'Journal'}</Anchor>
            </MediaQuery>
            {entry.createdBy === user.id && (
              <Menu shadow='md' width={200}>
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size={theme.fontSizes.md} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  {timeDifferenceInMinutes <= 5 && (
                    <Menu.Item color='green' onClick={() => onEdit(entry)}>
                      Edit
                    </Menu.Item>
                  )}
                  <Menu.Item color='red' onClick={() => onDelete(entry.id.toString())}>
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Group>
      </Card.Section>
      <Card.Section my='sm' px='xs'>
        <Text size='lg'>{entry.entryText}</Text>
      </Card.Section>
      <Card.Section>
        {fileUrls && fileUrls.length > 0 && (
          <Carousel slideSize='100%' slideGap={0}>
            {fileUrls.map(url => (
              <Carousel.Slide onClick={() => onClick(url)}>
                <AspectRatio ratio={16 / 9}>{renderMedia(url)}</AspectRatio>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </Card.Section>
      <Card.Section withBorder mt='sm' p='xs' px='xs'>
        <Group position='left'>
          <LikeButton onClick={handleLike} isActive={isLiked} />
          {likeCount > 0 && (
            <Text ml='xs'>{likeCount > 1 ? `Liked by ${likeCount} users` : 'Liked by 1 user'}</Text>
          )}
        </Group>
      </Card.Section>
    </Card>
  );
};

export default GrowerEntryCard;
