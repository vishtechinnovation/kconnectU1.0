require("dotenv").config();
const express = require("express");
const axios = require("axios");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS

// OAuth2 Client Setup
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID, // Your client ID from Google Cloud Console
    process.env.GOOGLE_CLIENT_SECRET, // Your client secret from Google Cloud Console
    process.env.GOOGLE_REDIRECT_URI // Your redirect URI (e.g., http://localhost:3000/oauth2callback)
);

// Nodemailer Transporter for email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Google Sheets API
const sheets = google.sheets("v4");

// Step 1: Get the authorization URL for backend authentication
async function authorize() {
    const { tokens } = await oauth2Client.getToken("authorization_code"); // Get the authorization code during first OAuth flow
    oauth2Client.setCredentials(tokens); // Store tokens securely (in .env or database)
    return oauth2Client;
}

// Form Submission Route
app.post("/submit", async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        location,
        profession,
        "g-recaptcha-response": recaptchaResponse,
    } = req.body;

    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    try {
        // Verify reCAPTCHA response
        const response = await axios.post(verificationUrl);
        const data = response.data;

        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: "reCAPTCHA validation failed",
            });
        }

        // Store data in the Temporary Google Sheet (common for all users)
        const token = Math.random().toString(36).substr(2); // Generate a unique verification token
        await storeDataInSheet(
            process.env.TEMP_SHEET_ID,
            firstName,
            lastName,
            email,
            phone,
            location,
            profession,
            token
        );

        // Send email to user with verification link
        const emailSubject = "Please Verify Your Email";
        const emailBody = `
      Hi ${firstName} ${lastName},<br><br>
      Thank you for your submission. To verify your email address, please click the link below:<br>
      <a href="https://kconnect-u1-0.vercel.app/verify?token=${token}">Verify your email</a><br><br>
      Regards,<br>Your Team
    `;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailSubject,
            html: emailBody,
        });

        // Notify support team
        const supportSubject = "New Submission";
        const supportBody = `
      A new submission has been received:<br><br>
      Name: ${firstName} ${lastName}<br>
      Email: ${email}<br>
      Phone: ${phone}<br>
      Location: ${location}<br>
      Profession: ${profession}
    `;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "konnectusolutions@gmail.com", // Replace with support team email
            subject: supportSubject,
            html: supportBody,
        });

        res.json({
            success: true,
            message:
                "Form submitted successfully. Please check your email to verify your address.",
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// Email Verification Route
app.get("/verify", async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid token" });
    }

    try {
        // Check the token in the Temporary Google Sheet (all users' data is stored here)
        const row = await verifyTokenInSheet(process.env.TEMP_SHEET_ID, token);

        if (!row) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid or expired token" });
        }

        // Move data to the Permanent Google Sheet (shared sheet for verified users)
        await moveDataToPermanentSheet(process.env.PERM_SHEET_ID, row);

        // Update status in Temporary Sheet (mark as 'verified')
        await updateStatusInTemporarySheet(
            process.env.TEMP_SHEET_ID,
            row[0],
            "verified"
        );

        // Send success email to user
        const emailSubject = "Your Email Has Been Verified";
        const emailBody = `
      Hi ${row[1]} ${row[2]},<br><br>
      Your email has been successfully verified!<br><br>
      Regards,<br>Konnectusolutions Team
    `;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: row[3], // User email
            subject: emailSubject,
            html: emailBody,
        });

        res.send("<h2>Your email has been successfully verified!</h2>");
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// Helper function to store data in Google Sheets (Temporary Sheet for all users)
async function storeDataInSheet(
    sheetId,
    firstName,
    lastName,
    email,
    phone,
    location,
    profession,
    token
) {
    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:G", // Adjust the range as per your sheet
        valueInputOption: "RAW",
        resource: {
            values: [
                [
                    new Date(),
                    firstName,
                    lastName,
                    email,
                    phone,
                    location,
                    profession,
                    token,
                ],
            ],
        },
        auth: oauth2Client,
    });
}

// Helper function to verify token in Temporary Google Sheet
async function verifyTokenInSheet(sheetId, token) {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: "Sheet1!A:H", // Adjust the range as per your sheet
        auth: oauth2Client,
    });

    const rows = res.data.values;
    return rows.find((row) => row[7] === token); // Assuming the token is in the 8th column
}

// Helper function to move data to the Permanent Google Sheet (Shared sheet for verified users)
async function moveDataToPermanentSheet(sheetId, row) {
    await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:G", // Adjust the range as per your sheet
        valueInputOption: "RAW",
        resource: {
            values: [row],
        },
        auth: oauth2Client,
    });
}

// Helper function to update the status in the Temporary Google Sheet
async function updateStatusInTemporarySheet(sheetId, rowIndex, status) {
    await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: `Sheet1!H${rowIndex + 1}`, // Assuming the status is in the 8th column
        valueInputOption: "RAW",
        resource: {
            values: [[status]],
        },
        auth: oauth2Client,
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at https://kconnect-u1-0.vercel.app`);
});
