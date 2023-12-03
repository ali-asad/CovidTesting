import React from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import { useAsync } from 'react-async-hook';

import { isValidZIP } from '../../../../validations';

import Input from '../../../shared/components/form/Input';
import FormLabel from '../../../shared/components/form/FormLabel';
import { AnyObject } from '../../../shared/models';

const Container = styled.div`
  position: relative;
  margin-bottom: 45px;
`;

const Address = styled.div`
  position: absolute;
  bottom: -30px;
  font-size: 14px;
  line-height: 22px;
  opacity: ${({ show }: { show: boolean }) => (show ? 1 : 0)};
  transition: opacity 0.15s ease-in-out;
  margin-top: -10px;
`;

interface Props {
  updateAddressValue: (name: string, value: string) => void;
}

const fetchAddressByZipCode = async (zipCode: string) =>
  (
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zipCode}|country:US&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
    )
  ).json();

const ZipCodeInput: React.FC<Props> = ({ updateAddressValue }) => {
  const {
    values: { address },
    errors,
  } = useFormikContext<{ address: AnyObject }>();
  const { result } = useAsync(fetchAddressByZipCode, [address.zipCode]);

  const hasResult =
    address.zipCode &&
    result?.status === 'OK' &&
    Array.isArray(result?.results) &&
    result?.results.length > 0;

  return (
    <Container>
      <FormLabel label="ZIP Code">
        <Input
          name="address.zipCode"
          onChange={(value) => {
            updateAddressValue('zipCode', value);
          }}
          validate={(value) => {
            let error;

            if (!isValidZIP.test(value) || !hasResult) {
              error = 'Please enter valid US postal code';
            }

            if (!value) {
              error = 'Required field';
            }

            return error;
          }}
        />
      </FormLabel>
      <Address show={hasResult && errors?.address?.zipCode === undefined}>
        {result?.results?.[0]?.formatted_address}
      </Address>
    </Container>
  );
};

export default ZipCodeInput;
