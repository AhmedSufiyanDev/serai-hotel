import React, { useEffect } from 'react';
import { SimpleAccordion } from "../../../components";
import { Container, Grid } from '@material-ui/core';
import { useLocation } from "react-router";
import "../scss/faqs.scss";
import { Helmet } from "react-helmet";

const faqs = [
    { question: 'What is the check-in and check-out time?', answer: answerFaq(1) },
    { question: ' Can I keep my room after the standard check out time?', answer: answerFaq(2) },
    { question: 'How can I make a room booking or reservation at Serai?', answer: answerFaq(3) },
    { question: 'Which modes of payment are available for room booking?', answer: answerFaq(4) },
    { question: 'What is the policy for foreigners and what documents are required?', answer: answerFaq(5) },
    { question: 'What is the cancellation and refund policy?', answer: answerFaq(6) },
    { question: 'Is there Wi-Fi in every room?', answer: answerFaq(7) },
    { question: 'Is breakfast included in our stay? If so, at what time is it served?', answer: answerFaq(8) },
    { question: 'Do the rooms include a workspace?', answer: answerFaq(9) },
    { question: 'Is there an elevator in the hotel?', answer: answerFaq(10) },
    { question: 'Where can we park our vehicle?', answer: answerFaq(11) },
    { question: 'Can we bring our pets?', answer: answerFaq(12) },
    { question: 'Can I request an additional bed/mattress for a third person in a double occupancy room? How much will it cost?', answer: answerFaq(13) },
    { question: 'Why do you need my credit card information?', answer: answerFaq(14) },
    { question: 'Do you offer business rates?', answer: answerFaq(15) },
    { question: 'Are children permitted to stay in their parent’s room?', answer: answerFaq(16) },
    { question: 'What is the smoking policy of the hotel?', answer: answerFaq(17) },

];

function answerFaq(questionNumber) {
    switch (questionNumber) {
        case 1:
            return (
                <p>Check-in time is 2:00pm – Check-out is at 12:00pm</p>
            );
        case 2:
            return (
                <p>Late Check out up to 02 hours can be given as per availability till 14:00 hrs, after 14:00 hrs 50% late check out charges will be charge till 19:00 hrs (if available).</p>
            );
        case 3:
            return (
                <p>You can easily book a hotel through our website www.serai.com.pk. Additionally, you can call the official number of Serai Boutique Hotel for bookings</p>
            );
        case 4:
            return (
                <p>Serai Boutique Hotel accepts payment via cash, all Credit/Debit Card Visa, Master, Amex, and account deposit.</p>
            );
        case 5:
            return (
                <p>Foreigners must provide a tourist visa or an e-visa copy<br></br>
                    Foreign Diplomats<br></br>
                    All Foreign Diplomats are required to have an NOC from Ministry of Foreign Affairs as well as from Ministry of Interior.
                </p >
            );
        case 6:
            return (
                <p>72 hours before arrival: full refund.<br></br>
                    If canceled up to 48 hours before arrival: 100% will be charged<br></br>
                    If the guest wishes to cancel the reservation of all accommodation reserved or restaurant reservation for a group, the Client must provide the Hotel a written notice of Cancellation.<br></br>
                    Any notice of cancellation received after 5.00pm shall be deemed made on the next day.<br></br>
                    Re-booking Cancellation<br></br>
                    <ul>
                        <li>Re-booking is fully non-refundable</li>
                        <li>If you cancel your reservation after modification, you are responsible for first night’s payment of the original reservation</li>
                    </ul>

                </p>
            );
        case 7:
            return (
                <p>Guests can use free Wi-Fi everywhere in the hotel, unlimited on multiple devices.</p>
            );
        case 8:
            return (
                <p>Yes, guests can enjoy complimentary breakfast in our lounge from 07:30 hrs till 10:30 hrs.
                </p>
            );
        case 9:
            return (
                <p>Yes we have a small workspace in all our rooms.</p>
            );
        case 10:
            return (
                <p>Yes we have a elevator for roof top only</p>
            );
        case 11:
            return (
                <p>We apologise but the hotel does not have its own parking. However, guests can park their car in the road side parking, which is entirely safe.</p>
            );
        case 12:
            return (
                <p>Pets are not allowed on hotel premises.</p>
            );
        case 13:
            return (
                <p>Mattress can be provided in the rooms @ 1000 + Tax.</p>
            );
        case 14:
            return (
                <p>Credit card information is only required for prepayment to confirm booking.</p>
            );
        case 15:
            return (
                <p>We apologize but we do not office business rate.</p>
            );
        case 16:
            return (
                <p>Two children under the age of 12 can be accommodated with parents in the same room.
                </p>
            );
        case 17:
            return (
                <p>All rooms are non-smoking and smoking is strictly prohibited inside hotel.</p>
            );
    }
}


function FAQS() {
    const { query } = useLocation();

    useEffect(() => {
        let target = "faqs"
        if (query) {
            if (query == 1) {
                target = 'policy';
            }
        }

        let element = window.document.getElementById(target);
        element && element.scrollIntoView({ behavior: "smooth", nearest: "block", block: "start" });
        window.history.pushState(target, target, "/");
    }, []);
    return (
        <div className='full-wrapper'>
            <Helmet>
                <title>{'Serai.com.pk Hotel Booking & FAQ'}</title>
                <meta name='description' content='Find answers to your questions about Serai.com.pk hotel booking services, policies, and more on our comprehensive FAQ page.' />
                <meta name="keywords" content='Book Hotel in Islamabad,  Serai Boutique Hotel Islamabad, Hotel Booking & FAQ, Hotel in Islamabad, Private Dining, guest house in Islamabad, Rockville house, room in Islamabad, Best guest house in Islamabad, Islamabad room services, hotels in F-6 islamabad, book hotels in Islamabad, best hotel Islamabad, Islamabad hotel booking' />
            </Helmet>
            <div className="mar-top-sm header-heigt-fix"></div>

            <section className='wrap-pdd-left wrap-pdd-right' id="faqs">
                <Container fixed>
                    <div className='priv-policy-head heading-margin-btm'>
                        <h2>FAQ'S</h2>
                    </div>
                    <Grid justifyContent='center' container spacing={0} >
                        {faqs.map((item) => (
                            <Grid item xs={12} sm={12} lg={8} >
                                <div style={{ marginBottom: "20px" }}>
                                    <SimpleAccordion
                                        open={true}
                                        title={item.question}
                                        children={
                                            <div className='according-content' >
                                                <p className='paragrap-according'>{item.answer}</p>
                                            </div>
                                        }
                                    />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                    <div className='priv-policy-head heading-margin-btm' id="policy">
                        <h2>Refund or Return Policy</h2>
                    </div>
                    <div className='privacy-paragraph heading-margin-btm'>
                        <p>The guest can cancel free of charge until 3 days before arrival. If the guest cancels within 3 days (72 hours) of arrival, they will be charged the cost of the first night.</p>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default FAQS;
