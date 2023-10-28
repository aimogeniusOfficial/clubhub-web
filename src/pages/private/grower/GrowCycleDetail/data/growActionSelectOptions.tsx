import React, { ReactElement } from 'react';

import {
  IconBolt,
  IconBrightnessUp,
  IconDroplet,
  IconGrowth,
  IconJumpRope,
  IconRipple,
  IconScissors,
  IconSunWind,
  IconTemperature,
  IconTrowel,
} from '@tabler/icons-react';

import GrowActionType from '../+models/grow-action-type.enum';

export const ACTION_ICON_MAP = {
  [GrowActionType.WATER]: IconDroplet,
  [GrowActionType.TEMPERATURE]: IconTemperature,
  [GrowActionType.LIGHT_INTENSITY]: IconBrightnessUp,
  [GrowActionType.HUMIDITY]: IconRipple,
  [GrowActionType.TRIM]: IconScissors,
  [GrowActionType.HARVEST]: IconTrowel,
  [GrowActionType.TRAINING]: IconJumpRope,
  [GrowActionType.FEED]: IconGrowth,
  [GrowActionType.VPD]: IconSunWind,
  [GrowActionType.OTHER]: IconBolt,
};

export const ACTION_TITLE_MAP = {
  [GrowActionType.WATER]: 'Watered the plants',
  [GrowActionType.TEMPERATURE]: 'Adjusted the temperature',
  [GrowActionType.LIGHT_INTENSITY]: 'Modified light intensity',
  [GrowActionType.HUMIDITY]: 'Changed humidity level',
  [GrowActionType.TRIM]: 'Trimmed the plants',
  [GrowActionType.HARVEST]: 'Harvested crops',
  [GrowActionType.TRAINING]: 'Trained the plants',
  [GrowActionType.FEED]: 'Fed the plants',
  [GrowActionType.VPD]: 'Adjusted vapor pressure deficit',
  [GrowActionType.OTHER]: 'Performed other actions',
};

const growActionSelectOptions: Array<any> = [
  {
    value: GrowActionType.WATER,
    label: 'Water',
    icon: React.createElement(ACTION_ICON_MAP[GrowActionType.WATER], { color: 'blue' }),
  },
  {
    value: GrowActionType.TEMPERATURE,
    label: 'Temperature',
    icon: React.createElement(ACTION_ICON_MAP[GrowActionType.TEMPERATURE], { color: 'red' }),
  },
  {
    value: GrowActionType.LIGHT_INTENSITY,
    label: 'Light Intensity',
    icon: React.createElement(ACTION_ICON_MAP[GrowActionType.LIGHT_INTENSITY], { color: 'yellow' }),
  },
  {
    value: GrowActionType.HUMIDITY,
    label: 'HUMIDITY',
    icon: React.createElement(ACTION_ICON_MAP[GrowActionType.HUMIDITY], { color: 'aqua' }),
  },
  {
    value: GrowActionType.TRIM,
    label: 'Trim',
    icon: React.createElement(ACTION_ICON_MAP[GrowActionType.TRIM]),
  },
  {
    value: GrowActionType.HARVEST,
    label: 'Harvest',
    icon: React.createElement(ACTION_ICON_MAP[GrowActionType.HARVEST]),
  },
  {
    value: GrowActionType.TRAINING,
    label: 'Training',
    icon: React.createElement(ACTION_ICON_MAP[GrowActionType.TRAINING]),
  },
  {
    value: GrowActionType.FEED,
    label: 'Feed',
    icon: React.createElement(ACTION_ICON_MAP[GrowActionType.FEED], { color: 'Bisque' }),
  },
  {
    value: GrowActionType.VPD,
    label: 'VPD',
    icon: React.createElement(ACTION_ICON_MAP[GrowActionType.TEMPERATURE], { color: 'gold' }),
  },
  {
    value: GrowActionType.OTHER,
    label: 'OTHER',
    icon: React.createElement(ACTION_ICON_MAP[GrowActionType.OTHER], { color: 'green' }),
  },
];

export default growActionSelectOptions;
