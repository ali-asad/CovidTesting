import { addMinutes, format, isBefore, parse } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';

import { config } from './config';

export function getPeriodsLabelsFromSchedule() {
  const startTime = parse(config.schedule.startTime, 'h:mmaaaaa', new Date());
  const endTime = parse(config.schedule.endTime, 'h:mmaaaaa', new Date());

  let time = startTime;
  const labels = [];

  while (isBefore(time, endTime)) {
    const next = addMinutes(time, config.schedule.periodDuration);
    labels.push(`${format(time, 'h:mm a')} - ${format(next, 'h:mm a')}`);
    time = next;
  }

  return labels;
}

export const convertUTC2PST = (dateStr: string | null) => {
  if (dateStr === null) {
    return null;
  }

  const date = new Date(`${dateStr} UTC`);

  return formatToTimeZone(date, 'MM/DD/YYYY hh:mm a', {
    timeZone: 'America/Los_Angeles',
  });
};

export const convertPST2UTC = (dateStr: string | null) => {
  if (dateStr === null) {
    return null;
  }

  const date = parse(
    `${dateStr} -0800`,
    `${config.dateTimeFormat} XX`,
    new Date()
  );

  return format(date, config.dateTimeFormat);
};

export function normalizeResultName(result?: string | null) {
  if (!result) {
    return '';
  }

  const res = result.toLowerCase();

  if (res === 'detected') {
    return 'POSITIVE';
  }

  return 'NEGATIVE';
}
