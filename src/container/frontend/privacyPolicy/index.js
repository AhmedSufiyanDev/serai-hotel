import { Container, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import '../scss/general.scss'
import { CustomSeparator } from "../../../components/index";
import { useStyles } from './styles';

function PrivacyPolicy(props) {
    const { policyName } = props.match.params;
    console.log("check", policyName);
    const classes = useStyles();
    const [breadCrumbsList, setBreadCrumbsList] = useState([
        // { text: 'Home', url: '/' },
        // { text: policyName.replace(/-/g, ' '), url: '' },
    ]);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [props.location.pathname]);

    useEffect(() => {
        setBreadCrumbsList([
            { text: 'Home', url: '/' },
            { text: policyName.replace(/-/g, ' ').toUpperCase(), url: '' },
        ]);
    }, [policyName]);

    return (
        <div className="privacy-align-class">
            <div className="privacy-detail-list">
                <div className="header-privacy-fix">
                    <Container fixed>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12} >
                                <CustomSeparator
                                    breadCrumbsList={breadCrumbsList}
                                    {...props}
                                    setBreadCrumbsList={setBreadCrumbsList}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <section>
                <h2 className='privacy-font'>{policyName.replace(/-/g, ' ').toUpperCase()}</h2>
            </section>

            <section>
                <Container fixed>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {policyName === 'privacy-policy' &&
                                <div>
                                    <div>
                                        <div className='pp1'>
                                            Disclaimer
                                        </div>
                                        <div className='privacy-text'>
                                            Serai Boutique Hotels (hereinafter referred to as "SBH") offers no claim or representation and accepts no responsibility regarding the quality, nature, or reliability of sites that may be accessible by hyperlinks from this website, or sites linking to this website.
                                        </div>
                                        <div className='pp1'>
                                            Privacy Statement
                                        </div>
                                        <div className='privacy-text'>
                                            SBH is committed to providing high-quality service to our guests, including honoring your privacy concerns. We understand that visitors to this website may have questions about how we collect and use information. This notice describes SBH's privacy policy as it pertains to the SBH website, accessible at serai.com.pk ("the Website"). By visiting the Website, you acknowledge and accept this privacy policy. We may, from time to time, revise this privacy policy by posting the revised privacy policy on our site. The changes will only affect the information we collect after the date of the change to our Privacy Policy. By continuing to use the Website after such changes, you signify your acceptance of the changes.
                                        </div>
                                        <div className='pp1'>
                                            Information Collected
                                        </div>
                                        <div className='privacy-text'>
                                            SBH may collect personally identifiable information, such as your name, address, email address, or phone number, in various areas of our Website. Many pages on our Website can be visited without providing any such information. On others, you may be prompted to provide personally identifiable information, such as to make a reservation or to receive brochures or other materials. Certain features of the Websites, such as reservations, may require credit card and billing information as well.
                                            <p>SBH reserves the right to combine personally identifiable information we collect with publicly available information or information obtained from third parties or affiliates. In addition, SBH may use electronic tools to collect non-personal information about visitors to our Websites, including browser type, page requests, and IP address.</p>
                                            <p>SBH reserves the right, without any obligation, to monitor, to the extent reasonable, your use of the Websites. SBH reserves the right to prohibit conduct, communication, or content, which it deems in its discretion, may be harmful to SBH, its affiliates, or to users or that may violate the law.</p>
                                            <p>SBH does not knowingly solicit personal information from children or individuals under 18 years of age or send requests for personal information to those under the age of 18. Please ensure that you do not allow those under the age of 18 to submit any personal information without your permission.</p>
                                            <p>If you wish to verify any voluntary information collected about you or if you wish to be removed from our database, please contact an SBH representative at [Address: House 2A, School Road, F6/3, Islamabad, Pakistan].</p>
                                        </div>
                                        <div className='pp1'>
                                            Uses for Contact Information
                                        </div>
                                        <div className='privacy-text'>
                                            SBH will always ask for permission to contact you further once you've provided us with information such as your name, telephone number, and email address. We will then use this information for market analysis, marketing purposes, and to keep you up-to-date about future offers or promotions unless you opt-out online or notify us.
                                            <p>SBH may aggregate or anonymize information that we have collected for other business purposes, including for marketing purposes. Aggregated or anonymized information does not identify you, and use and disclosure of such information are not subject to this policy.</p>
                                        </div>
                                        <div className='pp1'>
                                            Information Disclosure
                                        </div>
                                        <div className='privacy-text'>
                                            SBH treats the information you provide to us in a confidential manner. SBH does not rent, sell, or disclose your personally identifiable information to non-affiliated companies except to provide products and services you have requested, when we have permission, as permitted by federal law, or as described in this privacy policy. While we endeavor to maintain the confidentiality of all material submitted that is marked as confidential by the submitter, we cannot accept and hereby expressly disclaim any liability from losses relating to the unauthorized disclosure or interception via the Internet of any information that you submit.
                                            <p>People that may have authorized access to your personally identifiable information include our employees, as well as agents or contractors who help provide data processing, marketing or promotion services, hardware and website support, and email management. Strategic partners offering or providing products or services jointly or on behalf of SBH may also have authorized access to your personally identifiable information. In the event SBH sells, buys, merges, or partners with other companies or businesses, user information may be among the transferred assets.</p>
                                            <p>At times, we may be required by law or legal process to disclose your personal information. We may disclose information about you (i) if we believe that disclosure is necessary to satisfy any law, regulation, governmental request or to respond to a subpoena; (ii) as necessary to operate the Website; (iii) to protect the safety, rights, or property of SBH, its affiliates, or users of the Websites; and (iv) as otherwise permitted under this privacy policy. We will endeavor to ask for and obtain your permission before sharing your information with anyone unless we believe in good faith disclosure is necessary for the public interest or required by law.</p>
                                        </div>
                                        <div className='pp1'>
                                            Browsing and Website Data Collection
                                        </div>
                                        <div className='privacy-text'>
                                            Personally identifiable information from your computer will not be collected when you browse this website. Anonymous data are captured by the server each time a visitor navigates to one of the website pages and are used to cull information such as the frequency and duration of visits to each web page. This provides us with insight into how we can better address your needs by improving content, navigation, and usability.
                                            <p>SBH uses cookies on the Websites to improve your user experience. Cookies are elements of data sent to your browser, which can then be stored on your computer. Although you may disable cookies in your browser and still access and use the Website, disabling cookies may prevent you from taking advantage of certain features on the Website.</p>
                                        </div>
                                        <div className='pp1'>
                                            Links to Other Websites
                                        </div>
                                        <div className='privacy-text'>
                                            While the SBH website may contain links to third-party websites, we are only responsible for the privacy policy governing this website and its contents. We are not responsible for any linked sites. Third-party content is provided as a convenience, and not to imply a referral or endorsement of the linked site by SBH. By clicking on these links or advertisements, you are visiting sites outside of SBH’s control. SBH is not responsible for any content on those sites, and this privacy policy does not apply to any information you provide when visiting those sites.
                                        </div>
                                        <div className='pp1'>
                                            Questions
                                        </div>
                                        <div className='privacy-text'>
                                            If you have questions about our privacy policy, please contact us at [Address: House 2A, School Road, F6/3, Islamabad, Pakistan].
                                        </div>
                                        <div className='pp1'>
                                            Disclaimer
                                        </div>
                                        <div className='privacy-text'>
                                            The information contained in this website is published in good faith and for general information purposes only. The information is provided by SBH, and while we endeavor to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
                                            <p>In no event will we be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of or in connection with the use of this website.</p>
                                            <p>Every effort is made to keep the website up and running smoothly. However, SBH takes no responsibility for and will not be liable for the website being temporarily unavailable due to technical issues beyond our control.</p>
                                        </div>
                                        <div className='pp1'>
                                            Disclaimer
                                        </div>
                                        <div className='privacy-text'>
                                            The information and resources on this site are for informational purposes only. We aim to present the most accurate information possible but make no claims or guarantees about the veracity of anything here, and we accept no liability.
                                        </div>
                                    </div>
                                </div>
                            }
                            {policyName === 'refund-policy' &&
                                <div>
                                    <div className='privacy-text'>
                                        At Serai Boutique Hotels, we highly value your trust and aim to ensure a delightful experience during your stay. Recognizing that plans may alter, we are committed to transparency in outlining our refund policy. Please take a moment to acquaint yourself with our updated refund policy effective as of today:
                                    </div>
                                    <div>
                                        <div className='pp1'>
                                            Cancellation Policy:
                                        </div>
                                        <div className='pp1'>
                                            Flexible Rate
                                        </div>
                                        <div className='privacy-text'>
                                            Guests who book our flexible rate can cancel their reservation up to 48 hours before the scheduled check-in time without incurring any charges.
                                        </div>
                                        <div className='pp1'>
                                            Non-Refundable Rate
                                        </div>
                                        <div className='privacy-text'>
                                            Guests who choose our non-refundable rate will be charged the full amount of the reservation at the time of booking and will not be eligible for a refund in case of cancellation or amendment.
                                        </div>
                                        <div className='pp1'>
                                            Refund Eligibility
                                        </div>
                                        <div className='privacy-text'>
                                            Refunds will be processed based on the rate plan chosen at the time of booking (Flexible Rate or Non-Refundable Rate). <br />
                                            If you booked through a third-party website or travel agency, please refer to their cancellation and refund policies.
                                        </div>
                                        <div className='pp1'>
                                            No-Show Policy
                                        </div>
                                        <div className='privacy-text'>
                                            If you do not check-in on your scheduled arrival date ("no-show"), you will be charged for the first night of your stay as per your reservation.
                                        </div>
                                        <div className='pp1'>
                                            Early Departure Policy
                                        </div>
                                        <div className='privacy-text'>
                                            In case of a non-refundable rate, guests who decide to check out before their scheduled departure date will not be eligible for a refund for the remaining nights of their reservation. <br />
                                            In case of a flexible rate, guests who decide to check out before their scheduled departure and had paid 100% in advance, will be eligible for a refund for the remaining nights of their reservation after charging one night's stay. (Subject to 24 hours prior information regarding early departure)
                                        </div>
                                        <div className='pp1'>
                                            Group Bookings
                                        </div>
                                        <div className='privacy-text'>
                                            Group bookings may have different cancellation and refund policies. Please contact our reservations team for specific details if you have made a group reservation.
                                        </div>
                                        <div className='pp1'>
                                            Refund Process
                                        </div>
                                        <div className='privacy-text'>
                                            Refunds, if applicable, will be credited back to the original payment method used during booking (e.g., credit card, cheques, etc.). <br />
                                            Depending on your bank or financial institution, it may take several business days for the refund to appear in your statement. <br />
                                            Identification documents of the guest (e.g., Copy of CNIC/Passport) along with the original deposit receipt, if any, shall be submitted to the concerned hotel for processing a refund for accuracy and transparency. <br />
                                            A corporate refund shall be released concerning corporate accounts only upon submission of necessary documentation.
                                        </div>
                                        <div className='pp1'>
                                            Modifications
                                        </div>
                                        <div className='privacy-text'>
                                            If you need to make changes to your reservation, please contact our reservations team at least 48 hours before your scheduled check-in time. Modifications are subject to availability and rate changes.
                                        </div>
                                        <div className='pp1'>
                                            Force Majeure
                                        </div>
                                        <div className='privacy-text'>
                                            In the event of extraordinary circumstances, such as natural disasters or government-mandated travel restrictions, we reserve the right to make exceptions to our refund policy.
                                        </div>
                                        <div className='pp1'>
                                            Contact Information
                                        </div>
                                        <div className='privacy-text'>
                                            For questions, cancellations, or modifications, please contact our reservations team at the Serai Boutique Hotel where you have booked your stay.
                                        </div>
                                        <div className='privacy-text'>
                                            <b>We recommend that all guests consider travel insurance, especially international travelers, to protect against unexpected changes to their plans.</b>
                                        </div>
                                        <div className='privacy-text'>
                                            Thank you for choosing Serai Boutique Hotels. We eagerly anticipate hosting you and ensuring a comfortable and enjoyable stay. If you have any questions or concerns about our refund policy, please don't hesitate to reach out to us.
                                        </div>
                                        <div className='privacy-text'>
                                            <b>
                                                Note: This refund policy is subject to change, and the most up-to-date version will be available on our website. <br />
                                                [Last Updated: 29 November 2023]
                                            </b>
                                        </div>
                                    </div>
                                </div>
                            }

                            {policyName === 'terms-and-conditions' &&
                                <div>
                                    <div className='pp1'>
                                        TERMS AND CONDITIONS FOR ACCESS AND USE OF THE SERAI.COM.PK WEBSITE
                                    </div>

                                    <div>
                                        <div className='privacy-text'>
                                            These Terms and Conditions govern your access to and use of the Serai Boutique Hotels (SBH) website, accessible at serai.com.pk. By accessing or using the Website, you agree that you have read and accepted these Terms and Conditions, and that they shall apply to your use.
                                            <p>This Website is operated by Serai Boutique Hotels (SBH), with its registered office located in F6/3, Islamabad, Pakistan.</p>
                                            <p>Any personal data you transmit to us will be used in accordance with our Privacy Policy. SBH will not supply your details to any organization for marketing purposes.</p>
                                        </div>
                                        <div className='pp1'>
                                            Intellectual Property
                                        </div>
                                        <div className='privacy-text'>
                                            All intellectual property rights (IPRs) in the design and layout of the Website and in the material and information published on the pages of the Website, including, but not limited to, copyright and rights in registered and unregistered trademarks, are owned by SBH.
                                        </div>
                                        <div className='pp1'>
                                            Disclaimer
                                        </div>
                                        <div className='privacy-text'>
                                            The information and resources on this site are for informational purposes only. We aim to present the most accurate information possible but make no claims or guarantees about the veracity of anything here, and we accept no liability. Please use your own good judgment and common sense. All content on this Website is copyright of SBH, and all rights are reserved. SBH offers no claim or representation, and accepts no responsibility, regarding the quality, nature, or reliability of sites that may be accessible by hyperlinks from this Website or sites linking to this Website.
                                        </div>
                                        <div className='pp1'>
                                            Indemnity
                                        </div>
                                        <div className='privacy-text'>
                                            You agree to indemnify and to keep SBH indemnified from and against any costs, claims, demands, expenses, and liabilities suffered or incurred by SBH arising from or which are directly or indirectly related to your access to and/or use of the Website and/or any other person or entity’s use of the Website, including but not limited to where such person or entity was able to access the Website using your password.
                                        </div>
                                        <div className='pp1'>
                                            General
                                        </div>
                                        <div className='privacy-text'>
                                            SBH reserves the right to assign or transfer all or any of its rights and obligations under these Terms and Conditions to a third party. In the event of assignment or transfer to a third party, notification will either be given to you by email or posted on the Website.
                                            <p>Failure by SBH to exercise or enforce any right conferred upon it shall not be deemed to be a waiver of any such right nor operate so as to bar the exercise or enforcement of that or any other right on any later occasion.</p>
                                            <p>SBH reserves the right to vary the Terms and Conditions from time to time. Such changes will either be notified to you by email or posted on the Website. Changes in this manner shall be deemed to have been accepted if you continue to use the Website after a period of 2 (two) weeks from the date of transmission of the email or posting on the Website, whichever occurs later.</p>
                                        </div>
                                    </div>
                                </div>
                            }

                            {policyName === 'complaint-policy' &&
                                <div>
                                    <div>
                                        <div className='pp1'>
                                            CUSTOMER COMPLAINTS RESOLUTION POLICY
                                        </div>
                                        <div className='privacy-text'>
                                            At Serai Boutique Hotels, we greatly value your feedback and are dedicated to ensuring that your stay with us is not only comfortable but also memorable. We understand that concerns may arise from time to time, and we take these matters seriously. Every complaint is directed to our management's attention, ensuring a swift response within 48 hours and effective action to provide the most satisfactory resolutions possible.
                                        </div>
                                        <div className='pp1'>
                                            Reporting a Complaint:
                                        </div>
                                        <div className='privacy-text'>
                                            Customers can report their complaints through the following methods:
                                            <ol>
                                                <li>
                                                    <b>Make a Verbal Complaint:</b>
                                                    <ul>
                                                        <li>
                                                            Call our dedicated numbers:
                                                            <ul>
                                                                <li>+923000553778</li>
                                                                <li>+92512277117-9</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <b>Send a Written Complaint via Email:</b>
                                                    <ul>
                                                        <li>Email your complaint to: reservations@serai.pk</li>
                                                    </ul>
                                                </li>
                                            </ol>
                                        </div>
                                        <div className='pp1'>
                                            Receipt of Complaint
                                        </div>
                                        <div className='privacy-text'>
                                            Your complaint will be promptly recorded and acknowledged by our staff. We appreciate your communication and assure you that your concerns will be taken seriously.
                                        </div>
                                        <div className='pp1'>
                                            Investigation
                                        </div>
                                        <div className='privacy-text'>
                                            Our team will conduct a thorough investigation into your complaint, which may include:
                                            <ul>
                                                <li>Reviewing relevant records.</li>
                                                <li>Interviewing staff involved, if applicable.</li>
                                                <li>Inspecting the area or service in question.</li>
                                                <li>Any other aspect deemed necessary.</li>
                                            </ul>
                                        </div>
                                        <div className='pp1'>
                                            Resolution
                                        </div>
                                        <div className='privacy-text'>
                                            We will propose a timely resolution to address your specific concern. This may include:
                                            <ul>
                                                <li>Rectifying the issue completely.</li>
                                                <li>Offering alternatives or compensation when appropriate.</li>
                                                <li>Implementing corrective actions to prevent the reoccurrence of similar issues in the future.</li>
                                            </ul>
                                        </div>
                                        <div className='pp1'>
                                            Follow-Up
                                        </div>
                                        <div className='privacy-text'>
                                            After implementing the resolution, we will follow up with you to gather feedback on the resolution process, ensuring your satisfaction.
                                        </div>
                                        <div className='pp1'>
                                            Documenting Complaints:
                                        </div>
                                        <div className='privacy-text'>
                                            We maintain records of all customer complaints, investigations, and resolutions for internal analysis and continuous improvement.
                                        </div>
                                        <div className='pp1'>
                                            Feedback and Suggestions:
                                        </div>
                                        <div className='privacy-text'>
                                            We encourage guests to provide feedback and suggestions on our services. Guests can provide feedback through post-stay surveys received via email. For F&B, links are provided in all the restaurants.
                                        </div>
                                        <div className='pp1'>
                                            Contact Information:
                                        </div>
                                        <div className='privacy-text'>
                                            For all customer complaints, please contact us at:
                                            <ul>
                                                <li>
                                                    <b>Phone Numbers:</b>
                                                    <ul>
                                                        <li>+923000553778</li>
                                                        <li>+92512277117-9</li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <b>Email:</b>
                                                    <ul>
                                                        <li>reservations@serai.pk</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='pp1'>
                                            Privacy and Confidentiality:
                                        </div>
                                        <div className='privacy-text'>
                                            All information related to customer complaints is handled with the utmost privacy and confidentiality. Serai Boutique Hotels are dedicated to ensuring your experience with us is exceptional. <br /><br />
                                            We will regularly review this policy to further improve current practices, policies, and procedures to prevent persistent issues. <br /><br />
                                            Thank you for choosing Serai Boutique Hotels. Your satisfaction is our priority.
                                        </div>
                                    </div>
                                </div>
                            }

                            {policyName === 'legal-notice' &&
                                <div>
                                    <div>
                                        <div className='pp1'>
                                            Terms of Use
                                        </div>
                                        <div className='privacy-text'>
                                            Welcome to Serai Boutique Hotels' website (www.serai.com.pk). By accessing or using this website, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website.
                                        </div>
                                        <div className='pp1'>
                                            Privacy Policy
                                        </div>
                                        <div className='privacy-text'>
                                            Your privacy is important to us. Please review our Privacy Policy to understand how your information is collected, used, and protected on our website.
                                        </div>
                                        <div className='pp1'>
                                            Intellectual Property Rights
                                        </div>
                                        <div className='privacy-text'>
                                            All content on this website, including text, images, logos, and trademarks, is the property of Serai Boutique Hotels and is protected by intellectual property laws. Any unauthorized use of the materials on this site may violate copyright, trademark, and other laws.
                                        </div>
                                        <div className='pp1'>
                                            Disclaimer
                                        </div>
                                        <div className='privacy-text'>
                                            The information provided on this website is for general informational purposes only. While we strive to keep the information up-to-date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.
                                        </div>
                                        <div className='pp1'>
                                            
                                        </div>
                                        <div className='privacy-text'>
                                            The information provided on this website is for general informational purposes only. While we strive to keep the information up-to-date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.
                                        </div>
                                        <div className='pp1'>
                                            Reservation Terms and Conditions
                                        </div>
                                        <div className='privacy-text'>
                                            Booking a reservation through our website is subject to the terms and conditions outlined in our Reservation Policy. Please review these terms before making a reservation.
                                        </div>
                                        <div className='pp1'>
                                            Liability Limitations
                                        </div>
                                        <div className='privacy-text'>
                                            Serai Boutique Hotels shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use this website. We are not responsible for any technical issues, interruptions, or errors on the website.
                                        </div>
                                        <div className='pp1'>
                                            Links to Third-Party Websites
                                        </div>
                                        <div className='privacy-text'>
                                            Our website may contain links to third-party websites. Serai Boutique Hotels is not responsible for the content or practices of these external sites. Users should review the terms and privacy policies of linked websites.
                                        </div>
                                        <div className='pp1'>
                                            Governing Law and Jurisdiction
                                        </div>
                                        <div className='privacy-text'>
                                            These terms will be governed by and construed in accordance with the Laws of the Islamic Republic of Pakistan. Users submit to the non-exclusive jurisdiction of the state and federal courts of Pakistan for the resolution of any disputes.
                                        </div>
                                        <div className='pp1'>
                                            Contact Information
                                        </div>
                                        <div className='privacy-text'>
                                            For legal or privacy concerns, please contact us at
                                            <ul>
                                                <li>Phone Numbers: +923000553778, +92512277117-9</li>
                                                <li>Email: reservations@serai.pk</li>
                                            </ul>
                                        </div>
                                        <div className='pp1'>
                                            Updates to the Legal Notice
                                        </div>
                                        <div className='privacy-text'>
                                            Serai Boutique Hotels reserves the right to update or modify this Legal Notice without prior notice. Users are encouraged to check this page periodically for any changes. <br/>
                                            Thank you for choosing Serai Boutique Hotels. Your use of our website is subject to these terms and conditions. <br/>
                                            [Last Updated: 29 November 2023]
                                        </div>
                                    </div>
                                </div>
                            }
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </div>
    )
}

export default PrivacyPolicy;