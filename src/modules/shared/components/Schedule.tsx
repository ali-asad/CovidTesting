import React from 'react';
import styled from 'styled-components';
import {
  subHours,
  isBefore,
  subDays,
  startOfDay,
  parse,
  format,
  isAfter,
  isEqual,
  differenceInHours,
} from 'date-fns';
import { Formik, Form, FormikErrors, FormikValues } from 'formik';

import { colors } from '../../../styles/colors';
import {
  Container,
  PageHeader,
  PageTitle,
  PageSubTitle,
  Content,
} from './styled';
import pin from '../../../assets/pin.svg';
import { Breakpoints } from '../../../dictionaries';
import { config } from '../../../config';
import { AnyObject, Appointment, Location } from '../models';

import ChangeLocationModal from './ChangeLocationModal';
import Slots from './Slots';
import NavigationButtons from './NavigationButtons';
import Datepicker, { DatepickerField } from './Datepicker';
import FormLabel from './form/FormLabel';
import Checkbox from './form/Checkbox';

const ChangeLocationButton = styled.button`
  display: inline-block;
  border: 0;
  background: none;
  color: ${colors.darkBlue};
  cursor: pointer;
`;

const PinIcon = styled.div`
  position: absolute;
  left: 0;
  top: 4px;
  display: inline-block;
  vertical-align: middle;
  margin: -2px 5px 0 0;
  width: 14px;
  height: 20px;
  background: url(${pin}) no-repeat;
  background-size: cover;
`;

const HeaderLocation = styled.div`
  position: relative;
  padding-left: 24px;
  text-align: left;

  @media (min-width: ${Breakpoints.sm}) {
    flex-direction: row;
  }
`;

const PageContent = styled.div`
  border-top: 1px solid ${colors.blue};
  padding-top: 25px;

  @media (min-width: ${Breakpoints.lg}px) {
    padding-top: 45px;
  }
`;

const AboveColumns = styled.div`
  max-width: 650px;
  margin-bottom: 20px;
`;

const Columns = styled.div`
  display: flex;
  margin: 0 -30px;

  & > * {
    margin: 0 30px;
  }
`;

const DatepickerWrapper = styled.div`
  display: none;

  @media (min-width: ${Breakpoints.md}px) {
    display: block;
    flex: 1 1 auto;
  }
`;

const SlotsWrapper = styled.div`
  width: 100%;

  @media (min-width: ${Breakpoints.md}px) {
    flex: 2 1 auto;
  }
`;

const LocationNameAndAddress = styled.span`
  margin-right: 10px;
`;

interface Props {
  title: string;
  onSchedule: (values: FormikValues) => void;
  onFieldUpdate: (update: AnyObject) => void;
  onLocationChange?: () => void;
  appointment: Appointment;
  confirmBtnText?: string;
  loading?: boolean;
}

function getMinAvailableDate(
  location: Location | null,
  isExpressSameDayTest: boolean,
  departureDateAndTime: Date
): Date {
  if (isExpressSameDayTest && location && location.hasVipSlots) {
    return departureDateAndTime;
  }

  if (
    isBefore(
      subHours(startOfDay(departureDateAndTime), config.maxAdvanceHours),
      new Date()
    )
  ) {
    return new Date();
  }

  return subHours(startOfDay(departureDateAndTime), config.maxAdvanceHours);
}

function getMaxAvailableDate(
  location: Location | null,
  isExpressSameDayTest: boolean,
  departureDateAndTime: Date
): Date {
  if (isExpressSameDayTest && location && location.hasVipSlots) {
    return departureDateAndTime;
  }

  return subDays(startOfDay(departureDateAndTime), 1);
}

const Schedule: React.FC<Props> = ({
  title,
  appointment,
  onSchedule,
  onFieldUpdate,
  onLocationChange,
  confirmBtnText,
  loading,
}) => {
  const {
    location,
    slot,
    departureDateAndTime,
    isExpressSameDayTest,
    date,
  } = appointment;

  const locationStartDate = location
    ? parse(location.startDate, config.dateFormat, new Date())
    : null;

  return (
    <Container size="xl">
      <Content>
        <PageHeader>
          <PageTitle>{title}</PageTitle>
          <PageSubTitle>
            <HeaderLocation>
              <PinIcon />
              <LocationNameAndAddress>
                {location?.name} {location?.address1} {location?.address2}
              </LocationNameAndAddress>
              {onLocationChange && (
                <ChangeLocationButton type="button" onClick={onLocationChange}>
                  Change location
                </ChangeLocationButton>
              )}
            </HeaderLocation>
          </PageSubTitle>
        </PageHeader>
        <PageContent>
          <Formik
            initialValues={{
              slot,
              departureDateAndTime: departureDateAndTime
                ? parse(departureDateAndTime, config.dateTimeFormat, new Date())
                : null,
              isExpressSameDayTest,
            }}
            onSubmit={onSchedule}
            validate={(values) => {
              const errors: FormikErrors<FormikValues> = {};

              if (values.slot === null) {
                errors.slot = 'Please select slot';
              }

              return errors;
            }}
          >
            {({ values }) => (
              <Form>
                <AboveColumns>
                  <FormLabel label="Flight departure date & time (use the final leg of departure)">
                    <DatepickerField
                      name="departureDateAndTime"
                      showTimeSelect
                      minDate={
                        locationStartDate === null ||
                        isBefore(locationStartDate, new Date())
                          ? new Date()
                          : locationStartDate
                      }
                      onChange={(newDepartureDate) => {
                        let newDate = values.isExpressSameDayTest
                          ? startOfDay(newDepartureDate)
                          : subHours(
                              startOfDay(newDepartureDate),
                              config.maxAdvanceHours
                            );

                        if (isBefore(newDate, new Date())) {
                          newDate = startOfDay(new Date());
                        }

                        onFieldUpdate({
                          departureDateAndTime: format(
                            newDepartureDate,
                            config.dateTimeFormat
                          ),
                          date: format(newDate, config.dateFormat),
                        });
                      }}
                    />
                  </FormLabel>
                  {location?.hasVipSlots && (
                    <Checkbox
                      name="isExpressSameDayTest"
                      disabled={values.departureDateAndTime === null}
                      onChange={(checked) => {
                        if (!values.departureDateAndTime) {
                          return;
                        }

                        const newDate = checked
                          ? values.departureDateAndTime
                          : subHours(
                              startOfDay(values.departureDateAndTime),
                              config.maxAdvanceHours
                            );

                        onFieldUpdate({
                          isExpressSameDayTest: checked,
                          date: format(newDate, config.dateFormat),
                        });
                      }}
                    >
                      Click here to schedule express same-day as flight test for
                      an additional $60 (some restrictions apply).
                    </Checkbox>
                  )}
                </AboveColumns>
                {values.departureDateAndTime && (
                  <Columns>
                    <DatepickerWrapper>
                      <Datepicker
                        value={
                          date
                            ? parse(date, config.dateFormat, new Date())
                            : new Date()
                        }
                        onChange={(newDate) =>
                          onFieldUpdate({
                            date: format(newDate, config.dateFormat),
                          })
                        }
                        minDate={getMinAvailableDate(
                          location,
                          values.isExpressSameDayTest,
                          values.departureDateAndTime
                        )}
                        maxDate={getMaxAvailableDate(
                          location,
                          values.isExpressSameDayTest,
                          values.departureDateAndTime
                        )}
                        inline
                      />
                    </DatepickerWrapper>
                    <SlotsWrapper>
                      <Slots
                        appointment={appointment}
                        onFieldUpdate={onFieldUpdate}
                      />
                      <NavigationButtons
                        loading={loading}
                        confirmBtnText={confirmBtnText}
                      />
                    </SlotsWrapper>
                  </Columns>
                )}
              </Form>
            )}
          </Formik>
        </PageContent>
      </Content>
      <ChangeLocationModal />
    </Container>
  );
};

export default Schedule;
