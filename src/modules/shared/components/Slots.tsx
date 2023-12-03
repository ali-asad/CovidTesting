import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  format,
  startOfDay,
  isEqual,
  isBefore,
  isAfter,
  set,
  subHours,
  subMinutes,
  subDays,
  parse,
} from 'date-fns';
import { Field, FieldProps } from 'formik';

import { colors } from '../../../styles/colors';
import { ErrorText } from './styled';
import { Period } from '../../schedule/models';
import { AnyObject, Appointment } from '../models';
import { Breakpoints } from '../../../dictionaries';
import { config } from '../../../config';
import { subscribeOnAppointmentsUpdate, reserveSlot } from '../../schedule/api';
import { pluralize, getPeriodsFromSchedule } from '../../../utils';

import Datepicker from './Datepicker';

const periods = getPeriodsFromSchedule(config.schedule);

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 23px;

  @media (min-width: ${Breakpoints.sm}px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const SlotsContainer = styled.div`
  background: ${colors.blue8};
  padding: 30px;
  position: relative;

  @media (min-width: ${Breakpoints.lg}px) {
    padding: 40px 60px;
  }
`;

const Slot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -5px 0 30px;

  & > * {
    margin: 5px 0;
  }

  @media (min-width: ${Breakpoints.lg}px) {
    flex-direction: row;
    margin: 0 -17px 20px;

    & > * {
      margin: 0 17px;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ChooseSlotBtn = styled.button`
  background: ${({ selected }: { selected: boolean }) =>
    selected ? colors.blue : colors.white};
  color: ${({ selected }: { selected: boolean }) =>
    selected ? colors.white : colors.blue};
  border: 1px solid ${colors.blue};
  text-transform: uppercase;
  font-size: 20px;
  transition: all 0.15s ease-in-out;
  padding: 10px 30px;
  border-radius: 10px;
  white-space: nowrap;
  cursor: ${({ selected }: { selected: boolean }) =>
    selected ? 'default' : 'pointer'};

  @media (min-width: ${Breakpoints.sm}px) {
    padding: 10px 50px;
  }

  @media (min-width: ${Breakpoints.md}px) {
    padding: 10px 80px;
    width: 350px;
  }

  &:disabled {
    color: ${({ selected }: { selected: boolean }) =>
      selected ? colors.white : colors.grey};
    border: 1px solid
      ${({ selected }: { selected: boolean }) =>
        selected ? colors.blue : colors.grey};
    cursor: default;
  }
`;

const Error = styled.div`
  position: absolute;
  bottom: -120px;
  left: 50%;
  transform: translateX(-50%);
`;

const DatePickerContainer = styled.div`
  display: block;
  line-height: 1.5;

  @media (min-width: ${Breakpoints.md}px) {
    display: ${({ alwaysShowDatePicker }: { alwaysShowDatePicker?: boolean }) =>
      alwaysShowDatePicker ? 'block' : 'none'};
  }
`;

const ChangeDateBtn = styled.div`
  display: inline-block;
  border: 0;
  background: none;
  color: ${colors.blue};
  cursor: pointer;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 2px;
`;

const SelectedDate = styled.h3`
  font-size: 22px;
  line-height: 1.5;
  margin-right: 10px;
`;

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const Shimmer = styled.div`
  height: 13px;
  width: 120px;
  border-radius: 2px;
  animation: ${shimmer} 2s infinite linear;
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-size: 400px 100%;
`;

interface Props {
  alwaysShowDatePicker?: boolean;
  appointment: Appointment;
  onFieldUpdate: (update: AnyObject) => void;
}

const Slots: React.FC<Props> = ({
  alwaysShowDatePicker,
  appointment,
  onFieldUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<Period[]>(periods);
  const {
    date,
    slot,
    minors,
    departureDateAndTime,
    isExpressSameDayTest,
    location,
  } = appointment;
  const numberOfGuests = minors.length + 1;

  const locationId = location?.qbenchCustomerId;

  useEffect(() => {
    setLoading(true);

    let unsubscribe: any;

    async function getSlots() {
      try {
        if (date && locationId) {
          const parsed = parse(date, config.dateFormat, new Date());

          unsubscribe = subscribeOnAppointmentsUpdate(
            { date, locationId },
            (result: any) =>
              setSlots(
                periods.reduce((acc: Period[], period, i) => {
                  const a = acc;

                  const startTime = set(period.startTime, {
                    year: parsed.getFullYear(),
                    date: parsed.getDate(),
                    month: parsed.getMonth(),
                  });

                  if (!departureDateAndTime) {
                    return a;
                  }

                  const parsedDeparture = parse(
                    departureDateAndTime,
                    config.dateTimeFormat,
                    new Date()
                  );

                  if (location?.hasVipSlots) {
                    const slotIsOutOfAllowedPeriod =
                      isBefore(
                        startTime,
                        isBefore(
                          subHours(
                            startOfDay(parsedDeparture),
                            config.maxAdvanceHours
                          ),
                          new Date()
                        )
                          ? new Date()
                          : subHours(
                              startOfDay(parsedDeparture),
                              config.maxAdvanceHours
                            )
                      ) ||
                      isAfter(
                        startTime,
                        subMinutes(startOfDay(parsedDeparture), 30)
                      );

                    if (
                      !isExpressSameDayTest &&
                      (i <= config.lastExpressSlotIndex ||
                        slotIsOutOfAllowedPeriod)
                    ) {
                      return a;
                    }

                    if (
                      isExpressSameDayTest &&
                      (i > config.lastExpressSlotIndex ||
                        isAfter(startTime, parsedDeparture))
                    ) {
                      return a;
                    }
                  }

                  a.push({
                    ...period,
                    startTime,
                    index: i,
                    available:
                      config.maxSlotsByPeriod -
                      ((result && result.data.appointmentsPerPeriod?.[i]) || 0),
                  });

                  return a;
                }, [])
              )
          );

          await new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 800);
          });
        }

        setLoading(false);
      } catch (e) {
        console.error(e);

        setLoading(false);
      }
    }

    getSlots();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [date, departureDateAndTime, isExpressSameDayTest, locationId]);

  const currentDate = date
    ? parse(date, config.dateFormat, new Date())
    : new Date();

  return (
    <Field name="slot">
      {({
        form: { setFieldValue, setFieldError, values },
        field: { value },
        meta: { error },
      }: FieldProps) => {
        return (
          <Container>
            <Header>
              <SelectedDate>
                {format(currentDate, config.weekDateFormat)}
              </SelectedDate>
              <DatePickerContainer alwaysShowDatePicker={alwaysShowDatePicker}>
                <Datepicker
                  value={currentDate}
                  maxDate={
                    values.isExpressSameDayTest
                      ? values.departureDateAndTime
                      : subDays(startOfDay(values.departureDateAndTime), 1)
                  }
                  minDate={
                    values.isExpressSameDayTest
                      ? values.departureDateAndTime
                      : isBefore(
                          subHours(
                            startOfDay(values.departureDateAndTime),
                            config.maxAdvanceHours
                          ),
                          new Date()
                        )
                      ? new Date()
                      : subHours(
                          startOfDay(values.departureDateAndTime),
                          config.maxAdvanceHours
                        )
                  }
                  onChange={(newDate) =>
                    onFieldUpdate({
                      date: format(startOfDay(newDate), config.dateFormat),
                    })
                  }
                  customInput={<ChangeDateBtn>Change date</ChangeDateBtn>}
                />
              </DatePickerContainer>
            </Header>
            <SlotsContainer>
              {slots.length > 0 ? (
                slots.map(({ label, startTime, available, index }, i) => {
                  const preSelectedSlotDate = slot?.date
                    ? parse(slot.date, config.dateFormat, new Date())
                    : null;

                  const isSelected =
                    !!preSelectedSlotDate &&
                    isEqual(currentDate, preSelectedSlotDate) &&
                    locationId === slot?.locationId &&
                    index === value?.period;

                  return (
                    <Slot key={i}>
                      <ChooseSlotBtn
                        selected={isSelected}
                        type="button"
                        onClick={() => {
                          if (isSelected || !location) {
                            return;
                          }

                          const desiredSlot = {
                            date: format(currentDate, config.dateFormat),
                            period: index,
                            locationId: location?.qbenchCustomerId,
                          };

                          onFieldUpdate({ slot: desiredSlot });
                          setFieldValue('slot', desiredSlot);

                          reserveSlot(
                            desiredSlot,
                            slot,
                            numberOfGuests
                          ).catch((e) => setFieldError('slot', e.message));
                        }}
                        disabled={
                          available === 0 ||
                          available < numberOfGuests ||
                          loading
                        }
                      >
                        {label}
                      </ChooseSlotBtn>
                      {loading ? (
                        <Shimmer />
                      ) : (
                        <span>{pluralize(available, 'slot')} available</span>
                      )}
                    </Slot>
                  );
                })
              ) : (
                <>No available slots</>
              )}
            </SlotsContainer>
            <Error>
              <ErrorText hasError={error !== undefined}>{error}</ErrorText>
            </Error>
          </Container>
        );
      }}
    </Field>
  );
};

export default Slots;
