import * as functions from 'firebase-functions';
import * as sendgrid from '@sendgrid/mail';

import { Appointment } from '../types';
import { getPeriodsLabelsFromSchedule } from '../utils';
import { config } from '../config';

sendgrid.setApiKey(functions.config().sendgrid.key);

const periods = getPeriodsLabelsFromSchedule();

const sendConfirmationEmail = async (
  confirmationId: string,
  appointment: Appointment,
  isReschedule: boolean
) => {
  const email = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<title>WORKSITELABS</title>
<style media="all" type="text/css">
        html, body, div{
            margin: 0;
            padding: 0;
        }
        html,body{
            font-family: Arial, Open Sans, sans-serif !important;
            font-weight: normal;
            font-style: normal;
            font-size: 16px;
            line-height: 22px;
            color: #515151;
            text-decoration: none;
            position: relative;
        }
        body{
            -webkit-font-smoothing: antialiased;
            -webkit-overflow-scrolling: touch;
            overflow-scrolling: touch;
        }
  h1,h2,h3,h4,h5,h6{
   font-weight: bold;
   margin: 20px 0;
  }
        a{
            text-decoration: none;
            transition: All .2s ease-in-out;
        }
        strong,b{
   font-weight: bold;
        }
        i{
            font-style: italic;
        }
        p{
   margin-top: 0;
   margin-left: 0;
   margin-right: 0;
            margin-bottom: 13px;
        }
        ul,ol {
            margin: 10px 0;
        }
        li{
            margin-bottom: 10px;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
            padding: 0;
            margin: 0;
            vertical-align: top;
            text-align: left;
        }
        td {
            border: none;
            padding: 0;
            margin: 0;
            vertical-align: top;
        }
        img{
            height: auto;
            vertical-align:bottom;
        }
        #templateContainer{
            position: relative;
        }
  .two-column ul li{
   margin: 0 !important;
  }
  @media (max-width: 600px) {
   #bodyTable,#templateContainer{
    width: 360px !important;
   }
   #templateHeader,#templateBody,#templateFooter{
    padding-left: 20px !important;
    padding-right: 20px !important;

   }
   .mb-table{
    width: 360px!important;
   }
   .text-top{
    padding-left: 16px !important;
    padding-right: 16px !important;
   }
   .text-content{
    padding-left: 16px !important;
    padding-right: 16px !important;
   }
   .logo-top{
    height: 42px !important;
   }
   .logo{
    width: 210px !important;
   }
   .logo-bottom{
    height: 40px !important;
   }
   .text-intro h3{
    margin-bottom: 25px !important;
   }
   .text-intro-bottom{
    height: 15px !important;
   }
   .button-none{
    display: none !important;
   }
   .button{
    display: block !important;
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
   }
   .footer-top-height{
    height: 8px !important;
   }
   .footer-bottom-height{
    height: 40px !important;
   }
  }
  @media (max-width: 400px) {
   html,body{
    font-size: 15px;
    line-height: 20px;
   }
   #bodyTable,#templateContainer{
    width: 100% !important;
   }
   .mb-table{
    width: 100% !important;
   }
   .logo{
    width: 195px !important;
   }
   .mb-block{
    display: block !important;
    width: 100% !important;
   }
  }
    </style>
</head>
<body>
    <center>
        <table id="bodyTable" width="600" style="margin: 0 auto;">
   <tr>
    <td id="bodyCell">
     <table id="templateContainer" width="600" style="margin: 0 auto;background: #fff">
      <tr>
       <td id="templateHeader" style="padding: 0;padding-left: 50px;padding-right: 50px;">
        <table class="mb-table" width="500">
         <tr>
          <td style="height: 62px" class="logo-top"></td>
         </tr>
         <tr>
          <td><img src="https://firebasestorage.googleapis.com/v0/b/worksite-labs-ccb7d.appspot.com/o/logo.png?alt=media&token=32b9973a-792d-44f7-a408-e83e141a6bd8" alt="" width="224" class="logo"></td>
         </tr>
         <tr>
          <td style="height: 57px" class="logo-bottom"></td>
         </tr>
        </table>
       </td>
      </tr>
      <tr>
       <td id="templateBody" style="padding: 0;padding-left: 50px;padding-right: 50px;">
        <table class="mb-table" width="500">
         <tr>
          <td style="" class="text-intro">
           <h3 style="font-size: 22px;line-height: 26px;color: #2A5F87;margin: 0;margin-bottom: 35px;">Your appointment has been ${
             isReschedule ? 're' : ''
           }scheduled</h3>
           <p style="font-weight: bold;margin-bottom: 5px;">Hello ${
             appointment.firstName
           }!</p>
           <p>
            Your appointment for COVID-19 testing has been confirmed.
           </p>
          </td>
         </tr>
         <tr>
          <td style="height: 25px" class="text-intro-bottom"></td>
         </tr>
        </table>
        <table class="mb-table" width="500">
         <tr>
          <td style="border: 3px solid #2A5F87;display: block;">
           <table width="100%">
            <tr>
             <td style="font-weight: bold;color: #ffffff;background: #2A5F87;padding: 0;padding-left: 26px;padding-right: 26px;padding-top: 5px;padding-bottom: 5px;" class="text-top">
              Appointment Details
             </td>
            </tr>
            <tr>
             <td style="height: 29px;"></td>
            </tr>
            <tr>
             <td style="padding: 0;padding-left: 26px;padding-right: 26px;" class="text-content">
              <b style="font-size: 12px;line-height: 22px;color: #1A96DB;">CONFIRMATION #</b>
              <p style="color: #262626"><b>${confirmationId}</b></p>
              <b style="font-size: 12px;line-height: 22px;color: #1A96DB;">LOCATION</b>
              <p>
               <b>${appointment.location?.name}</b><br>
               ${appointment.location?.address1} ${
    appointment.location?.address2
  }
              </p>
              <b style="font-size: 12px;line-height: 22px;color: #1A96DB;">
               DATE
              </b>
              <p style="margin-bottom: 11px;">
                ${appointment.date}
              </p>
              <b style="font-size: 12px;line-height: 22px;color: #1A96DB;">
               TIME
              </b>
              <p style="margin-bottom: 20px;">
              ${appointment.slot && periods[appointment.slot.period]}
              </p>
              <b style="font-size: 12px;line-height: 22px;color: #1A96DB;">INFORMATION</b>
              <table>
               <tr>
                <td style="height: 8px;"></td>
               </tr>
               <tr>
                <td width="170" style="font-weight: bold;" class="mb-block">Name</td>
                <td width="" class="mb-block">${appointment.firstName} ${
    appointment.lastName
  }</td>
               </tr>
               <tr>
                <td style="height: 12px;"></td>
               </tr>
               <tr>
                <td style="font-weight: bold;" class="mb-block">Date of Birth</td>
                <td class="mb-block">${appointment.birthDate}</td>
               </tr>
               <tr>
                <td style="height: 13px;"></td>
               </tr>
               <tr>
                <td style="font-weight: bold;" class="mb-block">Phone Number</td>
                <td class="mb-block"><a href="tel:${
                  appointment.phone
                }" style="text-decoration: none;color: #515151;">${
    appointment.phone
  }</a></td>
               </tr>               
               <tr>
                <td style="height: 13px;"></td>
               </tr>
               <tr>
                <td style="font-weight: bold;" class="mb-block">Home Address</td>
                <td class="mb-block"><a href="https://goo.gl/maps/kExBL6tcxrqMTZrH6" target="_blank" style="text-decoration: none;color: #515151;">${
                  appointment.address.address
                } <br> ${appointment.address.city}, ${
    appointment.address.state
  } ${appointment.address.zipCode}</a></td>
               </tr>
              </table>
              ${
                appointment.minors?.length > 0
                  ? `<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">MINORS</b>
                    <table>
                    ${appointment.minors
                      ?.map(({ firstName, lastName, birthDate }) => {
                        return `
                        <tr>
                          <td width="170" style="font-weight: bold;" class="mb-block">Name</td>
                          <td width="" class="mb-block">${firstName} ${lastName}</td>
                        </tr>
                        <tr>
                          <td style="height: 12px;"></td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold;" class="mb-block">Date of Birth</td>
                          <td class="mb-block">${birthDate}</td>
                        </tr>
                        <tr>
                          <td style="height: 12px;"></td>
                        </tr>                        
                        `;
                      })
                      .join('')}

                    </table>`
                  : ``
              }
             </td>
            </tr>
            <tr>
             <td style="height: 36px;"></td>
            </tr>
           </table>
          </td>
         </tr>
        </table>
        <table class="mb-table" width="500">
         <tr>
          <td style="height: 25px"></td>
         </tr>
         <tr>
          <td>
           <p>Please bring this information and a photo ID to your appointment.</p>
          </td>
         </tr>
         <tr>
          <td style="height: 13px"></td>
         </tr>
        </table>
        <table class="mb-table" width="500">
         <tr>
          <td style="height: 25px"></td>
         </tr>
         <tr>
          <td width="245" align="center" style="border: 1px solid #2A5F87;box-sizing: border-box;border-radius: 5px;display: inline-block;padding: 0;padding-top: 9px;padding-bottom: 7px;padding-left: 10px;padding-right: 10px;" class="button">
           <a href="https://schedulecovidtesting.com/manage" target="_blank" style="font-weight: bold;color: #2A5F87;">Cancel Appointment</a>
          </td>
          <td width="10" class="button-none"></td>
          <td width="245" align="center" style="background: #27AE60;border: 1px solid #27AE60;box-sizing: border-box;border-radius: 5px;display: inline-block;padding: 0;padding-top: 9px;padding-bottom: 7px;padding-left: 10px;padding-right: 10px;" class="button">
           <a href="https://schedulecovidtesting.com/manage" target="_blank" style="font-weight: bold;color: #ffffff;">I'd like to reschedule</a>
          </td>
         </tr>
         <tr>
          <td style="height: 24px"></td>
         </tr>
        </table>
       </td>
      </tr>
      <tr>
       <td id="templateFooter" style="padding: 0;padding-left: 50px;padding-right: 50px;">
        <table class="mb-table footer" width="500">
         <tr>
          <td style="height: 34px;" class="footer-top-height"></td>
         </tr>
         <tr>
          <td align="center">
           <p style="font-size: 12px;line-height: 18px;">Long Beach, CA <br> <a
             href="mailto:support@worksitelabs.com" style="text-decoration: none;color: #515151;">support@worksitelabs.com</a></p>
          </td>
         </tr>
         <tr>
          <td style="height: 50px;" class="footer-bottom-height"></td>
         </tr>
        </table>
       </td>
      </tr>
     </table>
    </td>
   </tr>
        </table>
    </center>
</body>
</html>
`;

  await sendgrid.send({
    to: appointment.email,
    from: {
      email: config.fromEmail,
      name: 'Worksite Labs',
    },
    subject: `Your appointment has been ${isReschedule ? 're' : ''}scheduled`,
    html: email,
  });
};

const sendResultsNotificationEmail = async (to: string) => {
  await sendgrid.send({
    to,
    from: {
      email: config.fromEmail,
      name: 'Worksite Labs',
    },
    subject: `Your test result is ready`,
    html:
      'To view it, go to <a href="https://schedulecovidtesting.com/manage" target="_blank">https://schedulecovidtesting.com/manage</a><br /><br />Worksite Labs.',
  });
};

export default {
  sendConfirmationEmail,
  sendResultsNotificationEmail,
};
