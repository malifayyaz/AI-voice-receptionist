import './globals.css';

export const metadata = {
  title: 'City Dental Clinic | 24/7 AI Voice Booking & Modern Dental Care',
  description: 'Experience frictionless, modern dental care at City Dental Clinic. Routine checkups, cleaning, root canals, and cosmetic treatments. Book appointments 24/7 in seconds with Maya, our voice AI receptionist.',
  keywords: ['City Dental Clinic', 'Dental Appointment Booking', 'Voice AI Receptionist', 'Dentist 12 Main Blvd', 'Teeth Cleaning', 'Root Canal'],
  openGraph: {
    title: 'City Dental Clinic | 24/7 AI Voice Receptionist',
    description: 'Zero hold times. Instant live booking with our voice receptionist Maya.',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
