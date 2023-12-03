import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import InterRegularWoff from '../../../../styles/fonts/Inter-Regular.woff';
import InterExtraBoldWoff from '../../../../styles/fonts/Inter-ExtraBold.woff';

import { Form } from '../../../shared/models';
import { Period } from '../../models';

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Inter',
  },
  info: {
    marginTop: 10,
  },
  infoBox: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  label: {
    width: '25%',
  },
  labelText: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 1.4,
    marginTop: 1,
  },
  contentText: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 1.4,
  },
  confirmationId: {
    fontFamily: 'Inter',
    fontSize: 20,
    marginTop: 4,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontFamily: 'Inter',
    fontSize: 10,
    marginTop: 15,
  },
});

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: InterRegularWoff,
    },
    {
      fontWeight: 'bold',
      src: InterExtraBoldWoff,
    },
  ],
});

interface Props {
  form: Form;
  periods: Period[];
}

const DownloadableConfirmation: React.FC<Props> = ({ form, periods }) => {
  return (
    <Document title="Confirmation">
      <Page>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Confirmation #</Text>
          </View>
          <View>
            <Text style={styles.confirmationId}>{form.confirmationId}</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.infoBox}>
              <View style={styles.label}>
                <Text style={styles.labelText}>Location</Text>
              </View>
              <View>
                <Text style={styles.contentText}>{form.location?.name}</Text>
                <Text style={styles.contentText}>
                  {form.location?.address1}
                </Text>
                <Text style={styles.contentText}>
                  {form.location?.address2}
                </Text>
              </View>
            </View>
            <View style={styles.infoBox}>
              <View style={styles.label}>
                <Text style={styles.labelText}>Appointment time</Text>
              </View>
              <View>
                <Text style={styles.contentText}>
                  {form.date}{' '}
                  {form.slot?.period !== undefined
                    ? periods[form.slot?.period].label
                    : ''}
                </Text>
              </View>
            </View>
            <View style={styles.infoBox}>
              <View style={styles.label}>
                <Text style={styles.labelText}>
                  Patient name{form.minors.length > 0 ? 's' : ''}
                </Text>
              </View>
              <View>
                <Text style={styles.contentText}>
                  {form.firstName} {form.lastName}
                </Text>
                {form.minors.map((minor, i) => (
                  <Text key={i} style={styles.contentText}>
                    {minor.firstName} {minor.lastName}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.disclaimer}>
                Please remember to bring your ID and your confirmation number to
                your appointment.
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DownloadableConfirmation;
