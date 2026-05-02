import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [
        "nourelectricals@gmail.com",
        "demmvisuals@gmail.com"
      ],
      subject: "New Website Message",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return {
      statusCode: 200,
      body: "Email sent",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
}
